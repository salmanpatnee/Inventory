import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

Vue.use(VueRouter);

const Routes = new VueRouter({
    routes: [
        { path: '/', component: Login, name: 'home' },
        { path: '/login', component: Login, name: 'login', alias: '/' },
        { path: '/register', component: Register, name: 'register' },
    ],
    mode: 'history'
});


export default Routes;