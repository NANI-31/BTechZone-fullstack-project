const mongoose = require('mongoose');

const TeachersSchema = new mongoose.Schema({
	id: {
		type: Number,
		unique: true,
		require: true,
	},
	user_id: String,
	name: String,
	email: String,
	password: String,
	phoneno: Number,
	branch: String,
	person: String,

	refreshToken: String, //9985967614 rajini
	pic: {
		pic_url: String,
		pic_name: String,
		pic_temporary: String,
	},
	contentType: String,
	uploads: {
		type: Number,
		default: 0,
	},

	createdAt: {
		date: {
			type: String,
			default: () => {
				const currentDate = new Date();
				const addZero = (num) => (num < 10 ? `0${num}` : num);
				const day = addZero(currentDate.getDate());
				const month = addZero(currentDate.getMonth() + 1);
				const year = currentDate.getFullYear();
				const formattedDate = `${day}-${month}-${year} || ${day} ${getMonthName(month)} ${year}`;
				return `${formattedDate}`;
			},
		},

		time: {
			type: String,
			default: () => {
				const currentDate = new Date();
				const addZero = (num) => (num < 10 ? `0${num}` : num);
				const get12HourTime = (hours) => {
					const ampm = hours >= 12 ? 'PM' : 'AM';
					const formattedHours = hours % 12 || 12;
					return `${addZero(formattedHours)}:${addZero(currentDate.getMinutes())}:${addZero(currentDate.getSeconds())} ${ampm}`;
				};
				const formattedTime = get12HourTime(currentDate.getHours());
				return `${formattedTime}`;
			},
		},
	},
});
// Helper function to get month name
function getMonthName(month) {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	return months[parseInt(month) - 1];
}

const teachersModel = mongoose.model('teachersdetails', TeachersSchema);
module.exports = teachersModel;
