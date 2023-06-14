<template>
    <div class=" columns is-centered">
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="onChange">
                    <div class="title has-text-centered">Reset Password</div>
                    <div class="field">
                        <label for="">Password</label>
                        <input type="password" class="input mb-3" placeholder="Enter Password" v-model="user.password1">
                        <label for="">Confirm Password</label>
                        <input type="password" class="input mb-3" placeholder="Enter Password" v-model="user.password2">
                        <button type="submit" class="button is-fullwidth is-success">Confirm</button>
                    </div>
                </form>
                {{ reset_user }}
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
            reset_user: "",
        };
    },
    computed:{
        
    },
    mounted() {
        this.checkToken();

        
    },

    methods: {
        onChange(){
            if(this.user.password1 != this.user.password2){
                this.$swal.fire({
                    icon: 'error',
                    title: 'รหัสผ่านไม่ตรงกัน',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else{
                axios.post(URL + 'resetPassword', this.user).then(() => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'แก้ไขรหัสผ่านสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push("/");
                })
            }
        },
        checkToken(){
            let id = this.$route.params.id;

            axios.post(URL + 'checkToken/'+ id, this.reset_user).then((res) => {
                console.log("111");
                console.log(res);
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