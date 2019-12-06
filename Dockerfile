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

# Install anaconda
RUN wget --quiet https://repo.continuum.io/archive/Anaconda3-5.1.0-Linux-x86_64.sh -O ~/anaconda.sh && \
    /bin/bash ~/anaconda.sh -b -p /opt/conda && \
    rm ~/anaconda.sh && \
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda activate base" >> ~/.bashrc

# Create anaconda env and install libraries
RUN /opt/conda/bin/conda create --name CognitivaProyFinal python=3.5.4 -y
#RUN . /opt/conda/bin/activate CognitivaProyFinal
#WORKDIR /usr/src/app/backend/Python
#RUN pip install -r requirements.txt

# Install and run node API Server
WORKDIR /usr/src/app/api
RUN npm install
CMD ["node", "server.js"]
