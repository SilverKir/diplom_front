const express = require("express");
const app = express();
const port = process.env.PORT;
const dest = process.env.DEST || `/app/html`;

app.use(express.static(DEST));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
