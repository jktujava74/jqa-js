import Vue from 'vue'
import Router from 'vue-router'
import Question from "./components/Question";
import Test from "./components/Test";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/questions/:id',
      name: 'questions',
      component: Question
    },
    {
      path: '/test/:id',
      name: 'test',
      component: Test
    }
  ]
})

