import moment from "moment";

export function formatDateForForm(date: Date) {
    return moment(date).format('MMMM Do YYYY');
}

let date = new Date();
date.toISOString();