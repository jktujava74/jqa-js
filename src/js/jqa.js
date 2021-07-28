import Vue from 'vue'
import routers from './rout'
import store from './store'
import Category from "./components/Category";

const v = new Vue({
    el: '#container',
    router: routers,
    store: store,
    components: {
        'categories': Category
    }
}).$mount('#container')