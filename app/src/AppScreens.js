import {Navigation} from "react-native-navigation";
import LoginPage from "./use-case/login/components/LoginPage";
import {ViewerProfilePageComponent} from "./use-case/users/profile/ViewerProfilePage";
import {UserListPageComponent} from "./use-case/users/user-list/UserListPage";
import {UserProfilePageComponent} from "./use-case/users/profile/UserProfilePage";
import {UserRegistrationPageComponent} from "./use-case/users/user-registration/UserRegistrationPage";
import {UserFriendListPageComponent} from "./use-case/users/user-friend-list/UserFriendListPage";
import {UsersAnimalsPageComponent} from "./use-case/users/users-animals/UsersAnimalsPage";
import {AddAnimalPageComponent} from "./use-case/animals/add-animal/AddAnimalPage";
import {DashboardPageComponent} from "./use-case/dashboard/DashboardPage";

export function registerScreens() {
    Navigation.registerComponent('example.LoginScreen', () => LoginPage);
    Navigation.registerComponent('example.RegistrationScreen', () => UserRegistrationPageComponent);
    Navigation.registerComponent('example.DashboardScreen', () => DashboardPageComponent);
    Navigation.registerComponent('example.UserListScreen', () => UserListPageComponent);
    Navigation.registerComponent('example.ViewerProfileScreen', () => ViewerProfilePageComponent);
    Navigation.registerComponent('example.UserProfileScreen', () => UserProfilePageComponent);
    Navigation.registerComponent('example.UserProfileFriendsScreen', () => UserFriendListPageComponent);
    Navigation.registerComponent('example.UserProfileAnimalsScreen', () => UsersAnimalsPageComponent);
    Navigation.registerComponent('example.AddAnimalScreen', () => AddAnimalPageComponent);
}