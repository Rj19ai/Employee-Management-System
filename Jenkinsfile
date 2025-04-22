pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'pgp2024019/employee-backend:latest'
        DOCKER_IMAGE_FRONTEND = 'pgp2024019/employee-frontend:latest'
        ANSIBLE_INVENTORY = '/etc/ansible/hosts'     // update if using custom inventory
        ANSIBLE_PLAYBOOK = 'deploy.yml'              // update if you named it differently
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Rj19ai/Employee-Management-System.git'
            }
        }

        stage('Pull Docker Images from Hub') {
            steps {
                sh 'docker pull $DOCKER_IMAGE_BACKEND'
                sh 'docker pull $DOCKER_IMAGE_FRONTEND'
            }
        }

        stage('Deploy Using Ansible') {
            steps {
                sh 'ansible-playbook -i $ANSIBLE_INVENTORY $ANSIBLE_PLAYBOOK'
            }
        }
    }
}
