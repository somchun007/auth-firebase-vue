<template>
    <div class="badass-todo" v-if="haveUser">
        <div class="title has-text-centered">{{ $t("title.home") }}</div>
        <div class="field is-grouped ml-6">
            <div v-if="this.haveUser.role == 'admin'" class="ml-4">
                <a class="button is-warning" href="/stock">Add Product</a>
                <a class="button is-info ml-3" href="/account">Check Users</a>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default{
        name: 'home',
        data(){
            return{
                title: 'Welcome Every One'
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
            
        },
    }
</script>
<style>
@import '~bulma/css/bulma.min.css';
</style>