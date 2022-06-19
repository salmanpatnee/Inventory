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
        { path: '/dashboard', component: Dashboard, name: 'dashboard', meta: { requiresAuth: true } },

        //Users
        { path: '/users', component: Users, name: 'users.index', meta: { requiresAuth: true, authorize: ['view-users'] } },
        { path: '/users/create', component: User, name: 'users.create', meta: { requiresAuth: true, authorize: ['create-users'] } },
        { path: '/users/edit/:id', component: User, name: 'users.edit', meta: { requiresAuth: true, authorize: ['update-users']} },
    ],
    mode: 'history'
});

Routes.beforeEach((to, from, next) => {
    const {requiresAuth, authorize} = to.meta;
    const {permissions} = store.getters.user.data;

    if(requiresAuth){
        if (store.getters.authenticated) {
            next();
        } else {
            next({ name: 'login' });
        }
    } 

    if(authorize){
        if(!authorize.some(permission => permissions.includes(permission))){
            next({ name: 'login' });
        }
    } else {
        next();
    }

    next();
});


export default Routes;