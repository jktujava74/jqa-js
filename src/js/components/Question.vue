<template>
    <div class="row">
        <table border="0" width="100%" cellpadding="5">
            <tr v-for="question in questions">
                <span class="number">{{question.id}}:</span><br/>
                <span class="question" v-html="question.question"></span>

                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" :id="question.id" v-model="question.pass">
                    <label class="custom-control-label" :for="question.id">passed</label>
                </div>
                <hr/>
            </tr>
        </table>
        <input v-if="!isAnswered" type='button' @click="updatePassing()" value="Ответить"/>
        <span v-if="isAnswered" class="success">Ответ отправлен</span>
    </div>
</template>

<script>
    export default {
        name: "Question",
        data() {
            return {
                questions: [],
                answer: new Map(),
                isAnswered: false
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
                        this.answer = new Map()
                        this.isAnswered = false
                    });
            },
            updatePassing: function () {
                for (const q of this.questions) {
                    this.answer.set(q.id, q.pass)
                }

                this.axios
                    .post(this.$store.state.API + '/updatePassing/', Object.fromEntries(this.answer))
                    .then(response => {
                        this.isAnswered = true
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