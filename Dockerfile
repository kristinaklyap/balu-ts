FROM bitnami/nginx:1.25.1
COPY build /build
COPY nginx.conf /opt/bitnami/nginx/conf/server_blocks/nginx.conf