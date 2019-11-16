#!/usr/bin/env bash

set -o nounset -o pipefail -o errexit

readVariableIfRequired() {
  if [[ -z "${!1:-}" ]]; then
    read -p "${2:-${1}=}" "${1}"
  else
    echo "${1}="${!1}
  fi
}

readVariableIfRequired INSTANCE_NAME

export VM_NAME="frontend-test-${INSTANCE_NAME}"

gcloud beta compute \
  --project=ma-dev2 instances \
  create-with-container "${VM_NAME}" \
  --zone=europe-west1-d \
  --machine-type=f1-micro \
  --subnet=default \
  --network-tier=PREMIUM \
  --metadata=google-logging-enabled=true \
  --maintenance-policy=MIGRATE \
  --service-account=929664083947-compute@developer.gserviceaccount.com \
  --scopes=https://www.googleapis.com/auth/devstorage.read_only,https://www.googleapis.com/auth/logging.write,https://www.googleapis.com/auth/monitoring.write,https://www.googleapis.com/auth/servicecontrol,https://www.googleapis.com/auth/service.management.readonly,https://www.googleapis.com/auth/trace.append \
  --tags=frontend-test,http-server \
  --image=cos-stable-74-11895-125-0 \
  --image-project=cos-cloud \
  --boot-disk-size=10GB \
  --boot-disk-type=pd-standard \
  --boot-disk-device-name="${VM_NAME}" \
  --container-image=eu.gcr.io/ma-dev2/front_demo:latest \
  --container-restart-policy=always \
  --container-env=PORT=80 \
  --labels=container-vm=cos-stable-74-11895-125-0
