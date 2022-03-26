import moment from "moment";

export const convertDate = (date: string) => {
    return moment(date).utc().format("ddd DD/MM/YYYY");
}