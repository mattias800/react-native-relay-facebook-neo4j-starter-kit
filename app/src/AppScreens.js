import {Navigation} from "react-native-navigation";
import LoginPage from "./use-case/login/components/LoginPage";
import {ViewerProfilePageComponent} from "./use-case/profile/ViewerProfilePage";
import {UserListPageComponent} from "./use-case/user-list/UserListPage";
import {ProfilePageComponent} from "./use-case/profile/ProfilePage";

export function registerScreens() {
    Navigation.registerComponent('example.UserListScreen', () => UserListPageComponent);
    Navigation.registerComponent('example.LoginScreen', () => LoginPage);
    Navigation.registerComponent('example.ViewerProfileScreen', () => ViewerProfilePageComponent);
    Navigation.registerComponent('example.UserProfileScreen', () => ProfilePageComponent);
}