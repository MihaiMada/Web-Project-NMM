const express = require("express");
const homePageController = require("../controllers/homePageController");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const auth = require("../validation/authValidation");

let router = express.Router();
if (typeof localStorage === "undefined" || localStorage === null) {
	let LocalStorage = require("node-localstorage").LocalStorage;
	localStorage = new LocalStorage("./scratch");
}
let initWebRoutes = (app) => {
	router.get("/", homePageController.handleHelloWorld);
	router.get("/login", loginController.getPageLogin);
	router.post("/logout", loginController.handleLogout);
	router.post("/delete", loginController.handleDelete);
	router.post("/login", auth.validateLogin, loginController.handleLogin);
	router.get("/register", registerController.getPageRegister);
	router.post(
		"/register",
		auth.validateRegister,
		registerController.createNewUser
	);
	return app.use("/", router);
};
module.exports = initWebRoutes;
