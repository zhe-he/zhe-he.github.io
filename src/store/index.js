import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
    state: {
        loadStatus: 0,
        toast: {
            msg: "",
            timer: null,
            status: 0
        }
    },
    getters,
    actions,
    mutations,
    strict: debug
})


if(module.hot){
    module.hot.accept([
        './getters',
        './actions',
        './mutations'
    ], () => {
        store.hotUpdate({
            getters: require('./getters').default,
            actions: require('./actions').default,
            mutations: require('./mutations').default
        });
    });
}

export default store;