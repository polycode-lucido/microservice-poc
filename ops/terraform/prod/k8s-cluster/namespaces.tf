resource "kubernetes_namespace" "inventory_namespace" {
  metadata {
    name = "inventory"
    labels = {
      "istio-injection" = "enabled"
    }
  }
}

resource "kubernetes_namespace" "ingress_nginx_namespace" {
  metadata {
    name = "ingress-nginx"
    labels = {
      "istio-injection" = "enabled"
    }
  }
}

resource "kubernetes_namespace" "istio_system_namespace" {
  metadata {
    name = "istio-system"
    labels = {
      "istio-injection" = "enabled"
    }
  }
}

resource "kubernetes_namespace" "istio_ingress_namespace" {
  metadata {
    name = "istio-ingress"
    labels = {
      "istio-injection" = "enabled"
    }
  }

  depends_on = [
    helm_release.istiod_release
  ]
}

