FROM node:16.20.2-alpine3.18

WORKDIR /src

COPY . .

RUN yarn

# RUN yarn run build

# CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]
CMD [ "yarn", "run", "dev", "--host", "0.0.0.0" ]

# FROM nginx AS production-stage
# RUN mkdir /app
# COPY --from=build-stage /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf