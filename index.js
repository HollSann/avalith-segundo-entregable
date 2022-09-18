require("dotenv").config();
const indexRoutes = require("./src/routes/index.routes.js");
const userRoutes = require("./src/routes/users.routes.js");
const carRoutes = require("./src/routes/car.routes.js");
const sequelize = require("./src/database/database.js");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const app = require("./app.js");
const {
  errorParser,
  errorLogger,
} = require("./src/middlewares/errorHandler.js");

app.use(bodyParser.json());
app.use([errorLogger, errorParser]);

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `The Connection whit <<${process.env.DATABASE_NAME}>> database has been established successful.`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  app.listen(port || 3000, () => {
    console.log(`Server listening on port ${port}`);
  });
};
main();

app.use(indexRoutes, userRoutes, carRoutes);
