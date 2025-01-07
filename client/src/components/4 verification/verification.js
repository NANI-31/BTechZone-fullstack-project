import React, { useEffect, useRef, useState } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import './verification.css';
function Verification() {
	const [values, setValues] = useState(['', '', '', '', '', '']);
	const [focusedIndex, setFocusedIndex] = useState(0);
	const [isFormValid, setIsFormValid] = useState(false);
	const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));
	const backspaceRef = useRef(false);
	const navigate = useNavigate();
	const location = useLocation();
	const data = location.state;
	const { name, email, password, phoneno, selectedYear, selectedSemester, selectedBranch, person, randomCode } = data;
	useEffect(() => {
		// Focus the first input field when the component mounts
		if (inputRefs.current[0] && inputRefs.current[0].current) {
			inputRefs.current[0].current.focus();
			// inputRefs.current[0].current.classList.add('focused');
		}
	}, []);

	useEffect(() => {
		// Check for backspace and update focus accordingly
		if (backspaceRef.current) {
			inputRefs.current[focusedIndex].current.focus();
			backspaceRef.current = false;
		} else {
			// Move focus to the next input field

			inputRefs.current[focusedIndex].current.focus();
		}
	}, [focusedIndex]);

	const handleInputChange = (index, value) => {
		if (!isNaN(value) && value !== '') {
			// Allow only single-digit numbers
			value = String(value).charAt(0);
		}

		const newValues = [...values];

		// Move focus to the previous input and clear its value if backspace is pressed
		if (value === '') {
			setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
			backspaceRef.current = true;
			newValues[focusedIndex] = ''; // Clear the value after updating the focusedIndex
		} else {
			// Move focus to the next input field
			setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, 5));

			// If the last input is filled, create a new input field
			if (focusedIndex === 4 && value !== '') {
				setValues([...newValues, '']);
			}
		}

		// Update the values array
		newValues[index] = value;

		// Set focus to the input field
		inputRefs.current[index].current.focus();

		// Check if all fields are filled to enable the submit button
		setIsFormValid(newValues.every((val) => val !== ''));

		// Update the state with the new values
		setValues(newValues);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const otpcode = values.join('');
			console.log(person);
			await axios.post('register/verification', { otpcode, name, email, password, phoneno, selectedYear, selectedSemester, selectedBranch, person, randomCode }).then((response) => {
				// const studentsDetails = response.data;
				// console.log(studentsDetails.email);
				navigate('/login', { state: response.data.email });
			});
		} catch (error) {
			console.log(error);
			alert('Verification Fail: ' + error.response.data);
		}
	};

	return (
		<div className="verification-body">
			<div id="verification-wrapper">
				<div className="verification-form-box login" id="fls">
					<h2 className="verification-h2">
						<span className="multiple-text">Verification</span>
					</h2>
					<div id="verification-log-in">
						<h4 className="verification-h4">Enter OTP Code</h4>
						<form method="post" onSubmit={handleSubmit} className="verification-form">
							<div className="verification-input-box">
								{values.map((value, index) => (
									<input
										key={index}
										type="number"
										ref={inputRefs.current[index]}
										value={value}
										onChange={(e) => handleInputChange(index, e.target.value)}
										autoComplete="off"
										className={index === focusedIndex && (!isFormValid || focusedIndex === values.length - 1) ? 'verification-focused' : ''}
										maxLength="1"
									/>
								))}
							</div>
							<button
								type="submit"
								name="login"
								className={isFormValid ? 'verification-active verification-btn b2' : 'verification-btn b2'}
								disabled={!isFormValid}
								// Add your verification function here
							>
								Verify OTP
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Verification;
