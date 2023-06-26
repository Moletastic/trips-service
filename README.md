# Trips Service

## 📄 Getting started

### Running with Docker

Build the docker image using:

```bash
docker build -t trips-service . -f Dockerfile # or Dockerfile.dev
```

Then, just execute:

```bash
docker-compose up -d
```

### 🧪 Running test suite

Before execute the test suite, ensure to install the required dependencies using:

```bash
npm install
```

To execute the test suite based on [jest](https://jestjs.io/) and ([ts-jest](https://github.com/kulshekhar/ts-jest)), just execute:

```bash
npm run test
```

To run on watching mode:

```bash
npm run test:watch
```
