import {Navigation} from "react-native-navigation";
import LoginPage from "./use-case/login/components/LoginPage";
import {ViewerProfilePageComponent} from "./use-case/profile/ViewerProfilePage";
import {UserListPageComponent} from "./use-case/user-list/UserListPage";
import {UserProfilePageComponent} from "./use-case/profile/UserProfilePage";
import {UserRegistrationPageComponent} from "./use-case/user-registration/UserRegistrationPage";
import {UserFriendListPageComponent} from "./use-case/user-friend-list/UserFriendListPage";
import {UsersAnimalsPageComponent} from "./use-case/users-animals/UsersAnimalsPage";

export function registerScreens() {
    Navigation.registerComponent('example.LoginScreen', () => LoginPage);
    Navigation.registerComponent('example.RegistrationScreen', () => UserRegistrationPageComponent);
    Navigation.registerComponent('example.UserListScreen', () => UserListPageComponent);
    Navigation.registerComponent('example.ViewerProfileScreen', () => ViewerProfilePageComponent);
    Navigation.registerComponent('example.UserProfileScreen', () => UserProfilePageComponent);
    Navigation.registerComponent('example.UserProfileFriendsScreen', () => UserFriendListPageComponent);
    Navigation.registerComponent('example.UserProfileAnimalsScreen', () => UsersAnimalsPageComponent);
}