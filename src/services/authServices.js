import appAxios from "@/utils/appAxios.js"

class AuthService {
    login(user){
        return appAxios.post('/user/login',user).then((response) => {
            if(response.data.access_token){
                localStorage.setItem("user",JSON.stringify(response.data.access_token))
            }
            return response.data
        })
    };

    logout() {
        localStorage.removeItem('user');
      }
}

export default new AuthService()