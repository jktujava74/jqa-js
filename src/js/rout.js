import Vue from 'vue'
import Router from 'vue-router'
import Question from "./components/Question";
import Test from "./components/Test";
import UpdateQuestion from "./components/UpdateQuestion";
import CreateQuestion from "./components/CreateQuestion";

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
    },
    {
      path: '/qa/:id',
      name: 'updateQuestion',
      component: UpdateQuestion
    },
    {
      path: '/add',
      name: 'createQuestion',
      component: CreateQuestion
    }
  ]
})

