FROM nginx:alpine as runtime

COPY ./dist/ /usr/share/nginx/html/
