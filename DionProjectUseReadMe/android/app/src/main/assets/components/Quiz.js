import React, { Component } from 'react';
import Question from './Question';
import QuestionCount from './QuestionCount';
import AnswerOption from './AnswerOption';
import Option from './Option';
import Timer from './Timer';
import Result from './Result';
import Confirm from './Confirm';
import Particle from './Particles';

import { CSSTransitionGroup } from 'react-transition-group';

/**
 * Quiz Component
 * Handles updating all quiz screens
 * Updates each question and then renders the next question once current question is complete
 */
class Quiz extends Component {

  /**
   * Constructor for the quiz class
   * Called when a quiz object is initialised
   */
  constructor() {

    super(); // Call super constructor for component

    // Declare my state variables 
    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      correct: '',
      answerOptions: [],
      answer: '',
      answersCount: 0,
      result: -1,
      page: 'Confirm',
      timer: 10,
      particles: false,
      score: 0,
      challengeResult: ''
     };

    // Bind this to all neccesary function
    this.renderAnswerOptions = this.renderAnswerOptions.bind(this);
    this.returnToHome = this.returnToHome.bind(this);
    this.tick = this.tick.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.changeToQuiz = this.changeToQuiz.bind(this);

    // The different colours for the particles
    this.correctColour = {r:0, g:255, b:0, a:180};
    this.incorrectColour = {r:255, g:0, b:0, a:180};
    this.colour = this.correctColour;

    this.quizReceived = []; // An array to store all possible questions
    this.questions = []; // An array to store the questions that will be on this quiz
  }

  /**
   * Called when component is re-rendered
   */
  componentWillMount() {
    this.setState({
      challenge: this.props.challenge
    });
    this.setUpQuiz();
  }

  /**
   * Sets up questions for the quiz
   */
  setUpQuiz() {
    
    this.quizReceived = this.props.questions; 

    // If this is a challenge quiz
    if(this.props.challenged) {

      for(var i = 0; i < this.quizReceived.length; i++) {
        for(var j = 0; j < this.props.challengedQuestions.length; j++) {
          if(this.quizReceived[i].id == this.props.challengedQuestions[j]) {
            // Search for the questions that the user has been challenged to 
            // and add them to the question array
            this.questions.push(this.quizReceived[i]);
          }
        }
      }
    }
    else {
      // Shuffle all questions
      const shuffledQuestions = this.shuffleArray(this.quizReceived);

      // Only take first 15 questions
      this.questions = shuffledQuestions.slice(0, 15);
    }

    // Shuffle the answers to each question
    const shuffledAnswerOptions = this.questions.map(
      (question) => this.shuffleArray(question.answers)
    );

    this.setState({
      question: this.questions[0].question,
      correct: this.questions[0].correct,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  /**
   * This asynchronous function will execute an API call if this quiz is a challenge quiz
   * The api call will post this challenge to the database, sending the username and score of the plaey
   */
  async sendChallenge() {
    const response = await fetch('/post_challenge', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questions: this.questions,
        challenger: this.props.username,
        challenged: this.props.challengeName,
        score: this.state.score
      })
    });

    this.scoreResponse = await response.json(); 
  }

  /**
   * This asynchronous function will execute an API call if this quiz was a challnge that the user accepted
   * The api call will post the users score in the score and the return value will be whether or not they won
   */
  async respondToChallenge() {
    const response = await fetch('/respond_to_challenge', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        challenged: this.props.username,
        challenger: this.props.challenger,
        score: this.state.score
      })
    });

    // Gets the result of the quiz and sets it in the state
    var result = await response.json();
    this.setState({
      challengeResult: result
    });
  }

  /**
   * Function for decrementing the timer, this function gets called once a second
   */
  tick() {

    var time = this.state.timer; // Gets current time
    
    // Decrements it and sets it to be the current value of the timer
    time--; 
    this.setState({
      timer: time
    })

    // If timer has reached 0, set question to be over
    if(time <= 0) {
      this.timeout();

      // Reset timer
      this.setState({
        timer: 10
      })
    }
  }

  /**
   * Function for randomly shuffling values in an array around
   */
  shuffleArray(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 != currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array; // Return shuffled array 
  };

  /**
   * Function for starting the quiz from the pre-quiz screen
   */
  changeToQuiz() {
    // Sets up tick function so it gets called once a second
    this.intervalHandle = setInterval(this.tick, 1000);

    // Sets the page to be displayed to be the quiz page
    this.setState((state) => ({
      page: 'Quiz'
    }));
  }

  /**
   * Function for changing to the results page
   * This function should be called once all quiz questions have been answered
   */
  changeToResult() {
    if(this.state.page == 'Quiz') {

      // Calls function that will post to the database what event the user has caused
      this.props.updateCount("Leave Quiz","Enter Result Page", this.props.username);

      if(this.state.challenge && this.state.page == 'Quiz') {
        // If this was a challenge quiz, call send challenge function
        this.sendChallenge();
      }
      else if(this.props.challenged && this.state.page == 'Quiz') {
        // If the user has completed a quiz they were challenged to, call function that post challenge response to database
        this.respondToChallenge();
      }
    }
    
    // Set page to be displayed to be the results page
    this.setState((state) => ({
      page: 'Result',
      challenge: false
    }));
  }

  /**
   * Function for setting answer to current question to be the answer the user just selected
   */
  setUserAnswer(answer) {

    // Sets answer to be selected answer
    this.setState((state) => ({
      answer: answer
    }));

    // Checks to see if answer is correct
    if(answer == this.state.correct) {

      // If so, display green particles, increase score and the correct answer count
      this.colour = this.correctColour;
      this.setState((state) => ({
        answersCount: state.answersCount + 1,
        score: state.score + (10 * state.timer)
      }));
    }
    else {
      // If not, display red particles and add question title to array of questions that were answered incorrectly
      this.colour = this.incorrectColour;
      var category = this.questions[this.state.counter].category;

      // Call function that handles appending relevant info point to personalised page
      this.props.append(category[0], true);
    }
  }

  /**
   * Function for moving to the next question once current question has been completed
   */
  setNextQuestion() {
    // Increment current question counter
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    
    this.props.updateCount("Finish question " + (counter - 1),"Start question " + counter, this.props.username);

    // Assign all question values to be the next questions values
    // Also turns particles off
    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.questions[counter].question,
      correct: this.questions[counter].correct,
      answerOptions: this.questions[counter].answers,
      answer: '',
      particles: false
    });
  }

  /**
   * Function that returns how many answers were answered correctly
   */
  getResults() {
    var amount = this.state.answersCount;
    return amount;
  }

  /**
   * Function that is called when all questions have been answered
   * Sets result to be whatever score the player has currently
   */
  setResults (result) {
    this.setState({ result: result });
    this.changeToResult(); // Changes to results page
  }

  /**
   * Function for when the user runs out of time on a question
   */
  timeout() {
    this.setUserAnswer("-1"); // Passes incorrect answer so that user will get no score
    this.nextSet(); // Calls for next question
  }

   /**
   * Function called when user selects an answer
   */
  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value); // Sets users answer to be the option they selected
    this.nextSet(); // Calls for the next question

    // Resets timer and calls for particles to be drawn
    this.setState({
       timer: 10,
       particles: true
      });

  }

  /**
   * Function called when user selects an answer
   */
  nextSet() {
    // Resets interval for timer
    clearInterval(this.intervalHandle);
    this.intervalHandle = setInterval(this.tick, 1000);

    // Checks to see if all 15 questions have been answered
    if (this.state.questionId < this.questions.length) {
        // If not, go to the next question
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        // If so, end the quiz
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
  }

  /**
   * Function for rendering one of the possible answers
   */
  renderAnswerOptions(key) {
    // Returns the answeroption object
    return (
      <AnswerOption
        key={key}
        answerContent={key}
        answerType={key}
        answer={this.state.answer}
        questionId={this.state.questionId}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  /**
   * Function for returning back to the home page
   */
  returnToHome(event) {
    // Calls on fuction that sets home page to be rendered
    // The message it's passing lets the application know where the user is coming from
    this.props.button("Leave Quiz");
  }

  /**
   * Function for rendering all relevant quiz content to the screen
   */
  render() {
    // If user is on the confirm screen
    if(this.state.page === 'Confirm') {
      return ( // Return the confirm component
        <Confirm
          home={this.returnToHome}
          confirm={this.changeToQuiz}
        />
      );
    }
    else if(this.state.page === 'Quiz') { // If user is on the quiz screen
      return ( // Render the quiz content to the screen
        <div>
          {this.state.particles && this.state.result === -1 &&
              // If particles are meant to be drawn and next question hasn't loaded yet

              // Draw particles to the screen
              <Particle
                particleAmount={400}
                particleSpeed={1.0}
                particleRadius={1.0}
                colour={this.colour}
              />
            }
          <Option symbol="fa fa-home fa-3x" side="option top" change={this.returnToHome}/> 
          <CSSTransitionGroup
            className="container"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}
          >
            <div key={this.state.questionId}>
            <Timer time={this.state.timer}/>
              <QuestionCount counter={this.state.questionId} total={this.questions.length} />
              <Question content={this.state.question}/>
      
              <ul className="answerOptions">
                {this.state.answerOptions.map(this.renderAnswerOptions)}
              </ul>
            </div>
          </CSSTransitionGroup>
        </div>
        );
    }
    else if(this.state.page === 'Result') { // If user is on the results screen
      return ( // Render all the results content
        <Result
          quizScore={this.state.score}
          quizResult={this.state.result}
          button={this.props.button}
          info={this.props.info}
          username={this.props.username}
          challenged={this.props.challenged}
          challengeResult={this.state.challengeResult}
          challenger={this.props.challenger}
          />
      );
    }
  }
  
}

  export default Quiz;
