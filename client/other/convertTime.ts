export const convertDateToDD_MM_YYYY = (datetime: Date, hourOffsetByTimeZone: number = 0, minuteOffsetByTimeZone: number = 0, separator: string = "."): string => {
    const convertDatetime = getShiftUTCtime(datetime, hourOffsetByTimeZone, minuteOffsetByTimeZone);
    return `${convertNumberToNN(convertDatetime.getDate())}${separator}${convertNumberToNN(convertDatetime.getMonth())}${separator}${convertDatetime.getFullYear()}`;
}

export const convertDateToHH_MM = (datetime: Date, hourOffsetByTimeZone: number = 0, minuteOffsetByTimeZone: number = 0, separator: string = ":"): string => {
    const convertDatetime = getShiftUTCtime(datetime, hourOffsetByTimeZone, minuteOffsetByTimeZone);
    return `${convertNumberToNN(convertDatetime.getHours())}${separator}${convertNumberToNN(convertDatetime.getMinutes())}`;
}

const convertNumberToNN = (number: number): string => {
    return Number(number) > 9 ? `${number}` : `0${number}`;
}

export const getShiftUTCtime = (datetime: Date = new Date(), hourOffsetByTimeZone: number = 0, minuteOffsetByTimeZone: number = 0): Date => {
    const dt = new Date(datetime);
    dt.setHours(Number(datetime.getHours()) + Number(hourOffsetByTimeZone));
    dt.setMinutes(Number(datetime.getMinutes()) + Number(minuteOffsetByTimeZone));
    return dt;
}