<template>
    <div class="columns">
        <div class="card-content">
            
            <div class="title ml-6">Products Available Now</div>
                
            

            <div class="column">
                <!-- {{ isAdmin.role }} -->
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'CrudBulmaProduct',
    data() {
        return {
            
        };
    },
    computed:{
        haveUser(){
            return JSON.parse(localStorage.getItem("user_Login"));
            
        },
        isAdmin(){
            if(!this.haveUser){
                this.$router.push("/login");
            }
            else{
                if(this.haveUser.role != 'admin'){
                    this.$router.push("/");
                }
            }
        }
    },

    mounted() {
        
        this.isAdmin;
        
    },
    methods: {
        
    },
};
</script>

<style scoped>
@import '~bulma/css/bulma.min.css';

</style>