const express = require("express");
const router = express.Router();

// Example validation error
router.get("/validation-error", (req, res, next) => {
  const err = new Error("Invalid input data");
  err.name = "ValidationError";
  err.details = { field: "email", issue: "Invalid format" };
  next(err);
});

// Example business logic error
router.get("/business-error", (req, res, next) => {
  const err = new Error("Business rule violated");
  err.name = "BusinessLogicError";
  err.details = { rule: "Cannot delete admin user" };
  next(err);
});

// Example system error
router.get("/system-error", (req, res, next) => {
  throw new Error("Unexpected system failure");
});

// Example success
router.get("/success", (req, res) => {
  res.json({ success: true, data: "All good!" });
});

module.exports = router;
