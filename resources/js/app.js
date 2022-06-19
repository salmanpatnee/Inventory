import Vue from 'vue';
import router from './routes';
import store from './store/index';
import { Form } from 'vform';
require('./bootstrap');

/* Helpers */
import Notification from './Helpers/Notification';
window.Notification = Notification;


/* Components */
import { Button, HasError } from 'vform/src/components/bootstrap4';
import App from './components/App';

Vue.component(Button.name, Button)
Vue.component(HasError.name, HasError)


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/'

window.Form = Form;

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