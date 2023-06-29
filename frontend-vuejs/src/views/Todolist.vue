<template>
    <div class="badass-todo">

        <div class="title has-text-centered">{{ $t("title.todolist") }}</div>
        <form @submit.prevent="onAdd">
            <div class="field is-grouped">
                <p class="control is-expanded">
                    <input class="input" type="text" placeholder="Add something" v-model="message"/>
                </p>
                <p class="control">
                    <button type="submit" class="button is-info" :disabled="!message">{{ $t("button.add") }}</button>
                    <button class="button is-danger ml-2" @click.prevent="onReset">{{ $t("button.reset") }}</button>
                </p>
            </div>
        </form>

        <div class="card" v-for="(todo, index) in todos" :key="index" :class="{ selectDone: todo.done }">
            <div class="card-content">
                <div class="content">
                    <div class="columns is-mobile is-vcentered">
                        <div class="column" :class="{ selectDone: todo.done }">
                            {{ todo.content }}
                        </div>
                        <div class="column is-5 has-text-right">
                            <button class="button" :class="todo.done ? 'is-success' : 'is-light'" @click="onComplete(todo.id)">
                                &check;
                            </button>
                            <button class="button is-danger ml-2" @click="onDelete(todo.id)">
                                &cross;
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { doc, collection, onSnapshot, addDoc, deleteDoc, updateDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/firebase";

import moment from "moment";
import "moment-timezone";
moment.locale('th');

const dbCollection = collection(db, "todos");

export default {
    name: "app",
    data() {
      return {
        message: "",
        todos: [],
        time: "",
    };
    },
    computed:{
        haveUser(){
            return JSON.parse(localStorage.getItem("user_Login"));
        }
    },
    mounted() {
        if(!this.haveUser){
            this.$router.push("/login")
        }

        const q = query(dbCollection, orderBy("time", "desc"));
        onSnapshot(q, (querySnapshot) => {
            const result = [];
            querySnapshot.forEach((doc) => {
                 const todo = {
                    id: doc.id,
                    content: doc.data().content,
                    done: doc.data().done,
                    time: doc.data().time,
                };
                result.push(todo);
            });
            this.todos = result;
        });
        
    },
  
    methods: {
        onAdd() {
            addDoc(dbCollection, {
                content: this.message,
                done: false,
                time: moment().valueOf(),
            });
            this.message = "";
        },
        onDelete(id) {
            // this.todos = this.todos.filter(todo => todo.id !== id)
            // this.todos.splice(index, 1);
            deleteDoc(doc(dbCollection, id));
        },
        onComplete(id) {
            // console.log(id);
            // this.todos[index].done = !this.todos[index].done;
            const index = this.todos.findIndex(todo => todo.id === id);
            updateDoc(doc(dbCollection, id), {
                done: !this.todos[index].done,
            });
        },
        async onReset() {
            
            const q = query(dbCollection, where("done", "==", false));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref)
            });
        }
    },
};
</script>
  
<style scoped>
@import "~bulma/css/bulma.min.css";
.badass-todo {
    padding: 40px;
    margin: 0 auto;
}
.line-through {
    text-decoration: line-through;
}
.card{
    border-radius: 10px;
    box-shadow: 2px 3px 6px 0 rgba(0, 0, 0, 0.3);
}
.selectDone{
    background-color: lightgoldenrodyellow;
    text-decoration: line-through ;
    color: rgb(4, 136, 4);
    /* 'has-text-success line-through' */
}
</style>
