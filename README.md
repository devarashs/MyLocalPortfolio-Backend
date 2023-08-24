# MyLocalPortfolio-Backend

Backend For MyLocalPortfolio

# Documentation

    this is a node js server built with express and mongodb as database , you need to setup your .env file and adjust cors.js based on your needs

# starting guide

- first setup a .env file and fill these with your parameters

```
MONGODB_URI=mongodb://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- second adjust the cors.js based on your web application . replace the allowedOrigin to your needs, configure methods as its needed or change or add options according to your needs

```javascript
// cors.js
import cors from "cors";

// Allow a specific address to access the server (replace with the actual addresses)
const allowedOrigin = ["https://mlfp.chill-hub.net", "http://localhost:5173"];

const corsOptions = {
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and authentication headers
};

export default cors(corsOptions);
```

- now run the following to install the modules and run the project

```
    yarn install
    yarn dev
```
