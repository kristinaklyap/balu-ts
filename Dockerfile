FROM jauderho/nginx:1.25.0
COPY build /build
COPY nginx.conf /etc/nginx/nginx.conf