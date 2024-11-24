import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: false,
});
