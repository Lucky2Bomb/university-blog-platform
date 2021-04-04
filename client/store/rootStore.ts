import AuthStore from './AuthStore';
import MyProfileStore from './MyProfileStore';
import NewsStore from './NewsStore';
import UniversityStore from './UniversityStore';
import ControlPanelStore from './ControlPanelStore';
import GuestStore from './GuestStore';
import ReportStore from './ReportStore';

class RootStore {
    authStore: AuthStore;
    myProfile: MyProfileStore;
    newsStore: NewsStore;
    universityStore: UniversityStore;
    controlPanelStore: ControlPanelStore;
    guestStore: GuestStore;
    reportStore: ReportStore;

    constructor() {
        this.authStore = new AuthStore();
        this.myProfile = new MyProfileStore();
        this.newsStore = new NewsStore();
        this.universityStore = new UniversityStore();
        this.controlPanelStore = new ControlPanelStore();
        this.guestStore = new GuestStore();
        this.reportStore = new ReportStore();
    }
} 

export default new RootStore();