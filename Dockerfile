FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y docker.io curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

USER jenkins
