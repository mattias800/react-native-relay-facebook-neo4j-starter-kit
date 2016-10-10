import moment from "moment";

export function formatDateForForm(date: Date) {
    return moment(date).format('MMMM Do YYYY');
}

export function timeSince(date: Date): string {
    return moment(date).fromNow()
}

