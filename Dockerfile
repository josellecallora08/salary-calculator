FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html cookies.html styles.css app.js engine.js rules.js manifest.json icon.svg service-worker.js /usr/share/nginx/html/

EXPOSE 80
