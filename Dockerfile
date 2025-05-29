FROM jenkins/jenkins:lts

USER root

RUN groupadd -g 1001 docker && \
    usermod -aG docker jenkins

RUN apt-get update && apt-get install -y docker.io curl apt-transport-https ca-certificates gnupg2 software-properties-common

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

USER jenkins
