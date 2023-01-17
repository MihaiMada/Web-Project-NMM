const { validationResult } = require("express-validator");
const loginService = require("../services/loginService");
let LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
const DBConnection = require("../configs/DBConnection");

let getPageLogin = (req, res) => {
	return res.render("login.ejs", {
		errors: req.flash("errors"),
	});
};

let handleLogin = async (req, res) => {
	let errorsArr = [];
	let validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		let errors = Object.values(validationErrors.mapped());
		errors.forEach((item) => {
			errorsArr.push(item.msg);
		});
		req.flash("errors", errorsArr);
		return res.redirect("/login");
	}
	try {
		await loginService.handleLogin(req.body.email, req.body.password);
		localStorage.setItem(
			"user",
			JSON.stringify({
				email: req.body.email,
				password: req.body.password,
			})
		);
		return res.redirect("/");
	} catch (err) {
		req.flash("errors", err);
		console.log(err);
		return res.redirect("/login");
	}
};

let handleLogout = (req, res) => {
	localStorage.removeItem("user");
	return res.redirect("/login");
};

let handleDelete = (req, res) => {
	let user = localStorage.getItem("user");
	user = JSON.parse(user);
	if (!user) return;
	return new Promise((resolve, reject) => {
		try {
			DBConnection.query(
				`DELETE FROM users2 WHERE email='${user.email}'`,
				function (err, rows) {
					if (err) {
						reject(err);
					}
					return res.redirect("/login");
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};


module.exports = {
	getPageLogin: getPageLogin,
	handleLogin: handleLogin,
    handleLogout: handleLogout,
	handleDelete: handleDelete,
};
