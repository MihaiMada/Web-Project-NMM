const DBConnection = require("./../configs/DBConnection");

let createNewUser = (data) => {
	return new Promise(async (resolve, reject) => {
		// check email is exist or not
		let isEmailExist = await checkExistEmail(data.email);
		if (isEmailExist) {
			reject(
				`This email "${data.email}" has already exist. Please choose an other email`
			);
		} else {
			let userItem = {
				fullname: data.fullname,
				email: data.email,
				password: data.password,
			};
			//create a new account
			DBConnection.query(
				`INSERT INTO users2(fullname, email, password)VALUES('${userItem.fullname}', '${userItem.email}', '${userItem.password}')`,
				function (err, rows) {
					if (err) {
						reject(false);
						console.log(err);
					}
					resolve("Create a new user successful");
				}
			);
		}
	});
};

let checkExistEmail = (email) => {
	return new Promise((resolve, reject) => {
		try {
			DBConnection.query(
				" SELECT * FROM `users2` WHERE `email` = ?  ",
				email,
				function (err, rows) {
					if (err) {
						reject(err);
					}
					if (rows.length > 0) {
						resolve(true);
					} else {
						resolve(false);
					}
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};
module.exports = {
	createNewUser: createNewUser,
};
