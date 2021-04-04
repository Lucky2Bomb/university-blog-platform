import { makeAutoObservable } from "mobx";
import { IGuestStore, IGuestRequest } from './../types/Guest';

export default class GuestStore implements IGuestStore {
    constructor() {
        makeAutoObservable(this);
    }
    activeGuestRequestId: number = 0;
    selectedGuestRequestsId: Set<number> = new Set<number>();
    guestRequests: IGuestRequest[];
    allCount: number = 0;
    currentCount: number = 10;
    offset: number = 0;

    dropSelected = (): void => {
        this.selectedGuestRequestsId = new Set<number>();
    }
    selectGuestRequestId = (guestRequestId: number): void => {
        this.selectedGuestRequestsId.add(guestRequestId);
    }
    unselectGuestRequestId = (guestRequestId: number): void => {
        this.selectedGuestRequestsId.delete(guestRequestId);
    }
    setActiveGuestRequest = (guestRequestId: number): void => {
        this.activeGuestRequestId = guestRequestId;
    }
    setGuestRequests = (guestRequests: IGuestRequest[]): void => {
        this.guestRequests = guestRequests;
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