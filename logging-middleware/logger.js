import { CLIENT_ID, CLIENT_SECRET } from "./config.js";

export async function log(stack, level, pkg, message) {
  try {
    const response = await fetch("http://20.244.56.144/valuation-service/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    const data = await response.json();
    console.log("Log sent:", data);
  } catch (err) {
    console.error("Log failed:", err.message);
  }
}
