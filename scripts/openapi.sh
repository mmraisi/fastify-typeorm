#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -eu

# Once redocly is available, bundle OpenAPI specification
redocly bundle -d "/spec/openapi.yml" -o "/src/openapi.json"
