import {Navigation} from "react-native-navigation";
import Home from "./use-case/home/components/Home";
import DogList from "./use-case/dog-list/components/DogList";
import LoginPage from "./use-case/login/components/LoginPage";
import {ViewerProfilePageRoot} from "./use-case/profile/ViewerProfilePage";

// register all screens of the app (including internal ones)
export function registerScreens() {
    Navigation.registerComponent('doggy.LoginScreen', () => LoginPage);
    Navigation.registerComponent('doggy.HomeScreen', () => Home);
    Navigation.registerComponent('doggy.DogListScreen', () => DogList);
    Navigation.registerComponent('doggy.ViewerProfileScreen', () => ViewerProfilePageRoot);
}