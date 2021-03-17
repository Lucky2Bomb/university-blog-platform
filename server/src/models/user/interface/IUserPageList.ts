
import { User } from './../database/user.model';
export interface IUserPageList {
    users: User[],
    currentCount: number,
    allCount: number,
    offset: number,
}