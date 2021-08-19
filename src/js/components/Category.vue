<template>
    <div class="container">
        <div class="row border">
            <div v-for="section in sections">
                <span @click="showCategories(section)" class="section">{{section.name}}</span>&emsp;
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="row">
                    <input class="form-check-input" type="radio" id="one" value="qa" v-model="mode" checked>
                    <label class="form-check-label" for="one">qa</label>
                </div>
                <div class="row">
                    <input class="form-check-input" type="radio" id="two" value="test" v-model="mode">
                    <label class="form-check-label" for="two">test</label>
                </div>
            </div>
        </div>
        <div v-if="mode == 'qa'">
            <ul>
                <li v-for="cat in categories">
                    <router-link :to="'/questions/' + cat.id">{{cat.name}}</router-link>
                </li>
                <br/>
            </ul>
        </div>
        <div v-if="mode == 'test'">
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
                mode: "qa"
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
                localStorage.section = section;
                localStorage.categories = this.categories;

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