import RNAccountKit from 'react-native-facebook-account-kit'

export function loginWithSms() {
    return new Promise((resolve, reject) => {
        RNAccountKit.loginWithPhone()
            .then((result) => {
                if (!result) {
                    reject({isCancelled: true});
                } else {
                    console.log("Auth with sms done");
                    console.log(result);
                    resolve(result)
                }
            })
            .catch(e => {
                reject(e);
            });
    });

}

export function loginWithEmail() {
    return new Promise((resolve, reject) => {
        RNAccountKit.loginWithEmail()
            .then((result) => {
                if (!result) {
                    reject({isCancelled: true});
                } else {
                    console.log("Auth with email done");
                    console.log(result);
                    resolve(result)
                }
            })
            .catch(e => {
                reject(e);
            });
    });

}

