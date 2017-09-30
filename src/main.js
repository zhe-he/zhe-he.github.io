import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App';
import nav from './modules/nav';
import aside from './modules/aside';
import article from './modules/article';
import introduce from './modules/introduce';
import page from './modules/page';
import copyright from './modules/copyright';

Vue.component('common-aside',aside);
Vue.component('common-nav',nav);
Vue.component('common-article',article);
Vue.component('common-introduce',introduce);
Vue.component('common-page',page);
Vue.component('copyright',copyright);


new Vue({
    el: "#app",
    router,
    store,
    render: h=>h(App)
})

