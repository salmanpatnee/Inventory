import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        authenticated: false,
        user: null
    },
    getters: {
        authenticated: state => {
            return state.authenticated;
        },
        user: state => {
            return state.user;
        },
    },
    mutations: {
        setAuthenticated: (state, payload) => {
            state.authenticated = payload;
        },
        setUser: (state, payload) => {
            state.user = payload;
        }
    },
    actions: {
        async login({ dispatch }, payload) {
            try {
                await axios.get('/sanctum/csrf-cookie');

                const response = await axios.post('/api/login', payload);

                if (response.data.status_code != 200) {
                    throw response.message;
                }

                return this.dispatch('getUser');

            } catch (error) {
                throw "Error while login.";
            }
        },
        async getUser({ commit }) {
            const response = await axios.get('/api/user');

            if (response.status == 200) {
                commit('setUser', response.data);
                commit('setAuthenticated', true);
            } else {
                commit('setUser', null);
                commit('setAuthenticated', false);
            }
        },
        async logout({ commit }) {
            await axios.post('/api/logout')
                .then(response => {
                    commit('setUser', null);
                    commit('setAuthenticated', false);
                })
                .catch(error => {
                    commit('setUser', null);
                    commit('setAuthenticated', false);
                })
        }
    }
});


export default store;