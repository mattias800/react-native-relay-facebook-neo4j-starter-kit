import RNAccountKit, {
    Color,
    StatusBarStyle,
} from 'react-native-facebook-account-kit'

export function configureAccountKit() {
    RNAccountKit.configure({
        defaultCountry: 'SE',
        titleType: 'login',
        initialAuthState: '',
        theme: {
            // Background
            backgroundColor: Color.hex('#fff'),
            backgroundImage: 'background.png',
            // Button
            buttonBackgroundColor: Color.hex('#fff'),
            buttonBorderColor: Color.hex('#ccc'),
            buttonTextColor: Color.hex('#000'),
            // Button disabled
            buttonDisabledBackgroundColor: Color.hex('#ccc'),
            buttonDisabledBorderColor: Color.hex('#999'),
            buttonDisabledTextColor: Color.hex('#666'),
            // Header
            headerBackgroundColor: Color.hex('#ccc'),
            headerButtonTextColor: Color.hex('#333'),
            headerTextColor: Color.hex('#111'),
            // Input
            inputBackgroundColor: Color.hex('#fff'),
            inputBorderColor: Color.hex('#ccc'),
            inputTextColor: Color.hex('#000'),
            // Others
            iconColor: Color.hex('#333'),
            textColor: Color.hex('#333'),
            titleColor: Color.hex('#333'),
            // Header
            statusBarStyle: StatusBarStyle.LightContent, // or StatusBarStyle.Default
        }
    });
}