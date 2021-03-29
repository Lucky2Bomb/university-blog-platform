import AuthStore from './AuthStore';
import MyProfileStore from './MyProfileStore';
import NewsStore from './NewsStore';
import UniversityStore from './UniversityStore';
import ControlPanelStore from './ControlPanelStore';

class RootStore {
    authStore: AuthStore;
    myProfile: MyProfileStore;
    newsStore: NewsStore;
    universityStore: UniversityStore;
    controlPanelStore: ControlPanelStore;

    constructor() {
        this.authStore = new AuthStore();
        this.myProfile = new MyProfileStore();
        this.newsStore = new NewsStore();
        this.universityStore = new UniversityStore();
        this.controlPanelStore = new ControlPanelStore();
    }
} 

export default new RootStore();