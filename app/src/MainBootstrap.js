import {Navigation} from 'react-native-navigation';

export function showMainApp() {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Users',
                screen: 'doggy.UserListScreen',
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
                label: 'Two',
                screen: 'doggy.DogListScreen',
                title: 'Screen Two',
                navigatorStyle: {
                    tabBarBackgroundColor: '#4dbce9',
                }
            },
            {
                label: 'Me',
                screen: 'doggy.ViewerProfileScreen',
                title: 'Me',
                navigatorStyle: {
                    navBarHidden: true,
                    tabBarBackgroundColor: '#4dbce9',
                }
            }
        ]
    });
}

