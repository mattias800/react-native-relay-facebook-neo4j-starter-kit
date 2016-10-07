/* @flow */
import React from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {formatDateForForm} from "../../../../common/util/DateFormatter";
import {transformFormModelToPayload} from "./FormModelTransformer";
const t = require('tcomb-form-native');

const Form = t.form.Form;

export const NewAnimalForm = React.createClass({

    propTypes: {
        onSubmit: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            value: {
                birthDate: new Date(),
                deathDate: new Date()
            }
        };
    },

    onChange(value) {
        console.log("onChange()");

        this.setState({value});
    },

    onSubmit() {
        const {value} = this.state;
        // call getValue() to get the values of the form
        let namesFormValue = this.refs.namesForm.getValue();
        if (!namesFormValue) {
            alert("You must enter names.");
            return;
        }
        if (!namesFormValue.ownsDog) {
            alert("You can only add dogs that you own.\nIf you previously owned this dog, please ask the current owner to add it.");
            return;
        }

        if (value.wantToEnterDates) {
            const birthFormValue = this.refs.birthForm.getValue();
            if (!birthFormValue) {
                alert("Please enter missing information.");
                return;
            } else {
                namesFormValue = {
                    ...namesFormValue,
                    ...birthFormValue
                }
            }
        }

        this.props.onSubmit(transformFormModelToPayload(value));
    },

    render() {

        const {value, showDobForm} = this.state;

        console.log("render()");

        const formTypes = {
            names: t.struct({
                fullName: t.String,
                nickName: t.String,
                ownsDog: t.Boolean,
                wantToEnterDates: t.Boolean,
            }),
            birth: t.struct({
                birthDate: t.Date,
                deceased: t.Boolean,
                ...(value.deceased ? {forgotDeathDate: t.Boolean} : {}),
                ...(value.deceased && !value.forgotDeathDate ? {deathDate: t.Date} : {})
            })
        };


        const options = {
            names: {
                fields: {
                    fullName: {
                        placeholder: 'Enter your dogs full name.',
                        error: 'You must enter your dogs first name.'
                    },
                    lastName: {
                        placeholder: 'Enter your dogs nick name.',
                        error: 'You must enter your dogs nick name.'
                    },
                    ownsDog: {
                        label: "This is my dog"
                    },
                    wantToEnterDates: {
                        label: "I want to enter birth date"
                    },
                }
            },
            birth: {
                fields: {
                    birthDate: {
                        mode: "date",
                        config: {
                            format: formatDateForForm,
                        }
                    },
                    deceased: {
                        label: "Has this dog passed away?",
                        help: value.deceased && "Sadly, this dog is no longer with us :("
                    },
                    forgotDeathDate: {
                        label: "I don't remember the date."
                    },
                    deathDate: {
                        label: "Date of passing",
                        mode: "date",
                        config: {
                            format: formatDateForForm
                        }
                    }
                }
            }
        };


        return (
            <View style={container}>
                {/* display */}
                <View>
                    <Form
                        ref="namesForm"
                        type={formTypes.names}
                        options={options.names}
                        value={value}
                        onChange={this.onChange}
                    />
                </View>
                {
                    value.wantToEnterDates &&
                    <View>
                        <Form
                            ref="birthForm"
                            type={formTypes.birth}
                            options={options.birth}
                            value={value}
                            onChange={this.onChange}
                        />
                    </View>
                }
                <View style={{paddingTop:20}}>
                    <Button backgroundColor="#abe"
                            icon={{name: 'check',  type: 'font-awesome'}}
                            title='SAVE'
                            onPress={() => this.onSubmit()} />
                </View>
            </View>
        );
    },


});

const container = {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
};