<template>
    <div class=" columns is-centered">
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="onSignin">
                    <div class="title has-text-centered">{{ $t("headform.login") }}</div>
                    <div class="field">
                        <label for="">{{ $t("textform.email") }}</label>
                        <input type="text" class="input mb-3" placeholder="Enter Email" v-model="user.email">
                        <label for="">{{ $t("textform.password") }}</label>
                        <input type="password" class="input" placeholder="Enter Password" v-model="user.password">
                        <a href="/sendEmail" >
                            <small class="ml-2">{{ $t("textform.forgot") }}</small>
                        </a>
                        <button type="submit" class="button is-fullwidth is-success mt-3">{{ $t("button.login") }}</button>
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
            show: "",
        };
    },
    computed:{
        
    },
    mounted() {
        this.haveUser();
    },

    methods: {
        haveUser(){
            this.show = JSON.parse(localStorage.getItem("user_Login"))
        },
        onSignin(){
            if(this.$i18n.locale == 'th'){
                axios.post(URL + "signin", this.user).then((res) =>{
                    localStorage.setItem("user_Login", JSON.stringify(res.data));
                    this.haveUser();

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
                })
            }
            else{
                axios.post(URL + "signin", this.user).then((res) =>{
                    localStorage.setItem("user_Login", JSON.stringify(res.data));
                    this.haveUser();

                    this.$swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: this.show.username + '  Welcome.',
                    })
                    
                    this.$router.push("/");
                    this.$router.go(0);  //refresh page
                })
                .catch((error) => {
                    this.$swal.fire({
                        icon: 'error',
                        title: error.response.data.message,
                    })
                })
            }
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