<template>
    <div class=" columns is-centered">
        <div class="card" v-if="showForm">
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
                {{ user }}
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
            
            showForm: false,
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
                let id = this.$route.params.id;
                axios.post(URL + 'resetPassword/'+ id, this.user).then((res) => {
                    this.$swal.fire({
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push("/login");
                })
            }
        },
        checkToken(){
            let id = this.$route.params.id;

            console.log(id);
            axios.post(URL + 'checkToken/'+ id, this.reset_user).then((res) => {
                // console.log(res);
                this.showForm = true;
                
            })
            .catch((error) => {
                // console.log(error);
                
                this.$swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: true,
                    // timer: 1500
                }).then((result) => {
                        this.$router.push("/login")
                    
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