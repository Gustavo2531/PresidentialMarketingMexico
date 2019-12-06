FROM ubuntu:xenial

LABEL "install-type"="mounted"
EXPOSE 8005

# Install Node and Ubuntu dependencies
RUN apt-get update && apt-get install -y -q --no-install-recommends \
    curl \
    ca-certificates \
    pkg-config \
    build-essential \
    libzmq3-dev \
    wget \
 && curl -s -S -o /tmp/setup-node.sh https://deb.nodesource.com/setup_8.x \
 && chmod 755 /tmp/setup-node.sh \
 && /tmp/setup-node.sh \
 && apt-get install nodejs -y -q \
 && rm /tmp/setup-node.sh \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
 && npm install -g prebuild-install

# Copy application to /usr/src/app
RUN mkdir -p /usr/src/app
COPY . /usr/src/app

# Install and run node API Server
WORKDIR /usr/src/app/frontend
RUN npm install
CMD ["npm", "start"]
