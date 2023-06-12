<template>
    <div class="columns is-centered">
        <div class="card-content">
        <div class="title has-text-centered mt-4">Stock for Admin's users</div>
            <div class="columns mt-5">
                <strong>Images Files :</strong>
                <input type="file" ref="myfile" class="ml-5">
            </div>
            <div class="columns mt-3">
                <strong>Product Detail : </strong>
                <textarea class="ml-2" cols="40" rows="8" placeholder="  Tags" v-model="detail"></textarea>
            </div>
            <div class="columns mt-3">
                <strong>Product Price : </strong>
                <input type="text" class="ml-3" cols="40" rows="8" placeholder="  Bath" v-model="price">
            </div>
            <button class="button is-info" @click="onUpload">Upload</button>
        </div>
    </div>
</template>

<script>
import { storage, database } from "../firebase/storage";
import { getStorage, ref as stRef, uploadBytes, uploadString } from "firebase/storage";   //Storage Web
import { getDatabase, ref as dbRef, push, set } from "firebase/database";  //Realtime Database

export default {
    name: 'CrudBulmaStock',

    data() {
        return {
            detail: '',
            price: ''
        };
    },
    computed:{
        haveUser(){
            return JSON.parse(localStorage.getItem("user_Login"));
        }
    },
    mounted() {
        if(this.haveUser.role != 'admin'){
            this.$router.push("/");
        }
    },

    methods: {
        onUpload(){
            var file = this.$refs.myfile.files[0];
            const storageRef = stRef(storage, 'files/' + file.name);

            const databaseRef = dbRef(database, 'files');

            uploadBytes(storageRef, file).then(() => {
                var newFileRef = push(databaseRef);
                set(newFileRef, {
                    "name": file.name,
                    "price": this.price,
                    "detail": this.detail
                })
                console.log('Uploaded success!');
            });
            this.$router.go(0);
        }
    },
};
</script>

<style scoped>
@import '~bulma/css/bulma.min.css';

</style>