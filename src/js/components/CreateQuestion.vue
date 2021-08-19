<template>
    <div>
        <table>
            <tr>
                <td>section = {{section}}</td>
            </tr>
            <tr>
                <td>
                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-model="question.categoryId">
<!--                        <option disabled selected>Category...</option>-->
<!--                        <option value="1">One</option>-->
<!--                        <option value="2">Two</option>-->
<!--                        <option value="3">Three</option>-->
                        <div v-for="cat in categories">
                            <option ::value=cat.id>{{cat.name}}</option>
                        </div>
                    </select>
                </td>
            </tr>
            <tr>
                <td><textarea class="form-control" rows="3" cols="100" v-model="question.question"></textarea></td>
            </tr>
        </table>
        <input type="button" @click='create()' value="создать"/>
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
                    categoryId: ''
                },
            }
        },
        mounted() {
            if (localStorage.section) {
                this.section = localStorage.section;
                this.categories = localStorage.categories;
            }
        },
        methods: {
            create: function () {
                // this.pet.userId = localStorage.userId;
                axios
                    .post(this.$store.state.API + '/qa', this.question)
                    .then(response => {
                    });
            }
        }
    }
</script>

<style scoped>

</style>