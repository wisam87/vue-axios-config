import { ApiService } from './api.service';
import router from '@/router'


export default class UserService extends ApiService {

  constructor() {
    super();
  }

  login(form: Record<string, any>): any {
    return super.postData('login', form).then((response) => {

      const user = response.data.data.user;
      
      // Set Token
      localStorage.setItem("token", user.token);

      // Set User
      localStorage.setItem("user", JSON.stringify(user));

      console.log('Login Success');


    }).catch((error) => {
      console.log('Login Error');
      throw error;
    })
  }

  logout(): Promise<any> {
    return super.postData('logout').then((response) => {

      const user = response.data.data.user;
      
      // Remove Token
      localStorage.removeItem("token");


      // Remove User
      localStorage.removeItem("user");

      // this.$router.go('/');

    }).catch((error) => {
      console.log('Logout Error');
      throw error;
    })
  }

  register(form: Record<string, any>): Promise<any> {
    return super.postData('register', form);
  }

  verifyEmail(form: Record<string, any>): Promise<any> {
    return super.postData('verify-email', form);
  }

  resetPassword(form: Record<string, any>): Promise<any> {
    return super.postData('reset', form);
  }

  forgotPassword(form: Record<string, any>): Promise<any> {
    return super.postData('forgot-password', form);
  }


}