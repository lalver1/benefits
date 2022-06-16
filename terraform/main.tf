terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.10.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "RG-CDT-PUB-VIP-CALITP-P-001"
    storage_account_name = "sacdtcalitpp001"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

data "azurerm_client_config" "current" {}

data "azurerm_resource_group" "prod" {
  name = "RG-CDT-PUB-VIP-CALITP-P-001"
}
