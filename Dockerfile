# Define base image
FROM node:18-alpine AS builder

# Set environment
ARG ARGS_NODE_BUILD

ENV ARGS_NODE_BUILD=${ARGS_NODE_BUILD}
ENV HUSKY=0

# Change working directory
WORKDIR /usr/src/app

# Copy packages.json and yarn.lock
COPY package*.json yarn.lock ./

# # Update yarn
# RUN npm i -g --force yarn@1.22.17

# Install Package Dependencies
RUN yarn install

# Copy All Source Code to Working Directory
COPY . .

# Build from source
RUN yarn build

# Define runtime image
FROM nginx:alpine AS runtime

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Copy static assets from builder stage
COPY --from=builder /usr/src/app/dist ./

# Copy nginx conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY nginx.conf /var/www/data/etc/nginx/nginx.conf

# Setup permissions
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

# Expose port
EXPOSE 4000

# Set entrypoint
CMD ["nginx", "-g", "daemon off;"]
