<template>
    <div class="row">
        <div v-for="section in sections">
            <span @click="showCategories(section)" class="section">{{section.name}}</span>&emsp;

        </div>
        <div v-if="!test_mode">
            <span>qa</span>
            <ul>
                <li v-for="cat in categories">
                    <router-link :to="'/questions/' + cat.id">{{cat.name}}</router-link>
                </li>
                <br/>
            </ul>
        </div>
        <div v-if="test_mode">
            <span>test</span>
            <ul>
                <li v-for="cat in categories">
                    <router-link :to="'/test/' + cat.id">{{cat.name}}</router-link>
                </li>
                <br/>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Category",
        data() {
            return {
                categories: [],
                sections: [],
                test_mode: false
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