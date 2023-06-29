<template>
    <div class="badass-todo" v-if="haveUser">
        <div class="title has-text-centered">{{ $t("title.home") }}</div>
        <div class="field is-grouped ml-6">
            <div v-if="haveUser.role == 'admin'" class="ml-4">
                <a class="button is-warning" href="/stock">Add Product</a>
                <a class="button is-info ml-3" href="/account">Check Users</a>
            </div>
        </div>
        
        <div>
            <button class="button is-danger" @click.prevent="onVerify">token</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
const URL = "http://localhost:48092/";

    export default{
        name: 'home',
        data(){
            return{
                title: 'Welcome Every One',
            }
        },
        computed:{
            haveUser(){
                return JSON.parse(localStorage.getItem("user_Login"));
            },
            isAdmin(){
                if(!this.haveUser){
                    return false;
                }
                else{
                    if(this.haveUser.role != 'admin'){
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            }
        },
        mounted(){
            this.isAdmin;
            
            localStorage.removeItem("user_select");
            localStorage.removeItem("all_User");
        },
        methods:{
            onVerify(){
                axios.post(URL + 'jai', {data: this.haveUser}).then((res) =>{
                    localStorage.setItem("user_Login", JSON.stringify(res.data.user));
                })
                .catch((error) => {
                    this.$swal.fire({
                        icon: 'error',
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    localStorage.clear();
                    this.$router.push("/login")
                })
            }
        },
    }
</script>
<style>
@import '~bulma/css/bulma.min.css';
</style>