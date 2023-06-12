<template>
    <div class="container" v-if="haveUser" style="width: 400px;">  
        <div class="card-content mt-4 ">
            <div class="title has-text-centered mb-6">Profile Setting</div>

            <!-- <div class=" has-text-centered"> -->
                <div class="columns mb-3 ml-7">
                    <strong class="column">Username : </strong>
                    <!-- <strong class="column" id="showItem">{{ haveUser.username }}</strong> -->
                    <input type="text" class="column input ml-4" v-model="user.username" >
                </div>
                <div class="columns mb-3 ml-7">
                    <strong class="column">Email : </strong>
                    <!-- <strong class="column" id="showItem">{{ haveUser.email }}</strong> -->
                    <input type="text" class="column input ml-4" v-model="user.email">
                </div>
                <div class="columns mb-3 ml-7">
                    <strong class="column">Password : </strong>
                    <!-- <strong class="column" id="showItem">*********</strong> -->
                    <input type="password" class="column input ml-4" v-model="user.password">
                </div>
                <div class="columns mb-3 ml-7">
                    <strong class="column">First Name : </strong>
                    <!-- <strong class="column" id="showItem">{{ haveUser.firstname }}</strong> -->
                    <input type="text" class="column input ml-4" v-model="user.firstname">
                </div>
                <div class="columns mb-3 ml-7">
                    <strong class="column">Last Name : </strong>
                    <!-- <strong class="column" id="showItem">{{ haveUser.lastname }}</strong> -->
                    <input type="text" class="column input ml-4" v-model="user.lastname">
                </div>
            <!-- </div> -->

            <div class="navbar-menu">
                <div class="navbar-start">
                    <button class="button is-info" @click.prevent="onUpdate">Update</button>
                </div>
                <div class="navbar-end">
                    <button class="button is-danger" @click.prevent="onDelete">Delete</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
const URL = "http://localhost:8092/";

export default {
    name: 'CrudBulmaDetail',

    data() {
        return {
            user: [],

        };
    },
    computed:{
        haveUser(){
            this.user =  JSON.parse(localStorage.getItem("user_Login"));
            return this.user;
            // return JSON.parse(localStorage.getItem("user"));
        }
    },
    mounted() {
        if(!this.haveUser){
            this.$router.push("/login");
        }
    },
    methods: {
        onDelete(){
            this.$swal.fire({
                title: 'คุณต้องการลบข้อมูลผู้ใช้หรือไม่?',
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(URL + "delete", this.user);
                    this.$swal.fire(
                        'ลบข้อมูลสำเร็จ!',
                        'ข้อมูลของคุณได้ถูกลบแล้ว',
                        'สำเร็จ'
                    )
                    localStorage.clear();
                    // localStorage.removeItem("user_Login");
                    this.$router.go(0);  //refresh
                }
            })
        },
        onUpdate(){
            // axios.all([
            //     axios.post(URL + 'update', this.newUpdate),
            //     axios.post(URL + 'update', this.user.doc_id),
            // ])
            localStorage.removeItem("user_Login");
            axios.post(URL + 'update', this.user).then((res) => {
                
                localStorage.setItem("user_Login", JSON.stringify(res.data));
                this.haveUser;
            })
            
        }
                
    }
    
};
</script>

<style>
@import '~bulma/css/bulma.min.css';
.custom{
    margin-bottom: 10px;
}
#showItem{
    display: flex;
    position: static;
}
</style>