<template>
    <div class=" columns is-centered">
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="onSignin">
                    <div class="title has-text-centered">Log In</div>
                    <div class="field">
                        <label for="">Email</label>
                        <input type="text" class="input mb-3" placeholder="Enter Email" v-model="user.email">
                        <label for="">Password</label>
                        <input type="password" class="input mb-3" placeholder="Enter Password" v-model="user.password">
                        <button type="submit" class="button is-fullwidth is-success">Sign In</button>
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
    name: 'CrudBulmaLogin',

    data() {
        return {
            user:{
                email: "",
                password: ""
            },
            show:[],
        };
    },
    computed:{
        reloadPage(){
            this.$router.go(0);  //refresh page
        },

        logged(){
            // this.show = JSON.parse(localStorage.getItem("user"));
            // return this.show;
            return JSON.parse(localStorage.getItem("user_Login")).result;
        }
    },
    mounted() {
 
    },

    methods: {
        onSignin(){
            axios.post(URL + "signin", this.user).then((res) =>{
                localStorage.setItem("user_Login", JSON.stringify(res.data));
                
                this.$swal.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    icon: 'success',
                    title: this.show.username + '  ยินดีต้อนรับ',
                })
                this.$router.push("/");
                this.$router.go(0);  //refresh page
            })
            .catch((error) => {
                this.$swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                })
                // alert(error.response.data.message);
            })

        }
    },
};
</script>

<style>
@import '~bulma/css/bulma.min.css';
.card {
    width: 400px;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.4);
}
</style>