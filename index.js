const app = require("./server");
const { disconnect } = require("./db/connection");

const PORT = process.env.PORT || 3001;

function initApp() {
  app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });
}

process.on("SIGINT", () => {
  console.log("Received SIGINT, shutting down gracefully...");
  app.close(() => {
    disconnect();
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM, shutting down gracefully...");
  app.close(() => {
    disconnect();
    process.exit(0);
  });
});

initApp();
