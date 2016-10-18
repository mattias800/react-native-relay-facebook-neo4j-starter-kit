export function createButtons(onIgnore: Function, onAccept: Function) {
    return [
        {text: 'Cancel'},
        {text: 'Ignore', onPress: onIgnore},
        {text: 'Accept', onPress: onAccept},
    ];
}