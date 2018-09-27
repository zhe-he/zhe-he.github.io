import Vue from 'vue'
import Router from 'vue-router'
import Index from './views'

const views = name => () => import('@/views/' + name);
Vue.use(Router);

const routes = [{
    path: '/',
    redirect: '/index'
}, {
    path: '/index',
    component: Index,
    meta: {
        keepAlive: true
    }
}, {
    path: '/about',
    component: views('about'),
    meta: {
        keepAlive: true
    }
}, {
    path: '/newlist',
    component: views('newlist'),
    meta: {
        keepAlive: true
    }
}, {
    path: '/msgBoard',
    component: views('msg-board'),
    meta: {
        keepAlive: true
    }
}, {
    path: '/newlist/:id?',
    component: views('new'),
    name: 'pageNew',
    meta: {
        keepAlive: false
    }
}, {
    path: '/share',
    component: views('share'),
    meta: {
        keepAlive: true
    }
}];


export default new Router({
    // mode: 'history',
    routes
});