const app = require("./server");

const PORT = process.env.PORT || 3001;

function initApp() {
  app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });
}

initApp();
