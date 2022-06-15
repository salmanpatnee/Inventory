import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';

Vue.use(VueRouter);

const Routes = new VueRouter({
    routes: [
        { path: '/', component: Login, name: 'home' },
        { path: '/login', component: Login, name: 'login', alias: '/' },
        { path: '/register', component: Register, name: 'register' },
        { path: '/dashboard', component: Dashboard, name: 'dashboard' },
    ],
    mode: 'history'
});


export default Routes;