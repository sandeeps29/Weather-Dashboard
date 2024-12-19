FROM node:14-alpine

WORKDIR /usr/src/app

# Add DNS settings
RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf && \
    echo "nameserver 8.8.4.4" >> /etc/resolv.conf

# Set npm config to use specific DNS
RUN npm config set registry http://registry.npmjs.org/
RUN npm config set strict-ssl false

COPY package*.json ./

# Add retry and timeout options to npm install
RUN npm install --no-package-lock --network-timeout=100000

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
