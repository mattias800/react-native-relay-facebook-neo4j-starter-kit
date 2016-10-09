import {Navigation} from "react-native-navigation";

export function showMainAppScreen() {
    Navigation.startTabBasedApp(
        {
            tabs: [
                {
                    label: 'Home',
                    screen: 'example.DashboardScreen',
                    title: 'Home',
                    icon: require('./tab-menu/newsfeed.png'), // local image asset for the tab icon unselected state (optional on iOS)
                    //selectedIcon: require('../img/one_selected.png'), // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)
                    navigatorStyle: {}
                },
                {
                    label: 'Users',
                    screen: 'example.UserListScreen',
                    title: 'Users',
                    icon: require('./tab-menu/people.png'), // local image asset for the tab icon unselected state (optional on iOS)
                    //selectedIcon: require('../img/one_selected.png'), // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)
                    navigatorStyle: {}
                },
                {
                    label: 'Me',
                    screen: 'example.ViewerProfileScreen',
                    title: 'Me',
                    icon: require('./tab-menu/profile.png'), // local image asset for the tab icon unselected state (optional on iOS)
                    navigatorStyle: {}
                }
            ]
        });
}

