<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" >
            <router-link to="/" >HOME</router-link>
          </a>
              
          <div class="navbar-item has-dropdown is-hoverable" v-if="haveUser">
            <a class="navbar-link">Function +</a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                <router-link to="/todolist">Todo List</router-link>
              </a>
              <a class="navbar-item">
                <router-link to="/people">People</router-link>
              </a>
              <a class="navbar-item">
                <router-link to="/product">Products</router-link>
              </a>
            </div>
          </div>

        </div>

        <div class="navbar-end" v-if="haveUser">
          <div class="navbar-item has-dropdown is-hoverable" >
            <a class="navbar-link">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png" alt="">
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                <router-link to="/detail">My Profile</router-link>
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item" style="color: red;" @click="onLogout">
                Log-Out
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end" v-if="!haveUser">
          <div class="navbar-item">
            <router-link to="/register" >Sign Up</router-link>
          </div>
          <div class="navbar-item">
            <router-link to="/login" >Log In</router-link>
          </div>
        </div>
      </div>
    </nav>
    
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data(){
    return{
      user:[],
      // refreshKey: 0,
    }
  },
  computed:{
    haveUser(){
      // this.$router.go(0);
      return JSON.parse(localStorage.getItem("user_Login"));
    },
    
  },
  mounted(){
    if(!this.haveUser){
      this.$router.push("/login");
    }
  },
  methods: {
    onLogout(){
      this.$swal.fire({
        icon: 'warning',
        title: 'คุณต้องการออกจากระบบหรือไม่',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      })
      .then((result) => {
        if(result.isConfirmed){
          localStorage.clear();
          
          // this.$router.push("/login")
            this.$router.go(0)
          
          
          // window.setTimeout(this.$router.go(0), 5000)
        }
      })
            
    },
    // forceRerender() {
    //    this.refreshKey += 1;  
    //  }
    
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  text-align: right;
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>