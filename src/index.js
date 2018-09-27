import FastClick from 'fastclick'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import App from '@/app'
import Nav from '@/components/nav/nav'
import Aside from '@/components/aside/aside'
import Article from '@/components/article/article'
import Introduce from '@/components/introduce/introduce'
import Page from '@/components/page/page'
import Copyright from '@/components/copyright/copyright'

import '@/common/styles/reset.scss'
import '@/common/styles/app.scss'
import '@/common/styles/media.scss'
import 'gitment/style/default.css'

Vue.component('common-aside', Aside);
Vue.component('common-nav', Nav);
Vue.component('common-article', Article);
Vue.component('common-introduce', Introduce);
Vue.component('common-page', Page);
Vue.component('copyright', Copyright);

FastClick.attach(document.body);
new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
})

