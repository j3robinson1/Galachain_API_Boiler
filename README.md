# Getting started

## Local Environment (Linux, MacOS, or Windows with WSL)

> If you are using Windows with WSL don't forget to enable integration with WSL on Docker Desktop.

[How to use Windows with WSL](./windows-wsl.md)

### Requirements

You need to have the following tools installed on your machine:

- Node.js 18+
- Docker and Docker Compose
- [jq](https://jqlang.github.io/jq/) and [yq](https://github.com/mikefarah/yq)

### 1. Install Galachain CLI

```
npm i -g @gala-chain/cli
```

Check the CLI:

```
galachain --help
```

### 2. Clone the project

```
git clone https://github.com/j3robinson1/Galachain_API_Boiler.git
```

```
cd ./Galachain_API_Boiler/galachain
```

Install all dependencies:

```
npm i
```

### 3. Start the network

Remember to run docker application

```
npm run network:up
```
^ Takes a minute or 2 ^

### 4. Start API server

```
cd ../api-server
```

```
node localContractApi.js
```

### 5. Have Fun!

[http://localhost:4000](http://localhost:4000)

---# Galachain_API_Boilerplate
# Galachain_API_Boiler
# Galachain_API_Boiler
# Galachain_API_Boiler
# Galachain_API_Boiler
# Galachain_API_Boiler
# Galachain_API_Boiler
