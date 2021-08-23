<template>
    <div>
        <table>
            <tr>
                <td>section = {{section}}</td>
            </tr>
            <tr>
                <td>
                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-model="question.categoryId">
                        <option v-for="cat in categories" v-bind:value="cat.id">
                            {{ cat.name }}
                        </option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><textarea class="form-control" rows="3" cols="100" v-model="question.question"></textarea></td>
            </tr>
        </table>
        <input type="button" @click='create()' value="создать"/>
        <span v-if="is_inserted">question was added</span>
    </div>
</template>

<script>
    export default {
        name: "CreateQuestion",
        data() {
            return {
                section: '',
                categories: [],
                question: {
                    type: 'QUESTION',
                    categoryId: '',
                    question: '',
                },
                is_inserted: false
            }
        },
        created() {
            if (localStorage.section) {
                this.section = localStorage.section;
                this.categories = JSON.parse(localStorage.categories);
            }
        },
        methods: {
            create: function () {
                // this.pet.userId = localStorage.userId;
                this.axios
                    .post(this.$store.state.API + '/qa', this.question)
                    .then(response => {
                        var question_id = response.data;
                        if(Number.isInteger(question_id)){
                            this.is_inserted = true;
                            this.question.categoryId = '';
                            this.question.question = '';
                        }
                    });
            }
        }
    }
</script>

<style scoped>

</style>