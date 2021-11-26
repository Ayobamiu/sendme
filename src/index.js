const app = require("./app");

app.listen(process.env.PORT, () => {
  console.table([{ key: "port", value: process.env.PORT }]);
});
