import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App';
import nav from './modules/nav';

Vue.component('common-nav',nav);


new Vue({
    el: "#app",
    router,
    store,
    render: h=>h(App)
})

