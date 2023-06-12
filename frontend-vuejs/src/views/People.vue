<template>
    <div class="columns is-centered">
        <div class="card-content">
            <div class="title ml-5">All Members</div>
            <ul class="columns">
                <li v-for="(item, index) in userData" :key="index" class="column ml-5 mr-5">
                    <div class="card pr-5 pl-5 pb-4 pt-4">
                        <img src="https://img.freepik.com/free-icon/user_318-159711.jpg">
                        <div class="mt-4">{{ item.email }}</div>

                        <div class="field is-grouped">
                            <div class="mr-2">{{ item.firstname }}</div>
                            <div>{{ item.lastname }}</div>
                        </div>
                    </div>
                    <!-- <div v-if="index "></div> -->
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
const URL = "http://localhost:8092/";

export default {
    name: 'CrudBulmaPeople',

    data() {
        return {
            userData:[],
        };
    },

    mounted() {
        axios.get(URL + 'showAll').then((res) => {
            localStorage.setItem("all_User", JSON.stringify(res.data));
            this.userData = JSON.parse(localStorage.getItem("all_User")).result;
        })
    },

};
</script>

<style scoped>
@import '~bulma/css/bulma.min.css';
img{
    width: 100px;
    margin-left: auto;
    margin-right: auto;
    display: block;
}
.card{
    border-radius: 30px;
    box-shadow: 2px 3px 6px 0 rgba(0, 0, 0, 0.3);
}
</style>