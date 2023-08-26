// cors.js
import cors from "cors";
// Allow a specific address to access the server (replace with the actual addresses)
const allowedOrigin = [
  "https://chill-hub.net",
  "https://www.chill-hub.net",
  "https://mlfp.chill-hub.net",
  "http://localhost:5173",
];

const corsOptions = {
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and authentication headers
};

export default cors(corsOptions);
