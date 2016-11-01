/* @flow */
import React from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TextInput} from "react-native";
import {SelectedItem} from "./SelectedItem";

const labelReducer = item => item.label;

const data = [
    {id: 123, label: "Mattias"},
    {id: 124, label: "Must"},
    {id: 125, label: "Magnus"}
];

const labelReducerWrapper = (item, labelReducer) => {
    if (typeof item === "string") {
        return item;
    } else {
        return labelReducer(item);
    }
};

export class ComboBox extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(data), // TODO props.data
            selectedItems: [
                {id: 123, label: "Mattias"},
                {id: 124, label: "Must"}
            ]
        };
    }

    componentWillReceiveProps(nextProps) {
        const dataSource = this.state.dataSource.cloneWithRows(nextProps.data);
        this.setState({dataSource});
    }

    render() {

        const {onChange} = this.props;
        const {dataSource} = this.state;

        const {selectedItems} = this.state;

        return (
            <View style={containerStyle}>
                {
                    selectedItems && selectedItems.map((item, index) => (
                        <SelectedItem key={index}
                                      onRemove={() => this.removeItem(index)}
                                      label={labelReducerWrapper(item, labelReducer)} />
                    ))
                }
                <View style={inputAndDropdownContainer}>
                    <TextInput style={textInputStyle}
                               value={this.state.text}
                               onChangeText={(text) => this.setState({text})}
                               onSubmitEditing={() => this.addItemFromTextInput()} />
                    <ListView dataSource={dataSource}
                              keyboardShouldPersistTaps={true}
                              renderRow={this.renderItem}
                              style={listStyle}
                    />
                </View>
            </View>
        );
    }

    renderItem(item) {
        return (
            <Text>{labelReducerWrapper(item, labelReducer)}</Text>
        );
    }

    removeItem(index) {
        const {onChange} = this.props;
        console.log("removeItem");
        console.log(index);

        const selectedItems = this.state.selectedItems;
        selectedItems.splice(index, 1);

        this.setState({selectedItems});
        if (onChange) {
            onChange(selectedItems);
        }
    }

    addItem(item) {
        const {onChange} = this.props;
        const selectedItems = this.state.selectedItems;
        selectedItems.push(item);
        this.setState({selectedItems});
        if (onChange) {
            onChange(selectedItems);
        }
    }

    addItemFromTextInput() {
        const {text} = this.state;
        this.addItem(text);
        this.setState({text: ""})
    }

}

const containerStyle = {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#eeeeee",
    padding: 2,
    zIndex: 1
};

const listStyle = {
    backgroundColor: 'white',
    borderTopWidth: 0,
    left: 0,
    position: 'absolute',
    right: 0
};

const inputAndDropdownContainer = {
    position: "relative",
    backgroundColor: "blue",
    flex: 1
};

const textInputStyle = {
    backgroundColor: "red",
    flex: 1
};

const dropdownContainer = {
    position: "absolute",
    zIndex: 10000000,
};