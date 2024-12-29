import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import './pverification.css'
function Pverification() {
    const [values, setValues] = useState(['', '', '', '', '', '']);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));
    const backspaceRef = useRef(false);
    const navigate = useNavigate()
    const location = useLocation();
    const data = location.state;
    const { oemail, cemail, randomCode } = data;
    
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

    const handleSubmitprofile = async(e) => {
        e.preventDefault()
        try {
            const otpcode = values.join('');
            console.log(randomCode)
            const response = await axios.post('http://localhost:5000/pmailverification', { otpcode, oemail, cemail, randomCode})
            if(response.data === "codefail"){
                console.log("code not match")
            }
            else{
                navigate('/profile', { state: response.data })

            }
        } catch (error) {
            console.log(error);
            alert('change email is Fail: ' + error.response.data)

        }
    }





    return (
        <div className='verification-body'>
            <div id="verification-wrapper">
                <div className="verification-form-box login" id="fls">
                    <h2 className="verification-h2">
                        <span className="multiple-text">Verification</span>
                    </h2>
                    <div id="verification-log-in">
                        <h4 className='verification-h4'>Enter OTP Code</h4>
                        <form method="post" onSubmit={handleSubmitprofile} className='verification-form'>
                            <div className="verification-input-box">
                                {values.map((value, index) => (
                                    <input
                                        key={index}
                                        type="number"
                                        ref={inputRefs.current[index]}
                                        value={value}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        autoComplete="off"
                                        className={
                                            index === focusedIndex && (!isFormValid || focusedIndex === values.length - 1)
                                                ? 'verification-focused'
                                                : ''
                                        }
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

export default Pverification;