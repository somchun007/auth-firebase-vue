<template>
    <div class="field is-grouped">
        <div class="card-content mr-6">
            <div class="field is-grouped">
                <div class="title is-grouped">All Members</div>
                <strong class="ml-3 mt-3">check by.admin</strong>
            </div>
            
            <table class="table" >
                <!-- <thead class="has-text-link"> -->
                <tr>
                    <th style="width: 50px;" class="has-text-link">No.</th>
                    <th style="width: 160px;">Name</th>
                    <th style="width: 170px;">Email</th>
                    <th style="width: 60px;">Edit</th>
                    <th style="width: 40px;">Delete</th>
                </tr>
                <!-- </thead> -->
                <!-- <tbody> -->
                <tr v-for="(item, index) in userData" :key="index">
                    <th class="mt-4">{{ index+1 }}</th>
                    <td class="mt-4">{{ item.firstname }}  {{ item.lastname }}</td>
                    <td class="mt-4">{{ item.email }}</td>
                    <td>
                        <button class="button is-warning ml-2" @click.prevent="onEdit(item, indexData[index])">&check;</button>
                    </td>
                    <td>
                        <button class="button is-danger ml-2" @click.prevent="onDelete(item, indexData[index])">&cross;</button>
                    </td>
                </tr>
                <!-- </tbody>     -->
            </table>
        </div>

        <div class="" v-if="unlock" style="width: 380px;"> 
                <div class="card mt-4">
                    <div class="card-content" style="background-color: rgb(253, 233, 233);">
                        <form @submit.prevent="onChange">
                            <strong class="columns is-centered mb-5">Account Setting</strong>
                            <div class="columns mb-3 ">
                                <strong class="column">Username : </strong>
                                <input type="text" class="column input mr-3" v-model="user.username">
                            </div>
                            <div class="columns mb-3">
                                <strong class="column">Email : </strong>
                                <input type="text" class="column input mr-3" v-model="user.email">
                            </div>
                            <div class="columns mb-3">
                                <strong class="column">Password : </strong>
                                <input type="text" class="column input mr-3" v-model="user.password">
                            </div>
                            <div class="columns mb-3">
                                <strong class="column">First Name : </strong>
                                <input type="text" class="column input mr-3" v-model="user.firstname">
                            </div>
                            <div class="columns mb-3">
                                <strong class="column">Last Name : </strong>
                                <input type="text" class="column input mr-3" v-model="user.lastname">
                            </div>
                            <button type="submit" class="button is-fullwidth is-success">Save</button>
                        </form>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
const URL = "http://localhost:8092/";

export default {
    name: 'CrudBulmaRecheck',

    data() {
        return {
            userData: [],
            indexData: [],
            user: [],
            unlock: false,
        };
    },
    // created:{
    //     refresh(){
    //         localStorage.removeItem("user_select")
    //     }
    // },
    computed:{

    },
    mounted() {
        axios.get(URL + 'showAll').then((res) => {
            localStorage.setItem("all_User", JSON.stringify(res.data));
            this.userData = JSON.parse(localStorage.getItem("all_User")).result;
            this.indexData = JSON.parse(localStorage.getItem("all_User")).index;
        })  
    },

    methods: {
        onEdit(user, id){
            this.unlock = true;
            const result = {
                username: user.username,
                email: user.email,
                password: user.password,
                firstname: user.firstname,
                lastname: user.lastname,
                doc_id: id,
            }
            localStorage.setItem("user_select", JSON.stringify(result));
            this.user = JSON.parse(localStorage.getItem("user_select"));
        },
        onChange(){
            axios.post(URL + "update", this.user).then((res) =>{
                this.unlock = false;
                localStorage.removeItem("user_select");

                this.$router.go(0);
            })
            
        },
        onDelete(user, id){
            const result = {
                username: user.username,
                email: user.email,
                password: user.password,
                firstname: user.firstname,
                lastname: user.lastname,
                doc_id: id,
            }
            localStorage.setItem("user_select", JSON.stringify(result));
            this.user = JSON.parse(localStorage.getItem("user_select"));
            
            axios.post(URL + "delete", this.user).then((res) =>{
                localStorage.removeItem("user_select");
                this.$router.go(0);
            })
        }
    }
}
</script>

<style scoped>
@import '~bulma/css/bulma.min.css';

</style>