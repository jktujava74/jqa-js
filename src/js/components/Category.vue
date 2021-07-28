<template>
    <div v-for="cat in categories">
        <span><router-link to="/questions">{{cat}}</router-link></span><br/>
<!--        html.append("<a href=\"html?cat="+cat+"\" style=\"color:#999933\" >"+cat+"</a>,"+setTab(1));-->
    </div>
</template>

<script>
    export default {
        name: "Category",
        data() {
            return {
                categories: []
            }
        },
        created() {
            this.loadCategories()
        },
        methods: {
            loadCategories: function () {
                axios
                    .get(this.$store.state.API + '/categories')
                    .then(response => {
                        this.categories = response.data;
                    });
            },
        }
    }
</script>

<style scoped>

</style>