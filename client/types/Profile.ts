export interface IMyProfileStore {
    roles: string[];
    profile: object;

    setRoles(roles: string[]): void;
    setProfile(profile: object): void;
}