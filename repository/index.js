var modal = require('../models/index')
var bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
saveUserInformation = (data) => {

	return new Promise((resolve, reject) => {
		modal.user.findAll({ where: { email: data.email } }).then(function (user_result) {
			if (user_result.length > 0) {
				reject({ msg: 'Email already registered' });
			} else {
				var newUser = modal.user.build({
					username: data.username,
					name: data.name,
					email: data.email,
					password: bcrypt.hashSync(data.password, 8),
					is_active: true,
					is_deleted: false
				})
				newUser.save().then(function (newTask) {
					resolve(newTask)
				}).catch(function (err_user) {

					reject(err_user);
				});
			}
		}).catch(function (err_user) {

			// if table is not created so we need to execute this query.
			if (err_user.parent.errno == 1146) {
				// Note: using `force: true` will drop the table if it already exists
				modal.user.sync({ force: true }).then(() => {
					// database store first time
					var newUser = modal.user.build({
						username: data.username,
						name: data.name,
						email: data.email,
						password: data.password,
						is_active: true,
						is_deleted: false
					})
					newUser.save().then(function (newTask) {
						resolve(newTask)
					}).catch(function (err_user) {

						reject(err_user);
					});
				}).catch(function (err_user) {

					reject(err_user);
				});

			} else {
				reject(err_user.parent.errno);
			}
		});
	})
}

getAllUser = (data) => {
	var page_no = parseInt(data.page_no)
	var perPage = 1, page = Math.max(0, page_no - 1);
	var user_id = data.user_id;
	var dataSort;
	
	if (data.sort == 'asc') {
		dataSort = 'ASC'
	} else {
		dataSort = 'DESC'
	}

	var name = data.name;
	var search_con = '';

	if (name != '') {
		search_con = {
			is_deleted: false,
			is_active: true,
			name: {
				[Op.like]: '%' + name + '%'
			}
		}
	} else {
		search_con = { 
			is_deleted: false, 
			is_active: true 
		}
	}
	var offset1 = perPage * page
	// pagination set
	return new Promise((resolve, reject) => {
		// get total user
		modal.user.count({ where: search_con }).then((total_user) => {
			modal.user.findAll({
				where: search_con, offset: offset1, limit: perPage, order: [
					['id', dataSort]]

			}).then((get_user) => {

				resolve(get_user);
			})
				.catch((get_err_user) => {
					console.log(get_err_user);
					reject(get_err_user);
				});
		}).catch((get_err_user) => {
			console.log(get_err_user)
			reject(get_err_user);
		});
	})
}

login = (data) => {

	return new Promise((resolve, reject) => {
		modal.user.findAll({ where: { email: data.email } }).then(function (user_result) {
			resolve(user_result);
		}).catch((get_err_user) => {

			resolve(get_err_user);
		});
	})
}

updateUser = (data) => {
	return new Promise((resolve, reject) => {
		var user_id = data.user_id;

		var updateData = {
			username: data.username,
			name: data.name,
			password: data.password
		}
		console.log('sad', updateData)
		modal.user.update(updateData, { where: { id: user_id } }).then(function (updateUserData) {

			resolve(updateUserData)
		}).catch(function (err_user) {

			reject(err_user);
		});
	})
}
searchFilter = (data) => {

}
userGetById = (data) => {
	var user_id = data.user_id;

	return new Promise((resolve, reject) => {

		modal.user.findAll({
			attributes: [
				'id', 'username', 'name', 'email', 'is_active', 'is_deleted'
			], where: { id: user_id }
		}).then(function (user_result) {

			resolve(user_result);
		}).catch(function (err_user) {

			reject(err_user);
		});
	})
}

module.exports = { saveUserInformation, getAllUser, login, updateUser, searchFilter, userGetById }
