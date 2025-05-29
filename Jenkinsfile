pipeline {
  agent any

  stages {
    stage('Init') {
      steps {
        echo 'Jenkinsfile detected. Pipeline started.'
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
