<template>
    <div class="columns is-centered">
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="onSignup">
                    <div class="title has-text-centered">Register Form</div>
                    <div class="field">
                        <input type="text" class="input mb-3" placeholder="Username" v-model="user.username">
                        <input type="password" class="input mb-3" placeholder="Password" v-model="user.password">
                        <input type="text" class="input mb-3" placeholder="Email" v-model="user.email">
                        <div class="field is-grouped">
                            <input class="input" type="text" placeholder="First name" v-model="user.firstname"> 
                            <input class="input" type="text" placeholder="Last Name" v-model="user.lastname">
                        </div>
                        <button type="submit" class="button is-fullwidth is-success">Sign Up</button>
                    </div>
            </form>
            </div>
        </div>                 
    </div>
</template>

<script>
import axios from 'axios';
const URL = "http://localhost:48092/";

export default {
    name: 'CrudBulmaRegister',
    data(){
        return{
            show:[],
            user: {
                username: '',
                password: '',
                email: '',
                firstname: '',
                lastname: '',
            }
        }
    },

    methods:{
        onSignup(){
            axios.post(URL + "signup", this.user).then((res) => {
                this.$swal.fire({
                    icon: 'success',
                    title: 'สมัครสมาชิกสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$router.push("/login");
            })
            .catch((error) => {
                this.$swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                })
            })
        }
    }
}

</script>

<style>
@import '~bulma/css/bulma.min.css';

.card {
    width: 400px;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.4);
}

</style>