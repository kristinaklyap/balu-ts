final project = "balu"
final service = "balu-ts"
final registry = "harbor-core.harbor.svc.cluster.local"
final namespace = "balu"
final backendUrl = "https://api.balu.kristi.guru"
def version

def getLastVersion() {
    sh 'git fetch --tags'
    final isTagged = sh(script: 'git describe --abbrev=0', returnStatus: true) == 0
    if (!isTagged) {
        return '0.0.0'
    }
    final lastTag = sh(script: 'git describe --abbrev=0', returnStdout: true).trim().substring(1)
    return lastTag
}

def getNewReleaseTag(final String lastTag) {
    final semVerList = lastTag.split("\\.")
    return "${semVerList[0]}.${semVerList[1].toInteger()+1}.0"
}

def getVersion(boolean isRelease, String releaseVersionTag) {
    final lastVersion = getLastVersion()
    if (isRelease) {
        return releaseVersionTag ?: getNewReleaseTag(lastVersion)
    }
    return "${lastVersion}-${env.BRANCH_NAME.toLowerCase()}-${BUILD_NUMBER}"
}

pipeline {
  agent {
    kubernetes {
      yamlFile "cicd/jenkins-pod.yaml"
    }
  }
  environment {
    PROJECT = "$project"
    REGISTRY_USER = "$user"
    NODE_ENV = "production"
    REACT_APP_UPLOAD_URL = "$backendUrl"
    REACT_APP_API_URL = "$backendUrl/api"
  }
  parameters {
    booleanParam(name: 'IS_RELEASE', defaultValue: false, description: 'Set true if you want to release')
    string(name: 'RELEASE_VERSION_TAG', defaultValue: '', description: 'Leave empty to simply increment patch')
    text(name: 'RELEASE_NOTES', defaultValue: '', description: 'Add description of released changes')
  }
  stages {
    stage("Configuration"){
      steps {
        script {
          sh "git config --global credential.helper 'cache --timeout=7200'"
          checkout(scm)
          version = getVersion(params.IS_RELEASE, params.RELEASE_VERSION_TAG)
          sh "sed -i 's/appVersion: 0.0.1/appVersion: $version/g' helm/Chart.yaml"
        }
      }
    }
    stage("Build") {
      steps {
        container("node") {
          sh """
            npm install
            CI=false npm run build
          """
        }
        container("kaniko") {
          sh """
          /kaniko/executor --context `pwd` --destination $registry/$project/$service:latest  \
            --destination $registry/$project/$service:$version
          """
        }
      }
    }
    stage("Deploy") {
      steps {
        container("helm") {
          sh """
            cd helm
            helm upgrade --install ${service} . \
            --namespace ${namespaceDev} \
            --create-namespace \
            -f values.yaml \
            -f values-dev.yaml
          """
        }
      }
    }
    stage("Release") {
      when {
        expression { params.IS_RELEASE }
      }
      steps {
        sh """
            git tag -a v${version} -m 'Release v${version}\n${params.RELEASE_NOTES}'
            git push --tags
        """
      }
    }
  }
}
