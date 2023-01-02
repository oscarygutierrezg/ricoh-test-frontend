FROM nginx:alpine
COPY /dist/bcp-test /usr/share/nginx/html
EXPOSE 80