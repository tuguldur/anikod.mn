const express = require("express");
const app = express();
const path = require("path");
// enable ssl redirect
app.get("*", function (req, res, next) {
  if (
    req.headers["x-forwarded-proto"] != "https" &&
    process.env.NODE_ENV === "production"
  )
    res.redirect("https://" + req.hostname + req.url);
  else next(); /* Continue to other routes if we're not redirecting */
});
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.json());
app.use("/api", require("./src/routes"));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname + "/client/build/index.html"))
);
app.listen(process.env.PORT || 5000, "0.0.0.0");
