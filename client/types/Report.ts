import { IProfile } from "./Profile";

export interface IReport {
    id: number;
    checked: boolean;
    userId: number;
    publicationId: number;
    updatedAt: string;
    createdAt: string;
    user: IProfile;
}

export interface IReportStore {
    activeReportId: number;
    selectedReportsId: Set<number>;
    reports: IReport[];
    allCount: number;
    currentCount: number;
    offset: number;

    dropSelected(): void;
    selectReportId(reportId: number): void;
    setActiveReport(reportId: number): void;
    unselectReportId(reportId: number): void;
    setReports(reports: IReport[]): void;
    setAllCount(allcount: number): void;
    setCurrentCount(currentCount: number): void;
    setOffset(offset: number): void;
}

export interface IReportResponse {
    reports: IReport[],
    allCount: number,
    currentCount: number,
    offset: number
}