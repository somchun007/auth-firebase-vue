<template>
    <div class="app">
        <div class="title has-text-centered">
            {{ $t("title.wikipedia") }}
        </div>
        <div>
            <div class="field is-grouped">
                <input type="text" placeholder="Key Search" class="input is-info" v-model="keyword" @keyup.esc="reset" @keyup.enter="submitSearch">
                <button class="button is-info ml-2" @click.prevent="submitSearch">find</button>
            </div>

            <div class="columns ml-2">
                <div class="card-content">
                    <ul class="columns is-multiline">
                        <li v-for="(item, index) in result" :key="index" class="column is-quarter">
                            <div class="card pr-3 pl-3 pb-3 pt-3">
                                <a :href = "'http://en.wikipedia.org/?curid=' + item.pageid" target="blank" class="has-text-black">
                                    <div class="header">
                                        <h2>{{ item.title }}</h2>
                                    </div>

                                    <div class="detail">
                                        <p>{{ item.extract }}</p>
                                    </div>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AuthCrudVuejsWikipedia',

    data() {
        return {
            keyword: '',
            result: null,
            limit: '20',
        };
    },

    methods: {
        reset(){
            this.keyword = '';
            this.result = null;
        },
        submitSearch(){
            axios.get('https://en.wikipedia.org/w/api.php?action=query&generator=search&origin=*&gsrnamespace=0&exsentences=1&exintro&explaintext&exlimit=max&prop=extracts&gsrlimit=' + this.limit + '&gsrsearch=' + this.keyword + '&format=json')
            .then((res) => {
                this.result = res.data.query.pages;  
            })
            .catch((err) => {
                this.$swal.fire({
                        icon: 'error',
                        title: 'Key word not found !',
                        showConfirmButton: false,
                        timer: 1500
                    }),
                    this.keyword = '';
            })
        }
    },
};
</script>

<style scoped>
@import '~bulma/css/bulma.min.css';

.title{
    padding: 20px;
    margin: 0 auto;
}
.field{
    margin-left: 20vw;
    margin-right: 20vw;
}
.card{
    border: 2px solid black;
    border-radius: 10px;
    box-shadow: 2px 3px 6px 0 rgba(0, 0, 0, 0.3);
    width: 300px;
    height: 320px;
}
.card:hover{
    transform: scale(1.01);
    background-color: #eeefcd;
}
.header{
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 5px;
    color: darkblue;
}
.detail{
    text-overflow: ellipsis;
    display: block;
    white-space: normal;
    overflow: hidden;
    max-width: 100%;
    max-height: 240px;
}
</style>