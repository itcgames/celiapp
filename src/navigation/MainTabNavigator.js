import React from "react";
import {
  createStackNavigator
} from "react-navigation-stack";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import QuizMainScreen from "../screens/QuizMainScreen";
import TabBarIcon from "../components/TabBarIcon";
import EvaluationScreen from "../screens/EvaluationScreen";
import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import DebugScreen from "../screens/DebugScreen";
import SymptomTrackerScreen from "../screens/SymptomTrackerScreen";
import FoodDiaryScreen from "../screens/FoodDiaryScreen";
import GIPScreen from "../screens/GIPScreen";
import EmoteTrackerScreen from "../screens/EmoteTrackerScreen";
import SymptomViewScreen from "../screens/SymptomViewScreen";
import FoodViewScreen from "../screens/FoodViewScreen";
import GIPViewScreen from "../screens/GIPViewScreen";
import EmoteViewScreen from "../screens/EmoteViewScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CameraScreen from "../screens/CameraScreen";
import GearScreen from "../screens/GearScreen";
import SymptomTrackerMoreSymptomsScreen from "../screens/SymptomTrackerMoreSymptomsScreen";
import SymptomTrackerAddNewScreen from "../screens/SymptomTrackerAddNewScreen";
import GlutenbuddyRoot from "../screens/GlutenbuddyRoot";
import Wardrobe from "../components/Glutenbuddy/screens/Wardrobe";
import Challenges from "../components/Glutenbuddy/screens/Challenges";
import Achievements from "../components/Glutenbuddy/screens/Achievements";
import ChallengesTest from "../components/Glutenbuddy/screens/ChallengesTest";
import QuestionScreen from "../components/Quiz/QuestionScreen";

const EvaluationStack = createStackNavigator({
  Evaluation: EvaluationScreen,
});

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

const GlutenStack = createStackNavigator({
  Glutenbuddy: GlutenbuddyRoot,
});


const TabNavStack = createMaterialTopTabNavigator(
  {
    Evaluation: {
      screen: EvaluationStack,
      navigationOptions: {
        //tabBarLabel: 'Evaluation',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"md-trending-up"} />
        ),
      },
    },
    Glutenbuddy: {
      screen: GlutenStack,
      navigationOptions: {
        //tabBarLabel: 'Calendar',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"ios-happy"} />
        ),
      },
    },
    Calendar: {
      screen: CalendarStack,
      navigationOptions: {
        //tabBarLabel: 'Calendar',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"md-calendar"} />
        ),
      },
    },
/** // Screen for x-Day-challenge:
    Home: {
      screen: HomeScreen, //Note for Oisin: replace this with your component
      navigationOptions: {
        //tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"md-paw"} />
        ),
      },
    },
*/
  },
  {
    initialRouteName: "Glutenbuddy",
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: "transparent",
      },
      indicatorStyle: {
        backgroundColor: "lightblue",
      },
    },
    lazy: false,
  }
);

export default createStackNavigator({
  TabBar: {
    screen: TabNavStack,
    navigationOptions: {
      header: null,
      title: ''
    },
  },
  QuizMain: {
    screen: QuizMainScreen,
  },
  TakeQuiz: {
    screen: QuestionScreen,
  },
  AddSymptom: {
    screen: SymptomTrackerScreen,
  },
  MoreSymptoms: {
    screen: SymptomTrackerMoreSymptomsScreen,
  },
  AddNewSymptom: {
    screen: SymptomTrackerAddNewScreen,
  },
  ViewSymptom: {
    screen: SymptomViewScreen,
  },
  AddMeal: {
    screen: FoodDiaryScreen,
  },
  ViewMeal: {
    screen: FoodViewScreen,
  },
  AddEmote: {
    screen: EmoteTrackerScreen,
  },
  AddGIP: {
    screen: GIPScreen,
  },
  ViewGIP: {
    screen: GIPViewScreen,
  },
  ViewEmote: {
    screen: EmoteViewScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
  Debug: {
    screen: DebugScreen,
  },
  Camera: {
    screen: CameraScreen,
  },
  Gear: {
    screen: GearScreen,
  },

  Wardrobe: Wardrobe,
  Challenges: Challenges,
  Achievements: {
    screen: Achievements,
  },
  ChallengesTest: ChallengesTest,
});
