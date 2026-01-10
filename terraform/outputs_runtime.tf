output "frontend_url" {
  value = "http://${aws_lb.this.dns_name}/"
}

output "backend_url" {
  value = "http://${aws_lb.this.dns_name}/api/"
}
