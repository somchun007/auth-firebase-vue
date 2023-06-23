FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]







###2
# FROM node:lts-alpine as builder

# WORKDIR /vue-ui
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build


# FROM nginx:alpine as production-build

# COPY ./nginx.conf /etc/nginx/nginx.conf
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=builder /vue-ui/dist /usr/share/nginx/html

# EXPOSE 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"]