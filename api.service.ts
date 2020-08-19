import { HttpClient } from './httpclient';
import { AxiosRequestConfig } from 'axios';

export class ApiService extends HttpClient {

  public constructor() {
    super('http://127.0.0.1:8000/api/vendor-portal/');
    this._initializeRequestInterceptor();
    this._responseInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _responseInterceptor = () => {
    
    this.instance.interceptors.response.use(response => {
      return response.data;
    }, error => {
        const status = error.response.status;
        switch(status) {
          case 401:
            console.log('Unauthenticated!');
            localStorage.removeItem("token");
            break;
          case 404:
            console.log('Not Found');
            break;
          default:
        }
    });
  }

  private _handleRequest = (config: AxiosRequestConfig) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept'] = 'application/json'
    config.headers['Authorization'] = `Bearer ${localStorage.token}`
    return config;
  };

  // eslint-disable-next-line
  getData(url: string, params?: string): Promise<any> {
    return this.instance({
      method: 'GET',
      url: url,
      params: params
    }).then((response) => {
      return response;
    }).catch((error) => {
      throw error;
    });
  }

  // eslint-disable-next-line
  postData(url: string, data?: any, params?: string): Promise<any> {
    return this.instance({
      method: 'POST',
      url: url,
      data: data,
      params: params
    }).then((response) => {
      return response;
    }).catch((error) => {
      throw error;
    });
  }

  // eslint-disable-next-line
  putData(url: string, data?: any, params?: string): Promise<any> {
    return this.instance({
      method: 'PUT',
      url: url,
      data: data,
      params: params
    }).then((response) => {
      return response;
    }).catch((error) => {
      throw error;
    });
  }

  // eslint-disable-next-line
  deleteData(url: string, data?: any, params?: string): Promise<any> {
    return this.instance({
      method: 'DELETE',
      url: url,
      data: data,
      params: params
    }).then((response) => {
      return response;
    }).catch((error) => {
      throw error;
    });
  }


}