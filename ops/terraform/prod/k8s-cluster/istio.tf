resource "helm_release" "istiod_release" {
  name      = "istiod"
  namespace = kubernetes_namespace.istio_system_namespace.metadata[0].name

  chart  = "../../../charts/istiod"
  values = ["${file("../../../charts/istiod/values.yaml")}"]

  depends_on = [
    kubernetes_namespace.istio_system_namespace,
    helm_release.istio_base_release
  ]
}

resource "helm_release" "istio_gateway_release" {
  name      = "istio-gateway"
  namespace = kubernetes_namespace.istio_ingress_namespace.metadata[0].name

  chart  = "../../../charts/gateway"
  values = ["${file("../../../charts/gateway/values.yaml")}"]

  depends_on = [
    kubernetes_namespace.istio_ingress_namespace,
    helm_release.istio_base_release
  ]
}

resource "helm_release" "istio_base_release" {
  name      = "istio-base"
  namespace = kubernetes_namespace.istio_system_namespace.metadata[0].name

  chart  = "../../../charts/istio-base"
  values = ["${file("../../../charts/istio-base/values.yaml")}"]

  depends_on = [
    kubernetes_namespace.istio_system_namespace
  ]
}

