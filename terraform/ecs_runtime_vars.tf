# ECR image repo URLs (without :tag)
variable "frontend_image" {
  type = string
}

variable "backend_image" {
  type = string
}

# Desired counts
variable "frontend_desired_count" {
  type    = number
  default = 1
}

variable "backend_desired_count" {
  type    = number
  default = 1
}

# Task sizing
variable "frontend_cpu" {
  type    = number
  default = 256
}

variable "frontend_memory" {
  type    = number
  default = 512
}

variable "backend_cpu" {
  type    = number
  default = 256
}

variable "backend_memory" {
  type    = number
  default = 512
}
