const DBConnection = require("../configs/DBConnection");
let LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

let handleLogin = (email, password) => {
	return new Promise(async (resolve, reject) => {
		//check email is exist or not
		let user = await findUserByEmail(email);
		if (user) {
			if (password === user.password) {
				resolve(true);
			} else {
				reject(`The password that you've entered is incorrect`);
			}
		} else {
			reject(`This user email "${email}" doesn't exist`);
		}
	});
};

let findUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		try {
			DBConnection.query(
				`SELECT * FROM users2 WHERE email='${email}'`,
				function (err, rows) {
					if (err) {
						reject(err);
					}
					let user = rows[0];
					resolve(user);
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports = {
	handleLogin: handleLogin,
	findUserByEmail: findUserByEmail,
};
