import Vue from 'vue';
import router from './routes';
import store from './store/index';
import { Form } from 'vform';
import Swal from 'sweetalert2';
require('./bootstrap');

/* Components */
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from 'vform/src/components/bootstrap4';
import App from './components/App';

Vue.component(Button.name, Button)
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)


import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://inventory.test/'

window.Form = Form;
window.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

window.Toast = Toast;


store.dispatch('getUser').then(() => {
    const app = new Vue({
        el: '#app',
        components: {
            App
        },
        router,
        store
    });
});