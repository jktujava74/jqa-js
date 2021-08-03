<template>
    <div class="row">
        <table border="0" width="100%" cellpadding="5">
            <tr v-for="question in questions">
                <span class="number">{{question.id}}:</span><br/>
                <span class="question" v-html="question.question"></span><br/>

                <!--        <textarea rows="5" cols="30" name="result_"+q.getId()+"" id="result_"+q.getId()+""></textarea>-->
                <!--                        <select class="select" id="sel_"+q.getId()+"">-->
                <!--                            <option value="true">true</option>-->
                <!--                            <option value="false">false</option>-->
                <!--                            <option value="not compile">not compile</option>-->
                <!--                            <option value="exception">exception</option>-->
                <!--                        </select>-->
                <!--                        <input type="button" value="apply" id="choise_"+q.getId()+"" />-->
                <input v-show="!is_show_result" type='text' v-model="question.supposed_answer"/><br/>

                <span v-show="is_show_result && !question.pass" class="question" v-html="question.supposed_answer"></span><br/>
                <span v-show="is_show_result && !question.pass" class="question" v-html="question.answer"></span><br/>

                <span v-show="is_show_result && question.pass" class="success">sucess</span><br/>
                <hr/>
            </tr>
        </table>
        <input type='button' @click="loadResult()" value="Ответить"/>
    </div>
</template>

<script>
    export default {
        name: "Question",
        data() {
            return {
                questions: [],
                answer: new Map(),
                is_show_result: false
            }
        },
        created() {
            this.loadQuestions()
        },
        methods: {
            loadQuestions: function () {
                this.axios
                    .get(this.$store.state.API + '/questions/' + this.$route.params.id)
                    .then(response => {
                        this.questions = response.data;
                    });
            },
            loadResult: function () {
                for (const q of this.questions) {
                    this.answer.set(q.id, q.supposed_answer)
                }

                this.axios
                    .post(this.$store.state.API + '/answer/', Object.fromEntries(this.answer))
                    .then(response => {
                        const result = new Map(Object.entries(response.data))

                        const questionsById = new Map();
                        this.questions.forEach(it => questionsById.set(it.id, it))

                        for(const e of result.entries()){
                            const o = questionsById.get(Number(e[0]));
                            o.pass = e[1]
                        }
                        this.is_show_result = true
                    });
            },
        },
        watch: {
            // при изменениях маршрута запрашиваем данные снова
            $route: 'loadQuestions'
        },
    }
</script>

<style scoped>
    .number {
        color: red;
        font-weight: bold;
    }

    .success {
        color: green;
        font-weight: bold;
    }

    .question {
        font-size: 14px;
        font-family: "Times New Roman";
    }
</style>