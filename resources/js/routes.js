import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Users from './components/Users/index';
import User from './components/Users/create';

Vue.use(VueRouter);

const Routes = new VueRouter({
    routes: [
        { path: '/', component: Login, name: 'app' },
        { path: '/login', component: Login, name: 'login', alias: '/' },
        { path: '/register', component: Register, name: 'register' },
        { path: '/dashboard', component: Dashboard, name: 'dashboard', meta: { requiredAuth: true } },

        //Users
        { path: '/users', component: Users, name: 'users.index', meta: { requiredAuth: true } },
        { path: '/users/create', component: User, name: 'users.create', meta: { requiredAuth: true } },
        { path: '/users/edit/:id', component: User, name: 'users.edit', meta: { requiredAuth: true } },
    ],
    mode: 'history'
});

Routes.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiredAuth)) {
        if (!store.getters.authenticated) {
            next({ name: 'login' })
        } else {
            next();
        }
    }
    next();
});


export default Routes;