import { makeAutoObservable } from "mobx";
import { INewsStore } from "../types/News";
import { IPublication } from "../types/Publication";

export default class NewsStore implements INewsStore {
    constructor() {
        makeAutoObservable(this);
    }

    allCount: number = 0;
    currentCount: number = 0;
    offset: number = 0;
    publications: IPublication[] = [];

    setAllCount =(allCount: number): void => {
        this.allCount = allCount;
    }
    setCurrentCount = (currentCount: number): void => {
        this.currentCount = currentCount;
    }
    setOffset = (offset: number): void => {
        this.offset = offset;
    }
    setPublications = (publications: IPublication[]): void => {
        this.publications = publications;
    }
}