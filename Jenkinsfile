pipeline {
  agent any
  stages {
    stage('Clean Workspace') {
      steps {
        deleteDir()
      }
    }
    stage('Checkout') {
      steps {
        git url: 'https://github.com/Blitz17/SIT753_Devops_Pipeline.git', branch: 'master'
      }
    }
    stage('Build') {
      steps {
        sh 'docker build -t myapp:latest .'
      }
    }
    stage('Test') {
      steps {
        sh 'npm install'
        sh 'npm test'
      }
    }
  }
}
