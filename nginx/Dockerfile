FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*

COPY ./default.conf  /etc/nginx/conf.d/

EXPOSE 80

# Launch Nginx
CMD [ "nginx", "-g", "daemon off;" ]