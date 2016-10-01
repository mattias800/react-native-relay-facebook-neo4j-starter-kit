import {Navigation} from "react-native-navigation";

export function showMainAppScreen() {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Users',
                screen: 'example.UserListScreen',
                title: 'Users',
                icon: require('./tab-menu/people.png'), // local image asset for the tab icon unselected state (optional on iOS)
                //selectedIcon: require('../img/one_selected.png'), // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)
                navigatorStyle: {
                    navBarBackgroundColor: '#4dbce9',
                    navBarTextColor: '#ffff00',
                    navBarSubtitleTextColor: '#ff0000',
                    navBarButtonColor: '#ffffff',
                    statusBarTextColorScheme: 'light',
                    tabBarBackgroundColor: '#4dbce9',
                    tabBarButtonColor: '#ffffff',
                    tabBarSelectedButtonColor: '#ffff00'
                }
            },
            {
                label: 'Me',
                screen: 'example.ViewerProfileScreen',
                title: 'Me',
                icon: require('./tab-menu/profile.png'), // local image asset for the tab icon unselected state (optional on iOS)
                navigatorStyle: {
                    navBarHidden: true,
                    tabBarBackgroundColor: '#4dbce9',
                }
            }
        ]
    });
}

