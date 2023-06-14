<template>
    <div class=" columns is-centered">
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="onSubmit">
                    <div class="title has-text-centered">Find the Email</div>
                    <div class="field">
                        <label for="">Email</label>
                        <input type="text" class="input mb-3" placeholder="Enter Email" v-model="email">
                        <button type="submit" class="button is-fullwidth is-success">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
        <a href="http://localhost:8080/resetPassword/id">click</a>
    </div>
</template>

<script>
import axios from 'axios';
const URL = "http://localhost:8092/";

export default {
    name: 'UploadSendEmail',

    data() {
        return {
            email: "",
            user: [],
            id: "svnsdvonsdoivnoisdnvi"
        };
    },
    computed:{
        haveUser(){
            this.user = JSON.parse(localStorage.getItem("user_Login"));
            return this.user;
        }
    },
    mounted() {
        if(this.haveUser){
            this.$router.push("/")
        }
    },

    methods: {
        onSubmit(){
            axios.post(URL + 'findEmail', { email: this.email }).then((res) => {
                localStorage.setItem("reset_password", JSON.stringify(res.data));
                
                this.$swal.fire({
                    icon: 'success',
                    title: 'ส่งลิ้งค์ไปยังอีเมลคุณเรียบร้อยแล้ว',
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