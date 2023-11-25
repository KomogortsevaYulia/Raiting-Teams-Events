FROM node:16

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]

# FROM nginx AS production-stage
# RUN mkdir /app
# COPY --from=build-stage /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf