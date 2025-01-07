pipeline {
    agent any
    stages {
        stage("test"){
            steps{
                script{
                    echo "testing the application...."

                }
            }
        }
        stage("build"){
            steps{
                script{
                    echo "building the application...."
                }
            }
        }
        stage("deploy"){
            steps{
                script{
                    def dockerCmd = "docker run -d -p 8080:8080 --name myapp kalki2878/my-app-image"
                    sshagent(['ec2-user-key']) {
                            sh "ssh -o StrictHostKeyChecking=no ubuntu@13.201.131.139 ${dockerCmd}"
                        }
                    }
                }
            }
        }
    }
}
