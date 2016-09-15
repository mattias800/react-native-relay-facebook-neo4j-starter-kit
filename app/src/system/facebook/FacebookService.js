const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;

// ...


export function loginWithFacebook() {

    return LoginManager.logInWithReadPermissions(['public_profile']).then(
        function (result) {
            if (result.isCancelled) {
                alert('Login cancelled');
            } else {
                alert('Login success with permissions: '
                    + result.grantedPermissions.toString());
            }
            return result;
        },
        function (error) {
            alert('Login fail with error: ' + error);
        }
    );

}