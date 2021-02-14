import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../../constants/Interactions';
import TakeQuiz from "../components/Quiz/QuestionScreen";
import { Ionicons } from "@expo/vector-icons";

export default class QuizMain extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "CeliQuiz",
  });

  UNSAFE_componentWillMount() {
    CeliLogger.addLog("QuizMain", Interactions.OPEN);
  }

  componentWillUnmount() {
    CeliLogger.addLog("QuizMain", Interactions.CLOSE);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../components/Quiz/assets/quizhome.png")}
          style={{ width: 300, height: 150 }}
        />
        <Text style={styles.welcome}>Test Your Celiac Knowledge!!</Text>
        <Text style={styles.paragraph}>
          This quiz will ask all the questions to see how well you know life with Celiac Disease.
        </Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("TakeQuiz")}
         >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Ionicons name="md-play" size={32} color="white" />
            <Text
              style={{color: "white", fontWeight: "bold", marginLeft: 10, marginTop: 5}}
            >
              Start Questions
            </Text>
          </View>
        </TouchableOpacity>
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
    padding: 10,
    borderRadius: 10
  },

  button: {
    backgroundColor: "#2F2E41",
    padding: 10,
    borderRadius: 10
  },

  paragraph: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    padding: 10,
    marginTop: 15,
    lineHeight: 25
  }
});