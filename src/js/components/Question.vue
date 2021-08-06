<template>
    <div class="row">
        <table border="0" width="100%" cellpadding="5">
            <tr v-for="question in questions">
                <span class="number">{{question.id}}:</span><br/>
                <span class="question" v-html="question.question"></span>

                <!--        <textarea rows="5" cols="30" name="result_"+q.getId()+"" id="result_"+q.getId()+""></textarea>-->
                <!--                        <select class="select" id="sel_"+q.getId()+"">-->
                <!--                            <option value="true">true</option>-->
                <!--                            <option value="false">false</option>-->
                <!--                            <option value="not compile">not compile</option>-->
                <!--                            <option value="exception">exception</option>-->
                <!--                        </select>-->
                <!--                        <input type="button" value="apply" id="choise_"+q.getId()+"" />-->
                <div v-if="!is_show_result">
                     <input type='text' v-model="question.supposed_answer"/>
                </div>

                <div v-if="is_show_result">
                    <div v-if="!question.pass" class="question answer_wrong" v-html="question.supposed_answer"></div>
                    <div v-if="!question.pass" class="question answer_correct" v-html="question.answer"></div>
                    <div v-if="!question.pass" class="question note" v-html="question.note"></div>
                    <div v-if="question.pass" class="success">sucess</div>
                </div>
                <hr/>
            </tr>
        </table>
        <input v-if="!is_show_result" type='button' @click="loadResult()" value="Ответить"/>
        <span v-if="is_show_result"  class="success">passed = {{result_percent}}</span>
    </div>
</template>

<script>
    export default {
        name: "Question",
        data() {
            return {
                questions: [],
                answer: new Map(),
                is_show_result: false,
                result_percent: 0
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
                        this.is_show_result = false
                        this.answer = new Map()
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

                        const passed_count_2 = Array.from(result.values())

                        const passed_count = Array.from(result.values()).filter(val => val == true).length
                        this.result_percent = result_percent_calc(this.questions.length, passed_count)

                        this.is_show_result = true
                    });
            },
        },
        watch: {
            // при изменениях маршрута запрашиваем данные снова
            $route: 'loadQuestions'
        },
    }

    function result_percent_calc(question_count, passed_count){
        return ((passed_count / question_count) * 100).toFixed(1);
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

    .answer_wrong {
        color: red;
    }

    .answer_correct {
        color: forestgreen;
    }
    .note {
        color: blue;
    }

    .question {
        font-size: 15 px;
        font-family: "Times New Roman";
    }
</style>