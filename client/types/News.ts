import { IPublication } from "./Publication";

export interface INewsStore {
    allCount: number;
    currentCount: number;
    offset: number;
    publications: IPublication[];

    setAllCount(allCount: number): void;
    setCurrentCount(currentCount: number): void;
    setOffset(offset: number): void;
    setPublications(publications: IPublication[]): void;
}

export interface INewsResponse {
    allCount: number;
    currentCount: number;
    offset: number;
    publications: IPublication[];
}