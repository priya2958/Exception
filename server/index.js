const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");

app.use(express.json());

// Example route
app.use("/api", routes);

// Centralized error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
