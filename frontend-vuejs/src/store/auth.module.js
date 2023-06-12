import axios from 'axios';
const URL = "http://localhost:8092/";

console.log('111111');

export const auth = {
    actions: {
        register(user){
            return axios.post(URL + "signup",{
                username: user.username,
                password: user.password,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            })
        }
    }
}