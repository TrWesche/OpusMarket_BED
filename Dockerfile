# https://mherman.org/blog/dockerizing-a-react-app/
# https://dzone.com/articles/how-to-dockerize-reactjs-app

## Part 1 - Build the Production React Image

# Specify the starting point image from docker-hub.  In this case its a docker image with node.js preinstalled on alpine linux.
FROM node:15.9.0-alpine3.10

EXPOSE 5000

# Set Working Directory for the Container - Assuming the node environment comes with an /app folder based on other guides
WORKDIR /app

# Copy across the dependency description
COPY . /app

# Will execute npm install in /app due to WORKDIR selection
RUN npm install

# The CMD command is a special Docker Command known as an entry-point command.  Unlike run there can only be 1 of these.  In the case of the command below it is starting the node server inside of the container
# no need for /home/app/server.js because of WORKDIR
CMD ["node", "server.js"]

## Additional Details -> Project Notes:Docker (Not shared in GIT repository) ##