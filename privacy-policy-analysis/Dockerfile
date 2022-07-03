# pull the Node.js Docker image
FROM node:10.18.0

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY . .

# the command that starts our app
# CMD ["npm", "run", "dev"]
CMD ["node", "index.js"]