variable "kubeconfig_context_name" {
  type    = string
  default = "k3d-inventory-poc"
}

variable "kubeconfig_path" {
  type    = string
  default = "~/.kube/inventory-poc"
}
