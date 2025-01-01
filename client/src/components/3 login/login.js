import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { axiosInstance, axiosConfig } from '../utils/axiosConfig';
import useSetCookie from '../actions/setCookie';
import { setUser } from '../redux/slices/states/userSlice';
import { useDispatch } from 'react-redux';

// import './components/3 login/login.css';

function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [modalOpene, setModalOpene] = useState(false);
	const [modalOpenp, setModalOpenp] = useState(false);
	const { setCustomeCookie } = useSetCookie();
	const navigate = useNavigate();
	const [inputTypes, setInputTypes] = useState({
		input1: 'password',
	});
	const [iconClass, setIconClass] = useState({
		iname1: 'fa-solid fa-eye-slash',
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

	const handleloginsubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post('login', { email, password });
			console.log(response.data);
			if (response.data === 'Incorrect password') {
				openModalp();
			} else if (response.data === 'User not registered') {
				openModale();
			} else {
				sessionStorage.setItem('userdata', JSON.stringify(response.data));
				setCustomeCookie('userToken', response.data.token);
				console.log(JSON.parse(sessionStorage.getItem('userdata')));
				navigate('/user');
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};
	const openModale = () => {
		setModalOpene(true);
	};
	const openModalp = () => {
		setModalOpenp(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setModalOpene(false);
		setModalOpenp(false);
	};

	// Function to handle clicking outside of the modal
	const handleOutsideClick = (event) => {
		if (event.target === 'myModal') {
			closeModal();
		}
	};
	return (
		<div className="login-body">
			<div id="login-wrapper">
				<div className="login-form-box login" id="fls">
					<div id="login-log-in">
						<h2 className="login-h2">LOGIN</h2>
						<form method="post" onSubmit={handleloginsubmit}>
							<div className="login-input-box">
								<input type="email" required name="email" autoComplete="on" onChange={(e) => setEmail(e.target.value)} />
								<label>Email</label>
								<i className="fa-solid fa-user"></i>
							</div>

							<div className="login-input-box">
								<input type={inputTypes.input1} required id="log-in_password" name="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
								<label>Password</label>
								<i className={iconClass.iname1} onClick={() => handleIconClick('input1', 'iname1')} id="eyeicon" style={{ cursor: 'pointer' }}></i>
							</div>

							<button className="login-btn b2" type="submit" name="login">
								Login
							</button>

							<div className="login-logreg-link">
								<p>
									Need an account?
									<Link to="/select-signup" className="login-register-link">
										Sign Up
									</Link>
									<br />
									<br />
									Forgot Email <Link className="login-register-link">Click Here</Link>
									<br />
									Forgot password<Link className="login-register-link">Click Here</Link>
								</p>
								<br />
								<p>
									<Link to="/" className="login-register-link">
										Back to Home
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
				<div>
					<div id="myModal" className="modal" style={{ display: modalOpene ? 'block' : 'none' }} onClick={handleOutsideClick}>
						<div className="modal-content">
							<div className="main-text">
								<p className="heade">Login Error</p>
								<span className="close" onClick={closeModal}>
									&times;
								</span>
							</div>
							<div className="text1">Invalid Email..!</div>
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
								<p className="heade">Login Error</p>
								<span className="close" onClick={closeModal}>
									&times;
								</span>
							</div>
							<div className="text1">Password does not match...!</div>
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

export default Login;
