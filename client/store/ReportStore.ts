import { makeAutoObservable } from "mobx";
import { IGuestStore, IGuestRequest } from './../types/Guest';
import { IReportStore, IReport } from "../types/Report";

export default class ReportStore implements IReportStore {
    constructor() {
        makeAutoObservable(this);
    }
    activeReportId: number;
    selectedReportsId: Set<number> = new Set<number>();
    reports: IReport[] = [];
    allCount: number = 0;
    currentCount: number = 10;
    offset: number = 0;


    dropSelected = (): void => {
        this.selectedReportsId = new Set<number>();
    }
    selectReportId = (reportId: number): void => {
        this.selectedReportsId.add(reportId);
    }
    unselectReportId = (reportId: number): void => {
        this.selectedReportsId.delete(reportId);
    }
    setActiveReport = (reportId: number): void => {
        this.activeReportId = reportId;
    }
    setReports = (reports: IReport[]): void => {
        this.reports = reports;
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
}