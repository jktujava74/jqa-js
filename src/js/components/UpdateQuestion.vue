<template>
    <div>
        <table>
            <tr>
                <td>question</td>
                <td><textarea class="form-control" rows="10" cols="100" v-model="question.question"></textarea></td>
            </tr>
        </table>
        <input type="button" @click='update()' value="обновить"/>
    </div>
</template>

<script>
    export default {
        name: "UpdateQuestion",
        data() {
            return {
                question: {},
            }
        },
        created() {
            this.read()
        },
        methods: {
            read: function () {
                this.axios
                    .get(this.$store.state.API + '/qa' + this.$route.params.id)
                    .then(response => {
                        this.question = response.data;
                    });
            },
            update: function () {
                axios
                    .put(this.$store.state.API + '/qa', this.question)
                    .then(response => {

                    });
            }
        }
    }
</script>

<style scoped>

</style>