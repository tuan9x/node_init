docker build --tag "api"  --file ./bin/Dockerfile .
docker tag api acc_hub/api:2.0
docker push acc_hub/api:2.0