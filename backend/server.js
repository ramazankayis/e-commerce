const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send(" 19191991919 bu api router");
});
app.listen(5000, () => {
  console.log(`sunucu ${5000} portunda çalışıyor`);
});
