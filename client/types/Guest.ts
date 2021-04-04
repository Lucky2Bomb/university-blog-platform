import { IProfile } from "./Profile";

export interface IGuestRequest {
    id: number;
    full_name: string;
    email: string;
    checked: boolean;
    userId: number;
    createdAt: string;
    updatedAt: string;
    user: IProfile;
}

export interface IGuestReqestListResponse {
    guestRequests: IGuestRequest[];
    currentCount: number;
    allCount: number;
    offset: number;
}

export interface IGuestStore {

    activeGuestRequestId: number;
    selectedGuestRequestsId: Set<number>;
    guestRequests: IGuestRequest[];
    allCount: number;
    currentCount: number;
    offset: number;

    dropSelected(): void;
    selectGuestRequestId(guestRequestId: number): void;
    setActiveGuestRequest(guestRequestId: number): void;
    unselectGuestRequestId(guestRequestId: number): void;
    setGuestRequests(guestRequests: IGuestRequest[]): void;
    setAllCount(allcount: number): void;
    setCurrentCount(currentCount: number): void;
    setOffset(offset: number): void;
}