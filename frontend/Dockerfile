# Build stage
FROM node:16-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Set API URL at build time (React reads env vars during build)
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

