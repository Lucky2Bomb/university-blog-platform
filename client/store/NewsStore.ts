import { makeAutoObservable } from "mobx";
import { INewsStore } from "../types/News";
import { IPublication } from "../types/Publication";
import { getNews } from "../requests/news/get-news";

export default class NewsStore implements INewsStore {
    constructor() {
        makeAutoObservable(this);
    }


    allCount: number = 0;
    currentCount: number = 10;
    offset: number = 6;
    publications: IPublication[] = [];
    countSize: number = 10;
    mainPublications: IPublication[] = [];
    setMainPublications = (mainPublications: IPublication[]): void => {
        this.mainPublications = mainPublications;
    }
    setAllCount = (allCount: number): void => {
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