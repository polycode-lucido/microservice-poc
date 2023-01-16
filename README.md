# Microservice POC

This project is here to demonstrate how I would build a microservice architecture, and more specifically how I would make them communicate with each other.

## Architecture
We have 3 microservices:
- stock
- order
- gateway

Gateways take http requests, and forward them to the right microservice, via gRPC. They also take the response from the microservice, and forward it to the client.

Stock and order are our microservices. They both expose an gRPC API.

In the production environment, they all communicate with each other, via Istio's service mesh.

## Routes
/api/inventory, GET
/api/stock/:name, GET
/api/product/:name, GET
/api/user, GET
/api/order, GET

/api/stock/:name/:quantity, POST
/api/product, POST
/api/order, POST
/api/user, POST

Routes accepts and returns JSON.

Product JSON example:
```json
{
    "name": "product name",
    "price": 10.0,
    "id": 1
}
```

User JSON example:
```json
{
    "name": "username",
}
```

Order JSON example:
```json
{
  "productName": "phone",
  "quantity": "3",
  "username": "username",
  "date": "ignored in POST request",
}
```

## Installation
### Pre-requisites

For the "development" environment, you need:
- docker
- nodejs
- npm

For the "production" environment, you need:
- ansible, with a root access to a machine via ssh
- terraform
- helm

### How to run, in a "development" environment

- npm run start

### How to run, in a "production" environment

- Clone the repo
- Move to `ops/create_cluster/`
- Edit `inventory.ini` (and you may want to edit `ops/create_cluster/k3d_config.yaml` if you have particular k3d configuration needs, as it is there is no ingress controller)
- Run `ansible-playbook ./main.yaml`
- Move to `ops/terraform/prod/k8s-cluster/`
- Delete the `terraform.tfstate`, `terraform.tfstate.backup` and `terraform.lock.hcl` files if they exists
- Run `terraform init`
- Run `terraform apply`
- Move to `helm/`
- Run `helm install stock stock/chart/ -f stock/prod.values.yaml -n inventory`
- Run `helm install order order/chart/ -f order/prod.values.yaml -n inventory`
- Run `helm install gateway gateway/chart/ -f gateway/prod.values.yaml -n inventory`
