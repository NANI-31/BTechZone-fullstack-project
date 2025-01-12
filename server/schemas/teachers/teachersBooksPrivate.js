const { default: mongoose } = require('mongoose');

const FileSchema = new mongoose.Schema({
	year: String,
	semester: String,
	branch: String,
	subject_name: String,
	unit_no: String,
	file_id: { type: String, required: true },
	file_name: { type: String, required: true },
	specified_file_name: { type: String, required: true },
	file: {
		file_url: { type: String, required: true },
		file_temporary: { type: String, required: true },
	},
	image: {
		image_url: { type: String, required: true },
		image_temporary: { type: String, required: true },
	},
	refer: {
		type: Number,
		default: 0,
	},

	uploaded_at: { type: Date, default: Date.now },
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

const teachersBooksPrivateSchema = new mongoose.Schema({
	email: String,
	classified: String,
	refer: Number,
	files: [FileSchema],
});
function getMonthName(month) {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	return months[parseInt(month) - 1];
}

const TeachersBooksPrivateModel = mongoose.model('teachersbooksprivate', teachersBooksPrivateSchema);
module.exports = TeachersBooksPrivateModel;
