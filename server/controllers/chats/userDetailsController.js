const teachersdetails = require('../../schemas/teachers/teachersDetails');

const studentsdetails = require('../../schemas/students/studentsDetails');
const { getImageFromS3 } = require('../../utils/uplod');

exports.getUserDetails = async (req, res) => {
	try {
		const { email, person } = req.body;
		const User = person === 'student' ? studentsdetails : teachersdetails;
		const users = await User.find().select('user_id name email pic.pic_name person');
		const userWithImages = await Promise.all(
			users.map(async (user) => {
				console.log('getUserDetails api called');
				const imageData = await getImageFromS3(user.pic.pic_name, user);
				return { ...user.toObject(), image: imageData };
			})
		);
		console.log(userWithImages);
		return res.status(200).json(userWithImages);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
