import React from 'react';
import { View, ActivityIndicator, Picker, StyleSheet, Text, Button, TouchableOpacity, Image } from 'react-native';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../../constants/Interactions';
import Question from "../../Quiz/Question";
import Timer from "../../Quiz/Timer";

export default class TakeQuiz extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "CeliQuiz",
    })

      UNSAFE_componentWillMount() {
        CeliLogger.addLog("TakeQuiz", Interactions.OPEN);
      }

      componentWillUnmount() {
        CeliLogger.addLog("TakeQuiz", Interactions.CLOSE);
      }

      constructor(props) {
        super(props);

        this.state = {

          loading: false,
          questions: [],

          current: 0,
          correctScore: 5,
          totalScore: 50,

          results: {
            score: 0,
            correctAnswers: 0
          },
          completed: false
        };
      }

      fetchQuestions = async () => {
        await this.setState({ loading: true });
        const response = await fetch(
          `https://jamesnsd.pythonanywhere.com/`
        );
        const questions = await response.json();

        const { results } = questions;

        await this.setState({ questions: results, loading: false });
      };

      reset = () => {
        this.setState(
          {
            questions: [],
            current: 0,
            results: {
              score: 0,
              correctAnswers: 0
            },
            completed: false
          },
          () => {
            this.fetchQuestions();
          }
        );
      };

      submitAnswer = (index, answer) => {
        const question = this.state.questions[index];
        const isCorrect = question.correct_answer === answer;
        const results = { ...this.state.results };

        results.score = isCorrect ? results.score + 5 : results.score;
        results.correctAnswers = isCorrect
          ? results.correctAnswers + 1
          : results.correctAnswers;

        this.setState({
          current: index + 1,
          results,
          completed: index === 4 ? true : false
        });
      };

      componentDidMount() {
        this.fetchQuestions();
      }

      render() {
        return (
          <View style={styles.container}>
            {!!this.state.questions.length > 0 &&
              this.state.completed === false && (
                <Question
                  onSelect={answer => {
                    this.submitAnswer(this.state.current, answer);
                  }}
                  question={this.state.questions[this.state.current]}
                  correctPosition={Math.floor(Math.random() * 3)}
                  current={this.state.current}
                />
              )}

            <View
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              {this.state.completed === true && (
                <View style={styles.container}>
                  <Image
                    source={require("../components/Quiz/assets/celebrate.png")}
                    style={{ width: 300, height: 150 }}
                  />
                  <Text style={styles.welcome}>Quiz Completed</Text>
                  <Text style={styles.scores}>Correct Answers: {this.state.results.correctAnswers}</Text>
                  <Text style={styles.scores}>
                    Incorrect Answers: {5 - this.state.results.correctAnswers}
                  </Text>
                  <Text style={styles.scores}>Total Score: {25}</Text>
                  <Text style={styles.scores}>Obtained Score: {this.state.results.score}</Text>

                 <TouchableOpacity
                         style={styles.button}
                         onPress={this.reset}
                       >
                         <Text
                            style={{color: "white", fontWeight: "bold"}}
                         >
                            Restart
                         </Text>
                 </TouchableOpacity>

                 <TouchableOpacity
                         style={styles.button}
                         onPress={() => this.props.navigation.navigate("QuizMain")}
                       >
                         <Text
                            style={{color: "white", fontWeight: "bold"}}
                         >
                            Home
                         </Text>
                 </TouchableOpacity>

                </View>
              )}
            </View>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
      },

      welcome: {
        fontSize: 22,
        fontWeight: "bold",
        backgroundColor: "#F9A826",
        color: "white",
        padding: 20,
        borderRadius: 10
      },

      loadingQuestions: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },

      scores: {
        fontSize: 16,
        color: "#777",
        textAlign: "center",
        padding: 10,
        marginTop: 10,
        lineHeight: 25
      },

      button: {
        backgroundColor: "#F9A826",
        padding: 10,
        marginTop: 10,
        borderRadius: 10
      }
    });