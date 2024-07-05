// src/store/index.js
import { createStore } from 'vuex'
export default createStore({
    state: {
        isLoggedIn: false,
        accountInfo: null,
    },
    mutations: {
        login(state, accountInfo) {
            state.isLoggedIn = true;
            state.accountInfo = accountInfo;
            sessionStorage.setItem('store', JSON.stringify(state));
        },
        logout(state) {
            state.isLoggedIn = false
            state.accountInfo = null
            sessionStorage.clear();
        },
        updateAccountimage(state,imageUrl){
            state.accountInfo.data.image = imageUrl;
            sessionStorage.setItem('store', JSON.stringify(state));
        }
    }
})