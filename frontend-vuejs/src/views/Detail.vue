<template>
    <div class="container" v-if="haveUser" style="width: 400px;">  
        <div class="card-content mt-4 ">
            <div class="title has-text-centered mb-6">{{ $t("title.profile") }}</div>

            <!-- <div class=" has-text-centered"> -->
                <div class="columns mb-3 ml-7">
                    <strong class="column">{{ $t("user.username") }} : </strong>
                    <!-- <strong class="column" id="showItem">{{ haveUser.username }}</strong> -->
                    <input type="text" class="column input ml-4" v-model="user.username" >
                </div>
                <div class="columns mb-3 ml-7">
                    <strong class="column">{{ $t("user.email") }} : </strong>
                    <!-- <strong class="column" id="showItem">{{ haveUser.email }}</strong> -->
                    <input type="text" class="column input ml-4" v-model="user.email">
                </div>
                <div class="columns mb-3 ml-7">
                    <strong class="column">{{ $t("user.password") }} : </strong>
                    <!-- <strong class="column" id="showItem">*********</strong> -->
                    <input type="password" class="column input ml-4" v-model="user.password">
                </div>
                <div class="columns mb-3 ml-7">
                    <strong class="column">{{ $t("user.firstname") }} : </strong>
                    <!-- <strong class="column" id="showItem">{{ haveUser.firstname }}</strong> -->
                    <input type="text" class="column input ml-4" v-model="user.firstname">
                </div>
                <div class="columns mb-3 ml-7">
                    <strong class="column">{{ $t("user.lastname") }} : </strong>
                    <!-- <strong class="column" id="showItem">{{ haveUser.lastname }}</strong> -->
                    <input type="text" class="column input ml-4" v-model="user.lastname">
                </div>
            <!-- </div> -->

            <div class="navbar-menu">
                <div class="navbar-start">
                    <button class="button is-info" @click.prevent="onUpdate">{{ $t("button.update") }}</button>
                </div>
                <div class="navbar-end">
                    <button class="button is-danger" @click.prevent="onDelete">{{ $t("button.delete") }}</button>
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
            console.log(this.$i18n.locale);
            if(this.$i18n.locale == 'th'){
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
            }
            else{
                this.$swal.fire({
                    title: 'Do you want to delete user data ?',
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'cancel'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        axios.post(URL + "delete", this.user);
                        this.$swal.fire(
                            'Delete Success!',
                            'Your data has been deleted.',
                            'Success.'
                        )
                        localStorage.clear();
                        this.$router.go(0);  //refresh
                    }
                })
            }
            
        },
        onUpdate(){
            // axios.all([
            //     axios.post(URL + 'update', this.newUpdate),
            //     axios.post(URL + 'update', this.user.doc_id),
            // ])
            localStorage.removeItem("user_Login");
            if(this.$i18n.locale == 'th'){
                axios.post(URL + 'update', this.user).then((res) => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'แก้ไขข้อมูลสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    localStorage.setItem("user_Login", JSON.stringify(res.data));
                    this.haveUser;
                })
            }
            else{
                axios.post(URL + 'update', this.user).then((res) => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Edited Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    localStorage.setItem("user_Login", JSON.stringify(res.data));
                    this.haveUser;
                })
            }  
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