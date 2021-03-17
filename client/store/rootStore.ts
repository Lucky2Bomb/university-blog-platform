import AuthStore from './AuthStore';
import MyProfileStore from './MyProfileStore';
import NewsStore from './NewsStore';

class RootStore {
    authStore: AuthStore;
    myProfile: MyProfileStore;
    newsStore: NewsStore;

    constructor() {
        this.authStore = new AuthStore();
        this.myProfile = new MyProfileStore();
        this.newsStore = new NewsStore();
    }
} 

export default new RootStore();