import Vue from 'vue'
import routers from './rout'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Category from "./components/Category";

Vue.use(VueAxios, axios)

const v = new Vue({
    el: '#container',
    router: routers,
    store: store,
    components: {
        'categories': Category
    }
}).$mount('#container')