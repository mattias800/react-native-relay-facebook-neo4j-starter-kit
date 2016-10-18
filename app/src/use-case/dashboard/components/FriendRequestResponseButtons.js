export function createButtons(onIgnore: Function, onAccept: Function) {
    return [
        {text: 'Accept', onPress: onAccept},
        {text: 'Ignore', onPress: onIgnore},
        {text: 'Cancel', style: 'cancel'},
    ];
}