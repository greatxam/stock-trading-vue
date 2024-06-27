# Build Stage
FROM node:22-alpine as build-stage
WORKDIR /app
COPY ./src/stock-trading-vue/package*.json ./
RUN npm install
COPY ./src/stock-trading-vue ./
RUN npm run build

# Production stage
FROM nginx:1.27
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
