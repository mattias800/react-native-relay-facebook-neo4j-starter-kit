import {Navigation} from 'react-native-navigation';

export function showRegistrationScreen() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'example.RegistrationScreen',
            title: 'Navigation',
            navigatorStyle: {
                navBarHidden: true,
                navBarBackgroundColor: '#4dbce9',
                navBarTextColor: '#ffff00',
                navBarSubtitleTextColor: '#ff0000',
                navBarButtonColor: '#ffffff',
                statusBarTextColorScheme: 'light'
            }
        },
        animationType: 'slide-down'
    });
}