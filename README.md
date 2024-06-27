# Stock Trading Vue
***Stock Trading Vue*** a web application for trading stocks.

# Requirements
* [Nginx 1.27](https://nginx.org/en/)
* [VueJS 3.4](https://vuejs.org/)
* [Axio 1.7](https://axios-http.com/)
* [Bootstrap 5.3](https://getbootstrap.com/)

# Starting up the application
## Building the Docker Image
```
docker build . -t stocktrading-vue
```

## Running the application
```
docker run -it -p 80:80 --name stocktrading-vue --rm stocktrading-vue
```
