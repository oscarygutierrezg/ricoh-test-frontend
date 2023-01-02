FROM nginx:alpine
COPY /dist/ricoh-test /usr/share/nginx/html
EXPOSE 80