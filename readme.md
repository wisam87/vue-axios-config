# Vue Axios Config
### Typescript

Install Dependencies
```sh
$ npm install axios --save
```

Set Base Url
```
// api.service.ts
public constructor() {
    super(URL);
    this._initializeRequestInterceptor();
    this._authInterceptor();
}
```

Configure Response Interceptor
```
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
```

