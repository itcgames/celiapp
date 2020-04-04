import { createStackNavigator } from 'react-navigation';
import CeliAppScreen from '../screens/CeliAppScreen';
import HomeScreen from '../screens/HomeScreen';
import VideoScreen from '../screens/VideoScreen';
import GlutenedScreen from '../screens/GlutenedScreen';
import QuizScreen from '../screens/QuizScreen';
import CrossContamScreen1 from '../screens/CrossContamScreen1';
import CrossContamScreen2 from '../screens/CrossContamScreen2';
import CrossContamScreen3 from '../screens/CrossContamScreen3';
import CrossContamScreen4 from '../screens/CrossContamScreen4';



const StackNavigator = createStackNavigator({
    CeliApp: CeliAppScreen,
    Home: HomeScreen,
    Video: VideoScreen,
    Glutened: GlutenedScreen,
    CCP1: CrossContamScreen1,
    CCP2: CrossContamScreen2,
    CCP3: CrossContamScreen3,
    CCP4: CrossContamScreen4,
    Quiz: QuizScreen
});

export default StackNavigator;
