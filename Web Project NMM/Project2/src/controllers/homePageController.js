let LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
const loginService = require("../services/loginService");
const { findUserByEmail } = require("../services/loginService");

let handleHelloWorld = async (req, res) => {
	// GET USER DATA
	let userdata;
	try {
		let user = localStorage.getItem("user");
		user = JSON.parse(user);
		await loginService.handleLogin(user.email, user.password);
		userdata = await findUserByEmail(user.email);
	} catch (err) {
		return res.redirect("/login");
	}
	return res.render("homepage.ejs", {
		user: userdata,
	});
};

module.exports = {
	handleHelloWorld: handleHelloWorld,
};
