pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonar-token')      // SonarCloud Token (Secret Text)
    SNYK_TOKEN = credentials('snyk_key')        // Snyk Token (Secret Text)
  }

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
        sh 'chmod +x ./node_modules/.bin/mocha'
        sh 'npm test'
      }
    }

    stage('Code Quality') {
      steps {
        withEnv(["SONAR_TOKEN=${SONAR_TOKEN}"]) {
          sh '''
            npm install sonar-scanner
            npx sonar-scanner \
              -Dsonar.projectKey=Blitz17_SIT753_Devops_Pipeline \
              -Dsonar.organization=blitz17 \
              -Dsonar.sources=. \
              -Dsonar.host.url=https://sonarcloud.io \
              -Dsonar.login=$SONAR_TOKEN
          '''
        }
      }
    }

    stage('Security Scan') {
      steps {
        withEnv(["SNYK_TOKEN=${SNYK_TOKEN}"]) {
          sh '''
            npm install snyk || true
            echo $SNYK_TOKEN | npx snyk auth --token
            npx snyk test || true
          '''
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent (credentials: ['ec2-key']) {
          sh '''
            scp -o StrictHostKeyChecking=no -r * ec2-user@54.206.94.245:/home/ec2-user/app/

            ssh -o StrictHostKeyChecking=no ec2-user@54.206.94.245 << EOF
              docker stop myapp || true
              docker rm myapp || true
              docker rmi myapp || true
              cd /home/ec2-user/app
              docker build -t myapp:latest .
              docker run -d -p 3000:3000 --name myapp myapp:latest
            EOF
          '''
        }
      }
    }

    stage('Release') {
      steps {
        echo 'Tagging release and pushing tags to repo'
        sh '''
          git tag -a v1.0.$BUILD_NUMBER -m "Release version v1.0.$BUILD_NUMBER"
          git push origin --tags
        '''
      }
    }

    stage('Monitoring') {
      steps {
        echo 'Running Monitoring checks'
        sh '''
          curl -X GET https://api.uptimerobot.com/v2/getMonitors \
          -H 'Content-Type: application/x-www-form-urlencoded' \
          -d 'api_key=YOUR_UPTIMEROBOT_API_KEY&format=json'
        '''
      }
    }
  }
}
