FROM mhart/alpine-node:6.9.1

MAINTAINER dimkk

# add files to container
ADD . /app

# specify the working directory
WORKDIR app

RUN npm install \
     && npm run build \
     && npm prune --production \

EXPOSE 8080

# run application
CMD ["npm", "start"]