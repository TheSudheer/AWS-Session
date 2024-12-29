pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "kalki2878/fun-js-app"
        DOCKER_TAG = "1.1"
        DOCKER_CREDENTIALS = 'docker-hub-credentials' // configure this in Jenkins
        NEXUS_CREDENTIALS = 'nexus-credentials' // configure this in Jenkins
        NEXUS_URL = "localhost:8083"
    }

    stages {
        stage("Build") {
            steps {
                script {
                    sh 'npm install'
                    echo "Building the application..."
                }
            }
        }

        stage("Test") {
            steps {
                script {
                    echo "Testing the application..."
                    sh 'npm test || true'
                }
            }
        }

        stage("Pushing the image to DockerHub") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                        sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }
            }
        }

        stage("Pushing the image to Nexus Artifact Repository") {
            steps {
                script {
                    echo "Tagging and pushing the image to Nexus Artifact Repository..."
                    withCredentials([usernamePassword(credentialsId: "${NEXUS_CREDENTIALS}", passwordVariable: 'NEXUS_PASSWORD', usernameVariable: 'NEXUS_USERNAME')]) {
                        sh "docker login ${NEXUS_URL} -u ${NEXUS_USERNAME} -p ${NEXUS_PASSWORD}"
                        
                        // Tagging the image with Nexus URL 
                        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${NEXUS_URL}/my-app:${DOCKER_TAG}"

                        // Pushing the tagged image to Nexus
                        sh "docker push ${NEXUS_URL}/my-app:${DOCKER_TAG}"
                    }
                }
            }
        }
    }
}

