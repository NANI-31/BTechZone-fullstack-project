const { getUserDetailsFromToken } = require('../helpers/getUserDetailsFromToken');
const UserModel = require('../schemas/chatting/UserModel');

exports.updateUserDetails = async (req, res) => {
	try {
		const token = req.cookies.token || '';
		const user = await getUserDetailsFromToken(token);
		// if (!user) {
		//     return res.status(400).json({
		//         message: 'user not exist',
		//         error: true,
		//     });
		// }

		const { name, profile_pic } = req.body;
		// const updatedUser = await UserModel.findOneAndUpdate(
		//     { _id: user._id },
		//     { name, email, profile_pic },
		//     { new: true }
		// );

		const updatedUser = await UserModel.updateOne(
			{ _id: user._id },
			{
				name,
				profile_pic,
			}
		);
		const userInformation = await UserModel.findById(user._id);
		return res.status(200).json({
			message: 'User updated successfully',
			data: userInformation,
			success: true,
		});
	} catch (error) {
		console.error('Error updating user details:', error);
		res.status(500).json({
			message: error.message,
			error: true,
		});
	}
};
