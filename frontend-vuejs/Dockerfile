# FROM node:lts-alpine

# RUN npm install -g http-server

# WORKDIR /app
# COPY package*.json ./

# RUN npm install
# COPY . .

# RUN npm run build

# EXPOSE 8080
# CMD [ "http-server", "dist" ]


###2

FROM node:alpine AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY package*.json ./
RUN npm install
COPY . .
# install node modules and build assets
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]