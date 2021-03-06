import Token from './Token';
import AppStorage from './AppStorage';

class User {

    responseAfterLogin(res) {
        const access_token = res.data.access_token;
        const user_name = res.data.name;

        if (Token.isValid(access_token)) {
            AppStorage.store(access_token, user_name);
        }
    }

    hasToken() {
        const storeToken = AppStorage.getToken();
        if (storeToken) {
            return Token.isValid(storeToken) ? true : false;
        }
        return false;
    }

    loggedIn() {
        return this.hasToken();
    }

    logout() {
        AppStorage.clear();
    }

    name() {
        if (this.loggedIn()) {
            return AppStorage.getUser();
        }
    }

    id() {
        if (this.loggedIn()) {
            const payload = Token.payload(AppStorage.getToken());
            return payload.sub;
        }
        return false;
    }

}

export default User = new User();