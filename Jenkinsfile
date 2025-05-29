pipeline {
  agent any
  triggers {
    pollSCM('H/15 * * * *')
  }
  environment {
    SONAR_TOKEN = credentials('sonar-token')      // SonarCloud Token (Secret Text)
    SNYK_TOKEN = credentials('snyk_key')   
    UPTIMEROBOT_API_KEY = credentials('uptimerobot-key')   
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
        script {
        def versionTag = "v1.0.${env.BUILD_NUMBER}"
        sh "docker build -t myapp:${versionTag} ."
        sh "docker tag myapp:${versionTag} myapp:latest"
        sh "docker images"
        }
      }
    }

    stage('Test') {
      steps {
        sh 'npm install'
        sh 'chmod +x ./node_modules/.bin/mocha'
        sh 'chmod +x ./node_modules/.bin/nyc'
        sh 'npm test'

        junit 'test-results.xml'
        sh 'cat test-results.xml'
      }
    }

    stage('Code Quality') {
      steps {
        withEnv(["SONAR_TOKEN=${SONAR_TOKEN}"]) {
          sh '''
            npm install sonar-scanner
            npm install
            npm test
            npx sonar-scanner \
              -Dsonar.projectKey=Blitz17_SIT753_Devops_Pipeline \
              -Dsonar.organization=blitz17 \
              -Dsonar.sources=. \
              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
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
            npx snyk test --json > snyk-report.json
          '''
        }
        script {
          def snykReport = readFile('snyk-report.json')
          def snykJson = readJSON text: snykReport
          def vulns = snykJson.vulnerabilities.findAll { it.severity == 'high' || it.severity == 'critical' }
          if (vulns.size() > 0) {
              error("High or Critical vulnerabilities found: ${vulns.size()}")
          }
        }
        archiveArtifacts 'snyk-report.json'
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent (credentials: ['ec2-key']) {
          sh '''
  echo "Copying files..."
  scp -o StrictHostKeyChecking=no -r Dockerfile Dockerfile.jenkins Jenkinsfile app.js controllers models node_modules package-lock.json package.json routes test views ec2-user@54.206.94.245:/home/ec2-user/app/

  echo "Running remote deployment..."
  ssh -o StrictHostKeyChecking=no ec2-user@54.206.94.245 bash -s <<EOF
    set -e
    cd /home/ec2-user/app
    docker stop myapp || true
    docker rm myapp || true
    docker rmi myapp:latest || true
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
        withCredentials([usernamePassword(credentialsId: '8d110a95-a681-40b0-817a-b2f47770c79d', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
          sh '''
            git config --global user.email "dhanushsoma12@gmail.com"
            git config --global user.name "Blitz17  "
            git tag -a v1.0.$BUILD_NUMBER -m "Release version v1.0.$BUILD_NUMBER"
            git push https://$GIT_USER:$GIT_PASS@github.com/Blitz17/SIT753_Devops_Pipeline.git --tags
          '''
        }
      }
    }

    stage('Monitoring') {
      steps {
        script {
          def response = sh(script: """
            curl -s -X POST https://api.uptimerobot.com/v2/getMonitors \
              -H 'Content-Type: application/x-www-form-urlencoded' \
              -d 'api_key=$UPTIMEROBOT_API_KEY&format=json'
          """, returnStdout: true).trim()

          def json = readJSON text: response
          def monitors = json.monitors
          def downMonitors = monitors.findAll { it.status != 2 } // 2 means UP

          if (downMonitors.size() > 0) {
            echo "Monitors down: ${downMonitors.collect { it.friendly_name + ' (' + it.status + ')' }}"
            error("Some monitors are down!")
          } else {
            echo "All monitors are UP"
          }
        }
      }
    }
  }
}

