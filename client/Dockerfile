FROM node:18-alpine as builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm", "start"]

# FROM  nginx
# EXPOSE 8081
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html