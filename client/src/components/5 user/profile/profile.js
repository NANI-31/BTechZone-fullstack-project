import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pic from './a.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/states/userSlice';
import { axiosInstance } from '../../utils/axiosConfig';
const CustomDropdown = ({ label, options, selectedValue, onSelect, isOpen, toggleDropdown, icon }) => {
	const handleOptionClick = (option) => {
		onSelect(option);
		toggleDropdown();
	};

	return (
		<div className="profile-user-change-custom-select">
			<div className="profile-user-change-selected-option" onClick={toggleDropdown}>
				{selectedValue}
				<span className="icon">{icon}</span>
			</div>
			{isOpen && (
				<div className="profile-user-change-options">
					{options.map((option) => (
						<div className="profile-user-change-option" key={option} onClick={() => handleOptionClick(option)}>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

function Profile() {
	const userData = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [selectedPhone, setSelectedPhone] = useState(null);
	const [selectedName, setSelectedName] = useState('');
	const [selectedYear, setSelectedYear] = useState('Select Year');
	const [selectedSemester, setSelectedSemester] = useState('Select Semester');
	const [selectedBranch, setSelectedBranch] = useState('Select Branch');
	const [openDropdown, setOpenDropdown] = useState(null);
	const [oemail, setOemail] = useState(userData?.email);
	const [cemail, setCemail] = useState();
	const [opass, setOpass] = useState();
	const [cpass, setCpass] = useState();

	const [modalOpenesame, setModalOpenesame] = useState(false);
	const [modalOpeneexists, setModalOpeneexists] = useState(false);

	const [modalOpenpassoriginal, setModalOpenpassoriginal] = useState(false);
	const [modalOpenpasschange, setModalOpenpasschange] = useState(false);
	const [modalOpenpasssame, setModalOpenpasssame] = useState(false);
	const [modalOpenpassnotmatch, setModalOpenpassnotmatch] = useState(false);

	const [imageFile, setImageFile] = useState('');

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImageFile(file);
		console.log(file);
	};

	const navigate = useNavigate();
	const [inputTypes, setInputTypes] = useState({
		input1: 'password',
		input2: 'password',
	});
	const [iconClass, setIconClass] = useState({
		iname1: 'fa-solid fa-eye-slash',
		iname2: 'fa-solid fa-eye-slash',
	});
	const handleIconClick = (inputKey, iClass) => {
		setInputTypes((prevInputTypes) => ({
			...prevInputTypes,
			[inputKey]: prevInputTypes[inputKey] === 'text' ? 'password' : 'text',
		}));

		setIconClass((prevIconClass) => ({
			...prevIconClass,
			[iClass]: prevIconClass[iClass] === 'fa-solid fa-eye-slash' ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash',
		}));
	};

	const handleYearChange = (year) => {
		setSelectedYear(year);
	};

	const handleSemesterChange = (semester) => {
		setSelectedSemester(semester);
	};

	const handleBranchChange = (branch) => {
		setSelectedBranch(branch);
	};

	const toggleDropdown = (dropdown) => {
		setOpenDropdown((prevDropdown) => (prevDropdown === dropdown ? null : dropdown));
	};
	const [activeTab, setActiveTab] = useState('Personal');

	const handleTabChange = (tabName) => {
		setActiveTab(tabName);
	};

	const imageSrc = userData?.pic;
	// setImageSrc(userData?.pic);
	const profilemailchange = async (e) => {
		e.preventDefault();
		if (oemail === cemail) {
			console.log('both emails are valid');
			openModalemailsame();
		} else {
			try {
				console.log(oemail, cemail);
				const response = await axios.post('http://localhost:5000/profilemailchange', { oemail, cemail });
				if (response.data === 'failemail') {
					console.log('email already exists');
					openModalemailexists();
				} else {
					console.log('success');
					navigate('/pverification', { state: response.data });
				}
			} catch (error) {}
		}
	};
	const profilevalidatePassword = () => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_<])[A-Za-z\d!@#$%^&*()_<]{8,}$/;
		// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_<>?/+-*/`~,.[\]{}\\])[A-Za-z\d!@#$%^&*()_<>?/+-*/`~,.[\]{}\\]{8,}$/;
		if (opass !== cpass) {
			if (passwordRegex.test(opass) && passwordRegex.test(cpass)) {
				return true;
			} else if (!passwordRegex.test(opass)) {
				// alert("The password conatins atleast 8 characters, one lowercase, one uppercase, one number, one special symbol");
				openModalpassoriginal();
			} else if (!passwordRegex.test(cpass)) {
				// alert("The password conatins atleast 8 characters, one lowercase, one uppercase, one number, one special symbol");
				openModalpasschange();
			}
		} else {
			// alert("Password does not match with Confirm Password");
			openModalpasssame();
			return false;
		}
	};
	const profilepasschange = async (e) => {
		e.preventDefault();
		if (profilevalidatePassword()) {
			try {
				console.log(opass, cpass);
				const response = await axios.post('http://localhost:5000/profilepasschange', { opass, cpass, oemail });
				if (response.data === 'password not match') {
					console.log('password not match');
					openModalpassnotmatch();
				} else if (response.data === 'email not exists') {
					console.log('no mail');
				} else {
					console.log(response.data);
					// navigate('/pverification', { state: response.data });
				}
			} catch (error) {}
		}
	};
	const openModalemailsame = () => {
		setModalOpenesame(true);
	};
	const openModalemailexists = () => {
		setModalOpeneexists(true);
	};

	const openModalpassoriginal = () => {
		setModalOpenpassoriginal(true);
	};
	const openModalpasschange = () => {
		setModalOpenpasschange(true);
	};
	const openModalpasssame = () => {
		setModalOpenpasssame(true);
	};
	const openModalpassnotmatch = () => {
		setModalOpenpassnotmatch(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setModalOpenesame(false);
		setModalOpeneexists(false);

		setModalOpenpassoriginal(false);
		setModalOpenpasschange(false);
		setModalOpenpasssame(false);
		setModalOpenpassnotmatch(false);
	};

	// Function to handle clicking outside of the modal
	const handleOutsideClick = (event) => {
		if (event.target === 'myModal') {
			closeModal();
		}
	};
	const profilehandleChange = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', selectedName);
		// formData.append('phoneno', selectedPhone !== '' ? selectedPhone : null);
		formData.append('phoneno', selectedPhone);
		formData.append('year', selectedYear);
		formData.append('semester', selectedSemester);
		formData.append('branch', selectedBranch);
		formData.append('image', imageFile);
		formData.append('email', userData.email);
		formData.append('person', userData.person);
		console.log(userData.email);
		try {
			const response = await axiosInstance.post('/profileChange', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			if (response.data.status === 'success') {
				console.log('success');
				dispatch(setUser(response.data.responseData));
			} else {
				console.log('fail');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="profile-body">
			{/* <Sidebar></Sidebar> */}
			<div className="profile-box">
				<div className="profile-settings-name">
					<h2>Profile Settings</h2>
				</div>
				<div className="profile-nav-links">
					<ul>
						<li className={activeTab === 'Personal' ? 'profile-link profile-active' : 'profile-link'} onClick={() => handleTabChange('Personal')}>
							Personal
						</li>
						<li className={activeTab === 'Change' ? 'profile-link profile-active' : 'profile-link'} onClick={() => handleTabChange('Change')}>
							Change
						</li>
						<li className={activeTab === 'Account' ? 'profile-link profile-active' : 'profile-link'} onClick={() => handleTabChange('Account')}>
							Account
						</li>
						<li className={activeTab === 'Delete' ? 'profile-link profile-active' : 'profile-link'} onClick={() => handleTabChange('Delete')}>
							Delete
						</li>
					</ul>
				</div>

				<div className={activeTab === 'Personal' ? 'profile-values-box pofile-show-active' : 'profile-values-box'}>
					<form>
						<div className="profile-col">
							<div className="profile-col1">
								<div className="profile-input-box b1">
									<input type="text" name="username" readOnly value={userData?.name || ''} />
									<label>Username</label>
									<i className="fa-solid fa-user"></i>
								</div>
								<div className="profile-input-box b1">
									<input type="text" name="username" readOnly value={userData?.email || ''} />
									<label>E-mail</label>
									<i className="fa-solid fa-envelope"></i>
								</div>
								<div className="profile-input-box b1">
									<input type="text" name="username" readOnly value={userData?.phoneNo || ''} />
									<label>Phone</label>
									<i className="fa-solid fa-phone"></i>
								</div>
								<div className="profile-row1">
									{userData?.person === 'student' && (
										<>
											<div className="profile-input-box b1">
												<input type="text" name="username" readOnly value={userData?.year || ''} />
												<label>Year</label>
											</div>
											<div className="profile-input-box b1">
												<input type="text" name="username" readOnly value={userData?.sem || ''} />
												<label>semester</label>
											</div>
										</>
									)}
									<div className="profile-input-box b1">
										<input type="text" name="username" readOnly value={userData?.branch || ''} />
										<label>branch</label>
									</div>
								</div>
							</div>
							<div className="profile-col2">
								<p>profile Pic</p>
								<div className="profile-round">
									<div className="profile-wrapper">{imageSrc && <img src={imageSrc} alt="Image" />}</div>
								</div>
								<p></p>
							</div>
						</div>
					</form>
				</div>
				<div className={activeTab === 'Change' ? 'profile-values-box pofile-show-active' : 'profile-values-box'}>
					<form method="post" onSubmit={profilehandleChange}>
						<div className="profile-col">
							<div className="profile-col1">
								<div className="profile-input-box-change b1">
									<input type="text" name="username" placeholder={userData?.name || ''} onChange={(e) => setSelectedName(e.target.value)} />
									<label>Username</label>
									<i className="fa-solid fa-user"></i>
								</div>
								<div className="profile-input-box-change b1">
									<input type="tel" name="username" placeholder={userData?.phoneNo || ''} onChange={(e) => setSelectedPhone(e.target.value)} />
									<label>Phone No</label>
									<i className="fa-solid fa-phone"></i>
								</div>
								<div className="profile-row1">
									<div className="profile-input-box-change cus b1">
										{userData?.person === 'student' && (
											<>
												<CustomDropdown
													label="Select Year"
													options={['1st Year', '2nd Year', '3rd Year', '4th Year']}
													selectedValue={selectedYear}
													onSelect={handleYearChange}
													isOpen={openDropdown === 'year'}
													toggleDropdown={() => toggleDropdown('year')}
													icon={<i className={`fas ${openDropdown === 'year' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>} // Replace with your desired Font Awesome icon classes
												/>
												<CustomDropdown
													label="Select Semester"
													options={['Semester 1', 'Semester 2']}
													selectedValue={selectedSemester}
													onSelect={handleSemesterChange}
													isOpen={openDropdown === 'semester'}
													toggleDropdown={() => toggleDropdown('semester')}
													icon={<i className={`fas ${openDropdown === 'semester' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>} // Replace with your desired Font Awesome icon classes
												/>
											</>
										)}
										<CustomDropdown
											label="Select Branch"
											options={['CSE', 'ECE', 'IT', 'Mechanical', 'Civil', 'EEE']}
											selectedValue={selectedBranch}
											onSelect={handleBranchChange}
											isOpen={openDropdown === 'branch'}
											toggleDropdown={() => toggleDropdown('branch')}
											icon={<i className={`fas ${openDropdown === 'branch' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>} // Replace with your desired Font Awesome icon classes
										/>
									</div>
								</div>
								{/* =================================================    image     ========================================*/}
							</div>
							<div className="profile-change-col2">
								<div className="profile-change-wrapper">
									<input type="file" accept="image/*" className="my_file" onChange={handleImageChange} />
									{imageSrc && <img src={imageSrc} alt="Image" />}
								</div>
							</div>
						</div>
						<div className="profile-signup-ib1">
							<button className="profile-signup-btn" type="submit" name="submit">
								change
							</button>
						</div>
					</form>
				</div>
				<div className={activeTab === 'Account' ? 'profile-values-box pofile-show-active' : 'profile-values-box'}>
					<div className="profile-account-col">
						<div className="profile-col1">
							<form method="post" onSubmit={profilemailchange}>
								<div className="profile-email-change">
									<div className="profile-input-box-account b1">
										<input type="text" name="username" readOnly value={userData?.email || ''} />
										<label>Email</label>
										<i className="fa-solid fa-envelope"></i>
									</div>
									<div className="profile-input-box-account b1">
										<input type="text" name="username" placeholder="Enter New E-mail" onChange={(e) => setCemail(e.target.value)} />
										<label>Email</label>
										<i className="fa-solid fa-envelope"></i>
									</div>
								</div>
								<div className="profile-signup-ib1">
									<button className="profile-signup-btn" type="submit" name="submit">
										change
									</button>
								</div>
							</form>
							<div id="myModal" className="modal" style={{ display: modalOpenesame ? 'block' : 'none' }} onClick={handleOutsideClick}>
								<div className="modal-content">
									<div className="main-text">
										<p className="heade">Email Error</p>
										<span className="close" onClick={closeModal}>
											&times;
										</span>
									</div>
									<div className="text1">The Email provided by you is same...!</div>
									<div className="text-btns">
										<button className="p" onClick={(e) => closeModal()}>
											OK
										</button>
									</div>
								</div>
							</div>
							<div id="myModal" className="modal" style={{ display: modalOpeneexists ? 'block' : 'none' }} onClick={handleOutsideClick}>
								<div className="modal-content">
									<div className="main-text">
										<p className="heade">Email Error</p>
										<span className="close" onClick={closeModal}>
											&times;
										</span>
									</div>
									<div className="text1">The Email already exists...!</div>
									<div className="text-btns">
										<button className="p" onClick={(e) => closeModal()}>
											OK
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className="profile-col1">
							<form onSubmit={profilepasschange}>
								<div className="profile-password-change">
									<div className="profile-input-box-account b1">
										<input type={inputTypes.input1} name="username" placeholder="Enter old Password" onChange={(e) => setOpass(e.target.value)} />
										<label>Password</label>

										<i className={iconClass.iname1} onClick={() => handleIconClick('input1', 'iname1')} id="eyeicon" style={{ cursor: 'pointer' }}></i>
									</div>
									<div className="profile-input-box-account b1">
										<input type={inputTypes.input2} name="username" placeholder="Enter New Password" onChange={(e) => setCpass(e.target.value)} />
										<label>Password</label>

										<i className={iconClass.iname2} onClick={() => handleIconClick('input2', 'iname2')} id="ceyeicon" style={{ cursor: 'pointer' }}></i>
									</div>
								</div>
								<div className="profile-signup-ib1">
									<button className="profile-signup-btn" type="submit" name="submit">
										change
									</button>
								</div>
							</form>
							<div id="myModal" className="modal" style={{ display: modalOpenpassoriginal ? 'block' : 'none' }} onClick={handleOutsideClick}>
								<div className="modal-content">
									<div className="main-text">
										<p className="heade">Email Error</p>
										<span className="close" onClick={closeModal}>
											&times;
										</span>
									</div>
									<div className="text1">The old password not match atleast 8 characters, one lowercase, one uppercase, one number, one special symbol</div>
									<div className="text-btns">
										<button className="p" onClick={(e) => closeModal()}>
											OK
										</button>
									</div>
								</div>
							</div>
							<div id="myModal" className="modal" style={{ display: modalOpenpasschange ? 'block' : 'none' }} onClick={handleOutsideClick}>
								<div className="modal-content">
									<div className="main-text">
										<p className="heade">Email Error</p>
										<span className="close" onClick={closeModal}>
											&times;
										</span>
									</div>
									<div className="text1">The new password not match atleast 8 characters, one lowercase, one uppercase, one number, one special symbol</div>
									<div className="text-btns">
										<button className="p" onClick={(e) => closeModal()}>
											OK
										</button>
									</div>
								</div>
							</div>
							<div id="myModal" className="modal" style={{ display: modalOpenpassnotmatch ? 'block' : 'none' }} onClick={handleOutsideClick}>
								<div className="modal-content">
									<div className="main-text">
										<p className="heade">Email Error</p>
										<span className="close" onClick={closeModal}>
											&times;
										</span>
									</div>
									<div className="text1">The old password you provided does not match...!</div>
									<div className="text-btns">
										<button className="p" onClick={(e) => closeModal()}>
											OK
										</button>
									</div>
								</div>
							</div>
							<div id="myModal" className="modal" style={{ display: modalOpenpasssame ? 'block' : 'none' }} onClick={handleOutsideClick}>
								<div className="modal-content">
									<div className="main-text">
										<p className="heade">Email Error</p>
										<span className="close" onClick={closeModal}>
											&times;
										</span>
									</div>
									<div className="text1">The old password and the new password are same...!</div>
									<div className="text-btns">
										<button className="p" onClick={(e) => closeModal()}>
											OK
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={activeTab === 'Delete' ? 'profile-values-box pofile-show-active' : 'profile-values-box'}>
					<div className="profile-account-col">
						<div className="profile-col1">
							<form method="post" onSubmit={profilemailchange}>
								<div className="profile-email-change">
									<div className="profile-input-box-account b1">
										<input type="text" name="username" placeholder="Enter E-mail" onChange={(e) => setCemail(e.target.value)} />
										<label>Email</label>
										<i className="fa-solid fa-envelope"></i>
									</div>
								</div>
								<div className="profile-signup-ib1">
									<button className="profile-signup-btn" type="submit" name="submit">
										Delete
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
