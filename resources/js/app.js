import Vue from 'vue';
import router from './routes';

require('./bootstrap');

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://inventory.test/'

const app = new Vue({
    el: '#app',
    router
});
