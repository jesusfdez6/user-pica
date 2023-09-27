FROM node:18
WORKDIR /usr/src/appCreateUser

COPY package.json /usr/src/appCreateUser/
RUN npm install

COPY . /usr/src/appCreateUser
EXPOSE 3000
CMD [ "npm", "start" ]