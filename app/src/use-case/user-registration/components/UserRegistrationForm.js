/* @flow */

import React from "react";
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    Text,
    View
} from 'react-native';
import {Button, FormLabel, FormInput} from 'react-native-elements'
import * as FormTypes from "../../../common/form/validation/FormTypes";
var t = require('tcomb-form-native');

var Form = t.form.Form;


export class UserRegistrationForm extends React.Component {

    onSubmit() {
        // call getValue() to get the values of the form
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of UserRegistrationFormModel
            this.props.onSubmit(value);
        } else {
            console.log("Validation failed");
        }
    }

    render() {
        const {user} = this.props;
        const {id, firstName, lastName, email, profilePhotoUrl} = user;

        var UserRegistrationFormModel = t.struct({
            firstName: t.String,              // a required string
            lastName: t.String,  // an optional string
            email: FormTypes.Email
        });

        var options = {
            fields: {
                firstName: {
                    placeholder: 'Enter your first name.',
                    error: 'You must enter your first name.'
                },
                lastName: {
                    placeholder: 'Enter your last name.',
                    error: 'You must enter your last name.'
                },
                email: {
                    label: "E-mail",
                    placeholder: 'Enter your e-mail address.',
                    error: 'You must enter a valid email address.'
                }
            }
        };

        return (
            <View style={styles.container}>
                {/* display */}
                <Form
                    ref="form"
                    value={user}
                    type={UserRegistrationFormModel}
                    options={options}
                />
                <View style={{paddingTop:20}}>
                    <Button raised
                            backgroundColor="#abe"
                            icon={{name: 'check',  type: 'font-awesome'}}
                            title='CONTINUE'
                            onPress={() => this.onSubmit()} />
                </View>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});