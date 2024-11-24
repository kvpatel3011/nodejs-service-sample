# Sample Node.js Application for DevOps Assessment

## Overview

This is a sample Node.js application designed for DevOps testing and deployment. The application includes basic
endpoints, monitoring capabilities, logging, and error simulation features that demonstrate various operational aspects
of a production application.

## Features

- Health check endpoint
- Prometheus metrics integration
- Winston logging implementation
- CPU load simulation
- Error simulation endpoint
- Docker support
- Kubernetes deployment ready
- Comprehensive test suite

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (for containerization)
- Kubernetes cluster (for deployment)

## Local Development Setup

1. Install dependencies:

```bash
npm install
```

2. Start the application:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

- `PORT`: Application port (default: 3000)
- `NODE_ENV`: Environment mode (development/production/test)

## API Endpoints

### Main Endpoints

- `GET /`: Welcome message with environment info
- `GET /health`: Health check endpoint
- `GET /metrics`: Prometheus metrics
- `GET /error`: Simulated error response
- `GET /cpu-load`: CPU load simulation

### Response Examples

#### Health Check

```json
{
  "status": "healthy"
}
```

#### Main Endpoint

```json
{
  "message": "Welcome to the sample application",
  "environment": "development",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Coverage Requirements

- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

## Docker Support

### Building the Image

```bash
docker build -t sample-nodejs-app .
```

### Running the Container

```bash
docker run -p 3000:3000 sample-nodejs-app
```

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster access
- kubectl configured

### Deploying the Application

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

## Monitoring

### Prometheus Metrics

The application exposes metrics at `/metrics` including:

- HTTP request counts
- Request duration
- System metrics

### Logging

- Console logging in development
- File-based logging in production
- Structured JSON log format
- Error logging to separate file

## Development

### Code Style

The project uses ESLint with Airbnb configuration. Run linting:

```bash
# Check code style
npm run lint

# Fix automatically
npm run lint:fix
```

### Directory Structure

```
.
├── __tests__/           # Test files
├── k8s/                 # Kubernetes manifests
├── app.js              # Main application file
├── Dockerfile          # Docker configuration
├── package.json        # Project dependencies
├── jest.config.js      # Test configuration
└── README.md           # This file
```

## CI/CD Pipeline Support

The application is designed to work with common CI/CD tools:

- Jenkins
- GitLab CI
- GitHub Actions

Example pipelines include:

- Automated testing
- Docker image building
- Security scanning
- Kubernetes deployment

## Security Considerations

- Non-root user in Docker container
- Security headers implemented
- Rate limiting capability
- No sensitive data in logs
- Regular dependency updates

## Performance

- Response time monitoring
- Resource usage tracking
- Load testing support
- Horizontal scaling support
