<template>
    <div v-for="question in questions">
        {{question.id}}:<br/>
        {{question.text}}<br/>
<!--        <textarea rows="5" cols="30" name="result_"+q.getId()+"" id="result_"+q.getId()+""></textarea>-->
<!--        <select class="select" id="sel_"+q.getId()+"">-->
<!--            <option value="true">true</option>-->
<!--            <option value="false">false</option>-->
<!--            <option value="not compile">not compile</option>-->
<!--            <option value="exception">exception</option>-->
<!--        </select>-->
<!--        <input type="button" value="quick" class="choise"  id="choise_"+q.getId()+"" />-->
        <input type='text' v-model="question.answer" /><br/>
    </div>
    <input type='button' @click="answer()" value="Ответить"/>
</template>

<script>
    export default {
        name: "Question",
        data() {
            return {
                questions: [],
                result: [],
            }
        },
        methods: {
            loadQuestions: function (category_id) {
                axios
                    .get(this.$store.state.API + '/questions/' + category_id)
                    .then(response => {
                        this.questions = response.data;
                    });
            },
            answer: function () {
                for (question of questions) {
                    result.id = question.id;
                    result.answer = question.answer;
                }

                axios
                    .post(this.$store.state.API + '/result/', this.result)
                    .then(response => {
                        this.questions = response.data;
                    });
            },
        }
    }
</script>

<style scoped>

</style>