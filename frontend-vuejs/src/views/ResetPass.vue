<template>
    <div class=" columns is-centered">
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="onChange">
                    <div class="title has-text-centered">Reset Password</div>
                    <div class="field">
                        <label for="">Password</label>
                        <input type="text" class="input mb-3" placeholder="Enter Password" v-model="user.password1">
                        <label for="">Confirm Password</label>
                        <input type="password" class="input mb-3" placeholder="Enter Password" v-model="user.password2">
                        <button type="submit" class="button is-fullwidth is-success">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
const URL = "http://localhost:8092/";

export default {
    name: 'UploadResetPass',

    data() {
        return {
            user:{
                password1: "",
                password2: ""
            },
        };
    },

    computed:{
        haveUser(){
            return JSON.parse(localStorage.getItem("user_Login"));
        }
    },

    mounted() {
        if(!this.haveUser){
            
        }
    },

    methods: {
        
    },
};
</script>

<style scoped>
@import '~bulma/css/bulma.min.css';
.card {
    width: 400px;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.4);
}
</style>