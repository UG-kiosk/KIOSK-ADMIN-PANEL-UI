FROM node:20-alpine as builder
WORKDIR /app
COPY package.json ./
ARG VITE_GATEWAY_URL
ENV VITE_GATEWAY_URL=$VITE_GATEWAY_URL
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.23.3-alpine 
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist/ /var/www/kiosk-admin-panel-ui/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]