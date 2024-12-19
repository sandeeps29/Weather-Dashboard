/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'weather-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Get code from Git repository
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Install dependencies
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                // Run tests (if any)
                sh 'npm test || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Remove existing container if it exists
                    sh 'docker rm -f weather-container || true'

                    // Run new container
                    sh "docker run -d -p 3000:3000 --name weather-container ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Application is deployed.'
        }
        failure {
            echo 'Pipeline failed! Check logs for details.'
        }
    }
}
