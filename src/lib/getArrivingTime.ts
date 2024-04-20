import { addDays, format } from "date-fns";

export function getArrivingTime(){

    const day = Math.floor(Math.random() * 6 + 2);

    const arrivingTime = format((addDays(new Date(), day)),'d MMMM yyyy');

    return {day,arrivingTime};

}
export function getArrivingTimeByNumber(day:number,date:Date){
    const arrivingTime = format((addDays(new Date(date), day)),'d MMMM yyyy');

    return {day,arrivingTime};

}