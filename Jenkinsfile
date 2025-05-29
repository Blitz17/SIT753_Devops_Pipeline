pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonar-token')       // SonarCloud Token (Secret Text)
    SNYK_TOKEN = credentials('snyk_key')           // Snyk Token (Secret Text)
    UPTIME_API_KEY = credentials('uptime-api-key') // UptimeRobot API Key (Secret Text)
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
        sh '''
          echo "Installing dependencies..."
          npm install
          chmod +x ./node_modules/.bin/mocha
          echo "Running tests..."
          npm test
        '''
      }
    }

    stage('Code Quality') {
      steps {
        withEnv(["SONAR_TOKEN=${SONAR_TOKEN}"]) {
          sh '''
            echo "Installing sonar-scanner..."
            npm install sonar-scanner
            echo "Running SonarCloud analysis..."
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
            echo "Installing Snyk..."
            npm install snyk || true
            echo $SNYK_TOKEN | npx snyk auth --token
            echo "Running Snyk scan..."
            npx snyk test || true
          '''
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent (credentials: ['ec2-key']) {
          sh '''
            echo ">>> Copying files to EC2 at $(date)"
            scp -o ConnectTimeout=10 -o StrictHostKeyChecking=no -r * ec2-user@54.206.94.245:/home/ec2-user/app/

            echo ">>> Connecting to EC2 and restarting Docker at $(date)"
            ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no ec2-user@54.206.94.245 << 'EOF'
              set -e
              echo "Stopping old container..."
              docker stop myapp || true
              docker rm myapp || true
              docker rmi myapp || true
              echo "Rebuilding and running Docker..."
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
        echo 'Tagging release and pushing tags to GitHub'
        sh '''
          git config --global user.email "jenkins@localhost"
          git config --global user.name "Jenkins CI"
          git tag -a v1.0.$BUILD_NUMBER -m "Release version v1.0.$BUILD_NUMBER"
          git push origin --tags
        '''
      }
    }

    stage('Monitoring') {
      steps {
        echo 'Checking UptimeRobot status'
        sh '''
          curl -s -X POST https://api.uptimerobot.com/v2/getMonitors \
            -H 'Content-Type: application/x-www-form-urlencoded' \
            -d "api_key=$UPTIME_API_KEY&format=json"
        '''
      }
    }
  }

  post {
    failure {
      echo 'Build failed! Sending notification or logging error.'
    }
    success {
      echo 'Build, Test, Deploy, and Monitor completed successfully.'
    }
  }
}
