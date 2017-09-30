import Router from 'vue-router';
import index from './views/';

const about = r => require(['./views/about'], r);
const pageNew = r => require(['./views/new'], r);
const newlist = r => require(['./views/newlist'], r);
const share = r => require(['./views/share'], r);

// const topic = r => require.ensure([], () => r(require('./views/topic/index.vue')), 'group-topic');

const routes = [{
    path: '/',
    redirect: '/index'
},{
    path: '/index',
    component: index,
    meta: {
        keepAlive: true
    }
},{
    path: '/about',
    component: about,
    meta: {
        keepAlive: true
    }
},{
    path: '/newlist',
    component: newlist,
    meta: {
        keepAlive: true
    }
},{
    path: '/new',
    component: pageNew,
    meta: {
        keepAlive: true
    }
},{
    path: '/share',
    component: share,
    meta: {
        keepAlive: true
    }
}];


export default new Router({
    // mode: 'history',
    routes
});