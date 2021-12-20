FROM nginx:alpine

EXPOSE 8080
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist/beatstars /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx  && \
    chown nginx:nginx  /usr/share/nginx/html/* && \
    chmod -R 755 /etc/nginx/conf.d/default.conf && \
    chmod -R 755 /usr/share/nginx/html/assets/* &&  \
    chown nginx:nginx  /usr/share/nginx/html/assets*

CMD nginx -g 'daemon off;'
