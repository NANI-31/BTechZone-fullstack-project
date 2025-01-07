import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signup.css';
import axios from '../utils/axiosConfig';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const CustomDropdown = ({ label, options, selectedValue, onSelect, isOpen, toggleDropdown, icon }) => {
	const handleOptionClick = (option) => {
		onSelect(option);
		toggleDropdown();
	};

	return (
		<div className="signup-user-change-custom-select">
			<div className="signup-user-change-selected-option" onClick={toggleDropdown}>
				{selectedValue}
				<span className="icon">{icon}</span>
			</div>
			{isOpen && (
				<div className="signup-user-change-options">
					{options.map((option) => (
						<div className="signup-user-change-option" key={option} onClick={() => handleOptionClick(option)}>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

function TSignup() {
	const [selectedBranch, setSelectedBranch] = useState('Select Branch');
	const [openDropdown, setOpenDropdown] = useState(null);
	const [modalOpene, setModalOpene] = useState(false);
	const [modalOpenn, setModalOpenn] = useState(false);
	const [modalOpenp, setModalOpenp] = useState(false);
	const [modalOpenpp, setModalOpenpp] = useState(false);

	const handleBranchChange = (branch) => {
		setSelectedBranch(branch);
	};
	const toggleDropdown = (dropdown) => {
		setOpenDropdown((prevDropdown) => (prevDropdown === dropdown ? null : dropdown));
	};
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [phoneno, setPhoneno] = useState();
	const [confirmpassword, setConfirmpassword] = useState();
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
	const ValidateEmail = () => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (emailRegex.test(email)) {
			return true;
		} else {
			alert('"Please enter a valid Email address"');
			openModale();
			return false;
		}
	};

	const validatePassword = () => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_<])[A-Za-z\d!@#$%^&*()_<]{8,}$/;
		// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_<>?/+-*/`~,.[\]{}\\])[A-Za-z\d!@#$%^&*()_<>?/+-*/`~,.[\]{}\\]{8,}$/;
		if (password === confirmpassword) {
			if (passwordRegex.test(password)) {
				return true;
			} else {
				// alert("The password conatins atleast 8 characters, one lowercase, one uppercase, one number, one special symbol");
				openModalp();
			}
		} else {
			// alert("Password does not match with Confirm Password");
			openModalpp();
		}
		return password === confirmpassword && passwordRegex.test(password);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const branch = selectedBranch;
		const person = 'teacher';
		try {
			console.log('teachet signup client: ', name, email, password, phoneno, branch);
			const response = await axios.post('register/signup', { name, email, password, phoneno, branch, person });
			console.log(response.data, 'signup clinet');
			navigate('/tverification', { state: response.data });
			// navigate('/tverification');

			// if (ValidateEmail() && validatePassword()) {
			//     const response = await axios.post('http://localhost:5000/signup', { name, email, password, phoneno, selectedYear, selectedSemester, selectedBranch })
			//     console.log(response.data);
			//     if (response.data === "email fail") {
			//         console.log("email already exists");
			//         openModale();
			//     } else if (response.data === "name fail") {
			//         console.log("name already exists");
			//         openModaln();

			//     } else {

			//     }
			// }
		} catch (error) {
			console.error('Error fetching user data:', error);
		}

		// } else {

		//     console.error('Invalid password or passwords do not match');
		// }
	};
	const openModale = () => {
		setModalOpene(true);
	};
	const openModaln = () => {
		setModalOpenn(true);
	};
	const openModalp = () => {
		setModalOpenp(true);
	};
	const openModalpp = () => {
		setModalOpenpp(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setModalOpene(false);
		setModalOpenn(false);
		setModalOpenpp(false);
		setModalOpenp(false);
	};

	// Function to handle clicking outside of the modal
	const handleOutsideClick = (event) => {
		if (event.target === 'myModal') {
			closeModal();
		}
	};
	return (
		<div className="signup-body">
			<div id="signup-center">
				<div className="signup-form-box signup-login">
					<div id="sign-up">
						<h2 className="signup-h2">
							<span className="signup-multiple-text">Sign Up</span>
						</h2>
						<form name="signup" method="post" className="signup-form" onSubmit={handleSubmit}>
							{/* <!----------------------------------user anme    onsubmit="return checkpass();"------------------------------------> */}
							<div className="signup-input-box b1">
								<input type="text" name="username" id="username" autoComplete="off" onChange={(e) => setName(e.target.value)} />
								<label>Username</label>
								<i className="fa-solid fa-user"></i>
							</div>

							{/* <!---------------------------------- email ------------------------------------> */}

							<div className="signup-input-box b2">
								<input type="email" required name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
								<label>E-mail</label>
								<i className="fa-solid fa-envelope" autoComplete="off"></i>
							</div>

							{/* <!---------------------------------- phone ------------------------------------> */}

							<div className="signup-input-box b3">
								<input type="tel" name="phoneno" maxLength="10" id="phoneno" autoComplete="off" onChange={(e) => setPhoneno(e.target.value)} />
								<label>Phone No</label>
								<i className="fa-solid fa-phone"></i>
							</div>

							{/* <!---------------------------------- date ------------------------------------> */}

							<div className="signup-input-box b4">
								<input type="date" name="BOD" id="BOD" autoComplete="off" />
								<label>Birth Date</label>
								<i className="fa-regular fa-calendar"></i>
							</div>

							<div className="signup-input-box bbbb">
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
							{/* <!---------------------------------- pass1 ------------------------------------> */}

							<div className="signup-input-box b5">
								<input type={inputTypes.input1} required id="password" name="password1" autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
								<label>password</label>

								<i className={iconClass.iname1} onClick={() => handleIconClick('input1', 'iname1')} id="eyeicon" style={{ cursor: 'pointer' }}></i>
							</div>

							{/* <!--------------------------------- pass2------------------------------------> */}

							<div className="signup-input-box b6">
								<input type={inputTypes.input2} id="cpassword" name="password2" autoComplete="off" onChange={(e) => setConfirmpassword(e.target.value)} />

								<label className=".q">confirm password</label>

								<i className={iconClass.iname2} onClick={() => handleIconClick('input2', 'iname2')} id="ceyeicon" style={{ cursor: 'pointer' }}></i>
							</div>

							{/* <!---------------------------------- buttons ------------------------------------> */}

							<div className="signup-input-box signup-ib1">
								<button className="signup-btn" type="submit" name="submit">
									Sign Up
								</button>
								<div className="signup-logreg-link">
									<p>
										Already have an account?{' '}
										<Link to="/login" className="register-link">
											Sign in
										</Link>
									</p>
									<p>
										<Link to="/" className="register-link">
											Back to Home
										</Link>
									</p>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div>
					<div id="myModal" className="modal" style={{ display: modalOpene ? 'block' : 'none' }} onClick={handleOutsideClick}>
						<div className="modal-content">
							<div className="main-text">
								<p className="heade">SignUp Error</p>
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
					<div id="myModal" className="modal" style={{ display: modalOpenn ? 'block' : 'none' }} onClick={handleOutsideClick}>
						<div className="modal-content">
							<div className="main-text">
								<p className="heade">SignUp Error</p>
								<span className="close" onClick={closeModal}>
									&times;
								</span>
							</div>
							<div className="text1">User name already exits. Name the unique one</div>
							<div className="text-btns">
								<button className="p" onClick={(e) => closeModal()}>
									OK
								</button>
							</div>
						</div>
					</div>
					<div id="myModal" className="modal" style={{ display: modalOpenp ? 'block' : 'none' }} onClick={handleOutsideClick}>
						<div className="modal-content">
							<div className="main-text">
								<p className="heade">SignUp Error</p>
								<span className="close" onClick={closeModal}>
									&times;
								</span>
							</div>
							<div className="text1">The password conatins atleast 8 characters, one lowercase, one uppercase, one number, one special symbol</div>
							<div className="text-btns">
								<button className="p" onClick={(e) => closeModal()}>
									OK
								</button>
							</div>
						</div>
					</div>
					<div id="myModal" className="modal" style={{ display: modalOpenpp ? 'block' : 'none' }} onClick={handleOutsideClick}>
						<div className="modal-content">
							<div className="main-text">
								<p className="heade">SignUp Error</p>
								<span className="close" onClick={closeModal}>
									&times;
								</span>
							</div>
							<div className="text1">Password and confirm password does not match..!</div>
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
	);
}

export default TSignup;
