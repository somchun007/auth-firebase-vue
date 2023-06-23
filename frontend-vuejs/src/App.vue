<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" >
            <router-link to="/" >{{ $t("navbar.home") }}</router-link>
          </a>
              
          <div class="navbar-item has-dropdown is-hoverable" v-if="isLogin">
            <a class="navbar-link">{{ $t("navbar.function") }}</a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                <router-link to="/todolist">{{ $t("navbar.todolist") }}</router-link>
              </a>
              <a class="navbar-item">
                <router-link to="/member">{{ $t("navbar.member") }}</router-link>
              </a>
              <a class="navbar-item">
                <router-link to="/product">{{ $t("navbar.product") }}</router-link>
              </a>
            </div>
          </div>

        </div>

        

        <div class="navbar-end" v-if="isLogin">
          

          <div class="navbar-item has-dropdown is-hoverable" >
            <div class="navbar-item">
              {{ user.email }}
            </div>
            <a class="navbar-link">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png" alt="">
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                <router-link to="/detail">{{ $t("navbar.profile") }}</router-link>
              </a>

              <hr class="navbar-divider">
              <button class=" button is-fullwidth is-danger"  @click="onLogout()">{{ $t("navbar.logout") }}</button>
            </div>
          </div>
        </div>

        <div class="navbar-end" v-if="!isLogin">
          <div class="field is-grouped">
            <a class="navbar-item">
            <router-link to="/register" >{{ $t("navbar.signup") }}</router-link>
          </a>
          <a class="navbar-item">
            <router-link to="/login" >{{ $t("navbar.login") }}</router-link>
          </a>
          </div>
          
        </div>
      </div>
    </nav>

    <div class="row">
      <div class="col">
        <button @click="switchLocale1()" class="switch" :class="{ completed: checkLang1 }">{{ Locale1 }}</button>
      </div>
      <div class="col">
        <button @click="switchLocale2()" class="switch" :class="{ completed: checkLang2 }">{{ Locale2 }}</button>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data(){
    return{
      user: null,
      Locale1: "ENG",
      Locale2: "THA",
      isLogin: false,
      checkLang1: true,
      checkLang2: false,
    }
  },
  computed:{
    // haveUser(){
    //   this.user = JSON.parse(localStorage.getItem("user_Login"));
    //   return this.user;
    // },
    
  },
  mounted(){
    this.haveUser();
  },
  methods: {
    haveUser(){
      this.user = JSON.parse(localStorage.getItem("user_Login"));
      if(this.user){
        this.isLogin = true;
      }
      else{
        this.isLogin = false;
      }
    },

    onLogout(){
      if(this.$i18n.locale == 'th'){
        this.$swal.fire({
          icon: 'warning',
          title: 'คุณต้องการออกจากระบบหรือไม่',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก'
        }).then((result) => {
          if(result.isConfirmed){
            localStorage.clear();
            this.user = null;
            this.haveUser();
            this.$router.push("/login")
          }
        })
      }
      else{
        this.$swal.fire({
          icon: 'warning',
          title: 'Do you want to log out ?',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if(result.isConfirmed){
            localStorage.clear();
            this.user = null;
            this.haveUser();
            this.$router.push("/login")
          }
        })
      }       
    },
    
    changeSwitch(){
      this.checkLang1 = !this.checkLang1;
      this.checkLang2 = !this.checkLang2;
    },
    switchLocale1(){
      this.$i18n.locale = 'en'
      if(this.checkLang1 == false){
        this.changeSwitch();
      }
    },
    switchLocale2(){
      this.$i18n.locale = 'th'
      if(this.checkLang2 == false){
        this.changeSwitch();
      }
    }
  },
}
</script>

<style scoped>
@import '~bulma/css/bulma.min.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* nav {
  padding: 10px;
} */

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.row{
  display: inline-flex;
  margin-left: 70vw;
  position: absolute;
  top: 15px;
}
.col .switch{
  font-size: small;
  /* text-decoration: underline; */
  border: none;
  position: relative;
  z-index: 100;
}
.col .switch:hover{
  background-color: #8cefc2;
}
.completed{
  background-color: #8cefc2;
  font-weight: bold;
}
</style>