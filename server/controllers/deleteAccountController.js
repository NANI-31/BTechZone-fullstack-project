const teachersdetails = require('../schemas/teachers/teachersDetails');
const studentsdetails = require('../schemas/students/studentsDetails');
const { deleteUserFroms3 } = require('../utils/uplod');

exports.deleteAccount = async (req, res) => {
	try {
		const { person, email } = req.body;

		if (!email || !person) {
			return res.status(400).json({ message: 'Email and person type are required' });
		}
		const userModel = person === 'student' ? studentsdetails : teachersdetails;
		const user = await userModel.findOne({ email }).exec();
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		// if (req.body.person === 'student') {
		// 	await studentsdetails.deleteOne({ email: req.body.email });
		// } else if (req.body.person === 'teacher') {
		// 	await teachersdetails.deleteOne({ email: req.body.email });
		// }
		const userId = user.user_id;
		const s3Response = await deleteUserFroms3(userId);

		console.log(s3Response.message || 'S3 deletion completed.');

		await userModel.deleteOne({ email });
		res.status(200).json({ message: 'User account and associated data deleted successfully' });
	} catch (error) {
		console.error('Error deleting account:', error);
		res.status(500).send({ message: 'Error deleting user account', error: error.message });
	}
};
