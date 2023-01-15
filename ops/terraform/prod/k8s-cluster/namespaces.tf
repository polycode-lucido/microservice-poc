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

resource "kubernetes_namespace" "istio_system_namespace" {
  metadata {
    name = "istio-system"
  }
}
