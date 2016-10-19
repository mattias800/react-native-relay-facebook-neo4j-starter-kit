import {Platform} from "react-native";
import ImagePicker from "react-native-image-picker";

export function selectMedia() {

    return new Promise((resolve, reject) => {
        // More info on all the options is below in the README...just some common use cases shown here
        var options = {
            title: 'Select photo or video',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                resolve(null);
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                reject({error: response.error});
            } else {
                // You can display the image using either data...
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    const source = {uri: response.uri, isStatic: true};
                }

                resolve(source);
            }
        });

    });
}