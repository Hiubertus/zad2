FROM scratch AS builder

ADD ./alpine-mini.tar.gz /
WORKDIR /app
COPY /app .

FROM nginx:mainline-alpine3.19-slim

ARG VERSION
ENV APP_VER=production.${VERSION:-v1.0}
LABEL maintainer="Hubert Ozarowski s97692@pollub.edu.pl"

RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
    nodejs-current=21.7.3-r0 \
    npm=10.8.0-r0 \
    curl=8.7.1-r0 \
    busybox=1.36.1-r27 \ 
    openssl=3.3.0-r2 \ 
    --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community \
    --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main

WORKDIR /app
COPY --from=builder /app .
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

RUN npm install

CMD nginx -g "daemon off;" & npm start

