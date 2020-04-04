import React from 'react';
import { Button, StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
// import Option from '../components/Option';
import { Emitter } from 'react-native-particles';


/**
 * Quiz Component
 * Handles updating all quiz screens
 * Updates each question and then renders the next question once current question is complete
 */
class Quiz extends React.Component {
    constructor() {
        super();

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
        };

        // Bind this to all neccesary function
        this.returnToHome = this.returnToHome.bind(this);
        this.tick = this.tick.bind(this);
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.changeToQuiz = this.changeToQuiz.bind(this);

        // The different colours for the particles
        this.correctColour = 'green';
        this.incorrectColour = 'red';
        this.colour = this.correctColour;


        this.quizReceived = []; // An array to store all possible questions
        this.questionsString = ""; // An array to store the questions that will be on this quiz
        this.questions = []; // An array to store the questions that will be on this quiz
        this.radioProps = [];

    }

    /**
     * Called when component is re-rendered
     */
    componentWillMount() {
        this.setUpQuiz();
    }

    /**
     * Sets up questions for the quiz
     */
    setUpQuiz() {
        console.log(this.props.questions);
        this.quizReceived = this.props.questions;

        // Shuffle all questions
        const shuffledQuestions = this.shuffleArray(this.quizReceived);

        // Only take first 15 questions
        this.questions = shuffledQuestions.slice(0, 15);

        // Shuffle the answers to each question
        const shuffledAnswerOptions = this.questions.map(
            (question) => this.shuffleArray(question.answers)
        );

        this.setState({
            question: this.questions[0].question,
            correct: this.questions[0].correct,
            answerOptions: shuffledAnswerOptions[0],
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

        {
            // @author Dion: Instead of directly turning of particles at new question give a second to breathe
            time === 9 &&
                this.setState({
                    particles: false
                })
        }


        // If timer has reached 0, set question to be over
        if (time <= 0) {
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
        if (this.state.page == 'Quiz') {

            // Calls function that will post to the database what event the user has caused
            //this.props.updateCount("Leave Quiz", "Enter Result Page");
        }

        // Set page to be displayed to be the results page 
        this.setState((state) => ({
            page: 'Result',
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

        console.log(answer)
        console.log(this.state.correct)

        // Checks to see if answer is correct
        if (answer == this.state.correct) {

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
            //this.props.append(category[0], true);
        }
    }

    /**
     * Function for moving to the next question once current question has been completed
     */
    setNextQuestion() {
        // Increment current question counter
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;


        //this.props.updateCount("Finish question " + (counter - 1), "Start question " + counter);

        // Assign all question values to be the next questions values
        this.setState({
            counter: counter,
            questionId: questionId,
            question: this.questions[counter].question,
            correct: this.questions[counter].correct,
            answerOptions: this.questions[counter].answers,
            answer: '',
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
    setResults(result) {
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
    // Dion : had to change value passed here to match native setup
    handleAnswerSelected(value) {
        this.setUserAnswer(value); // Sets users answer to be the option they selected
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
     * Function for returning back to the home page
     */
    returnToHome(event) {
        // Calls on fuction that sets home page to be rendered
        // The message it's passing lets the application know where the user is coming from
        // this.props.button("Leave Quiz");
    }

    /**
     * Function for rendering all relevant quiz content to the screen
     */
    render() {
        console.log("Score:" + this.state.score)

        /// @author Dion Buckley: for radio button
        this.radioProps = [
            { label: this.state.answerOptions[0], value: 0 },
            { label: this.state.answerOptions[1], value: 0 },
            { label: this.state.answerOptions[2], value: 0 }
        ]

        if (this.state.page === 'Confirm') {
            /// @author Dion Buckley
            /// Simply change to quiz here (outside of Component mount)
            this.changeToQuiz()
            return (null);
        }
        else if (this.state.page === 'Quiz') { // If user is on the quiz screen
            return ( // Render the quiz content to the screen
                // @author Dion: React native rendering of Quiz
                <View style={styles.container}>
                    <Text>{"Time: " + this.state.timer} </Text>
                    <Text>{"Question" + this.state.questionId + "of" + this.questions.length} </Text>
                    <Text>{this.state.question} </Text>

                    {/* @author Dion:  triple radio button for answer options */}
                    <RadioForm
                        radio_props={this.radioProps}
                        initial={-1}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}
                        onPress={(value) => {
                            this.setState({ value: value });
                            this.handleAnswerSelected(this.state.answerOptions[value]);
                        }}
                    />
                    {// If particles are meant to be drawn and next question hasn't loaded yet
                        this.state.particles && this.state.result === -1 &&
                        /// @author Dion:  react native specific particle emitter
                        <Emitter
                            numberOfParticles={44}
                            emissionRate={44}
                            interval={350}
                            particleLife={300}
                            direction={-90}
                            spread={333}
                            fromPosition={{ x: 150, y: 300 }}
                        >
                            <Image source={require('../assets/sprites/flare.png')}  tintColor = {this.colour} />
                        </Emitter>
                    }
                </View>
            );
        }
        else if (this.state.page === 'Result') { // If user is on the results screen
            return ( // Render all the results content
                <View style={styles.container}>
                    <Text>{"You answered: " + this.state.result + " questions correctly, nice try!"}</Text>
                    <Text>{"You have earned: " + this.state.score + " gold coins!"}</Text>

                    {/* <Result
                    quizScore={this.state.score}
                    quizResult={this.state.result}
                    info={this.props.info}
                /> */}
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 20,
    }
});

export default Quiz;
