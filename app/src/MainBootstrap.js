import {Navigation} from 'react-native-navigation';

export function showMainApp() {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Users',
                screen: 'example.UserListScreen',
                title: 'Users',
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
                navigatorStyle: {
                    navBarHidden: true,
                    tabBarBackgroundColor: '#4dbce9',
                }
            }
        ]
    });
}

