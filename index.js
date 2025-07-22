const app = require("./server");
const { disconnect } = require("./db/connection");

const PORT = process.env.PORT || 3001;

function initApp() {
  const server = app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });

  // Graceful shutdown handlers
  process.on("SIGINT", () => {
    console.log("Received SIGINT, shutting down gracefully...");
    server.close(() => {
      disconnect();
      process.exit(0);
    });
  });

  process.on("SIGTERM", () => {
    console.log("Received SIGTERM, shutting down gracefully...");
    server.close(() => {
      disconnect();
      process.exit(0);
    });
  });
}

initApp();
