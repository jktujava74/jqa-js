<template>
    <div class="row">
        <div v-for="section in sections">
            <span @click="showCategories(section)" class="section">{{section.name}}</span>&emsp;

        </div>
        <ul class="nav nav-tabs span2 row">
            <li v-for="cat in categories">
                <router-link to="/questions">{{cat.name}}</router-link>
            </li>
            <br/>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Category",
        data() {
            return {
                categories: [],
                sections: []
            }
        },
        created() {
            this.loadCategories()
        },
        methods: {
            loadCategories: function () {
                this.axios
                    .get(this.$store.state.API + '/categories')
                    .then(response => {
                        this.sections = response.data;
                    });
            },
            showCategories: function (section) {
                this.categories = section.categories
            },
        }
    }
</script>

<style scoped>
    .section{
        cursor: pointer;
    }
</style>