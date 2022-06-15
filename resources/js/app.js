import Vue from 'vue';
import router from './routes';
import store from './store/index';
import App from './components/App';

require('./bootstrap');

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://inventory.test/'

const app = new Vue({
    el: '#app',
    components: {
        App
    },
    router,
    store
});
