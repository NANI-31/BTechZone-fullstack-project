const mongoose = require('mongoose');

const TeachersSchema = new mongoose.Schema({
	id: {
		type: Number,
		unique: true,
		require: true,
	},
	name: String,
	email: String,
	password: String,
	phoneno: Number,
	branch: String,
	person: String,
	pic: Buffer,
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
