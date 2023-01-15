resource "kubernetes_namespace" "inventory_namespace" {
  metadata {
    name = "inventory"
  }
}

resource "kubernetes_namespace" "ingress_nginx_namespace" {
  metadata {
    name = "ingress-nginx"
  }
}
