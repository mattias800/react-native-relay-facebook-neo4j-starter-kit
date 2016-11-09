/* @flow */
import React from "react";
import {
    AppRegistry,
    ActivityIndicator,
    StyleSheet,
    Text,
    ScrollView,
    View,
    ListView,
    TextInput,
    TouchableHighlight
} from "react-native";
import {SelectedItem} from "./SelectedItem";

const labelReducerWrapper = (item: any, labelReducer: Function) => {
    if (typeof item === "string") {
        return item || "";
    } else {
        return labelReducer(item) || "";
    }
};

export class ComboBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selectedItems: []};
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {

        const {onChange, allowAddText, data, fetching, labelReducer} = this.props;

        const {selectedItems, text} = this.state;

        return (
            <View style={containerStyle}>
                <View style={selectedItemsAndInputStyle}>
                    {
                        selectedItems && selectedItems.map((item, index) => (
                            <SelectedItem key={index}
                                          onRemove={() => this.removeItem(index)}
                                          label={labelReducerWrapper(item, labelReducer)} />
                        ))
                    }
                    <TextInput style={textInputStyle}
                               value={this.state.text}
                               onChangeText={text => this.onChangeText(text)}
                               ref="input"
                               blurOnSubmit={false}
                               onSubmitEditing={() => allowAddText && this.addItemFromTextInput()} />
                    { this.renderFetching() }
                </View>
                { this.renderDropdown() }
            </View>
        );
    }

    renderFetching() {
        const {fetching} = this.props;
        if (fetching) {
            return (
                <ActivityIndicator style={{alignSelf:"flex-end"}} />
            );
        }
    }

    renderDropdown() {
        const {data, labelReducer, allowDuplicates, keyReducer} = this.props;

        let filteredData = allowDuplicates ? data : data.filter(item => !this.isSelected(item));

        if (data && data.length) {
            return (
                <ScrollView style={dropdownContainer}>
                    {
                        filteredData && filteredData.map((item, index) => (
                            <View key={index}>
                                <TouchableHighlight onPress={() => {
                                    this.addItem(item);
                                    this.refs.input.focus();
                                }}
                                                    style={touchableListItemStyle}>
                                    <Text style={optionItemTextStyle}>{labelReducerWrapper(item,
                                                                                           labelReducer)}</Text>
                                </TouchableHighlight>
                            </View>
                        ))
                    }
                </ScrollView>
            );
        }
    }

    onChangeText(text) {
        const {onChangeText} = this.props;
        this.setState({text});
        if (onChangeText) {
            onChangeText(text);
        }

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

    isSelected(item) {
        const {keyReducer} = this.props;
        const {selectedItems} = this.state;

        const selectedKeys = selectedItems.map(keyReducer);
        return selectedKeys.indexOf(keyReducer(item)) >= 0;
    }
}

const containerStyle = {
    position: "relative",
    zIndex: 1

};

const selectedItemsAndInputStyle = {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#eeeeee",
    padding: 2,
    paddingTop: 0,
};

const textInputStyle = {
    flex: 1,
    marginTop: 2,
    height: 18,
    fontSize: 12

};

const dropdownContainer = {
    position: "absolute",
    left: 0,
    right: 0,
    borderWidth: 0.5,
    borderColor: "#cccccc"
};

const touchableListItemStyle = {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5
};

const optionItemTextStyle = {
    fontSize: 12,
    color: "#333377"
};