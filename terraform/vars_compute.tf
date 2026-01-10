

variable "vpc_cidr" {
  type    = string
  default = "10.50.0.0/16"
}

variable "frontend_container_port" {
  type    = number
  default = 80
}

variable "backend_container_port" {
  type    = number
  default = 5000
}

