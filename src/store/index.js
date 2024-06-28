// src/store/index.js
import { createStore } from 'vuex'

export default createStore({
    state: {
        isLoggedIn: false,
        accountInfo: null  // Add this line
    },
    mutations: {
        login(state, accountInfo) {  // Modify this line
            state.isLoggedIn = true
            state.accountInfo = accountInfo  // Add this line
        },
        logout(state) {
            state.isLoggedIn = false
            state.accountInfo = null  // Add this line
        }
    }
})