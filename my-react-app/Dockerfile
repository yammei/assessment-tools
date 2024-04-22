FROM node:16-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM httpd:2.4-alpine
COPY --from=build /usr/src/app/build/ /usr/local/apache2/htdocs/
EXPOSE 80
RUN rm -f /usr/local/apache2/logs/httpd.pid
CMD ["httpd-foreground"]
