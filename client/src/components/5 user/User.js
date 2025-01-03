import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosConfig';
import { useGlobalContext } from '../../context/GlobalProvider';

import './User.css';
import User2 from './user2';
import Select from './select';

const defaultCourses = [
	{ id: 'c1', icon: 'ENG', title: 'ENGLISH' },
	{ id: 'c2', icon: 'M1', title: 'Mathematics - I' },
	{ id: 'c3', icon: 'PHY', title: 'Applied Physics' },
	{ id: 'c4', icon: 'C', title: 'Programming for Problem Solving using C' },
	{ id: 'c5', icon: 'CEW', title: 'Computer Engineering Workshop' },
];

const User = () => {
	const { name, mail, pic, phoneNo, year, branch, semester, person, token } = useGlobalContext();
	const navigate = useNavigate();
	// const check = async () => {
	// 	try {
	// 		const response = await axiosInstance.get('home');
	// 		// console.log(response.data);
	// 		if (response.data.message !== 'Success') {
	// 			navigate('/login');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching user data:', error);
	// 		navigate('/login');
	// 	}
	// };

	// useEffect(() => {
	// 	check();
	// }, [navigate]);

	const location = useLocation();
	const data = location.state;

	const [selectedCourse1, setSelectedCourse1] = useState('c1');
	const [courses1, setCourses1] = useState(defaultCourses);
	// const [selectedicon1, setSelectedicon1] = useState('c1');
	const [selectedsubject1, setSelectedsubject1] = useState('ENGLISH');

	const [selectedUnit1, setSelectedUnit1] = useState(1);
	// const [pdfData1, setPdfData1] = useState([]);
	const [selectedYea1, setSelectedYea1] = useState('1st Year');
	const [selectedSemeste1, SetSelectedSemeste1] = useState('Semester 1');
	const [selectedBranc1, setSelectedBranc1] = useState('CSE');

	const [referencesC1, setReferencesC1] = useState([]);
	const [referencesC2, setReferencesC2] = useState([]);
	const [referencesC3, setReferencesC3] = useState([]);
	const [referencesC4, setReferencesC4] = useState([]);
	const [referencesC5, setReferencesC5] = useState([]);

	const handleRadioChange1 = (event) => {
		setSelectedCourse1(event.target.id);
		// setSelectedicon1(event.target.icon);
	};

	const handleUnitClick1 = async (courseId, unitNumber) => {
		setSelectedUnit1(unitNumber);

		const sub1 = courses1.find((course) => course.id === courseId).title;
		setSelectedsubject1(sub1);
		console.log(sub1, courseId, unitNumber, selectedYea1, selectedSemeste1, selectedBranc1);
		try {
			const response = await axiosInstance.post('getReferences', {
				year: selectedYea1,
				semester: selectedSemeste1,
				branch: selectedBranc1,
				subject: sub1,
				unit: unitNumber,
				id: courseId,
			});
			const { pdfData } = response.data;

			console.log(courseId);
			switch (courseId) {
				case 'c1':
					setReferencesC1(pdfData.references);
					break;
				case 'c2':
					setReferencesC2(pdfData.references);
					break;
				case 'c3':
					setReferencesC3(pdfData.references);
					break;
				case 'c4':
					setReferencesC4(pdfData.references);
					break;
				case 'c5':
					setReferencesC5(pdfData.references);
					break;
				default:
					break;
			}

			// Update state with the received PDF data
			// setPdfData1(pdfData.references);
		} catch (error) {
			console.error('Error fetching PDF:', error);
		}
	};
	const handleReferenceClick1 = async (indexvalue) => {
		console.log(selectedYea1, selectedSemeste1, selectedBranc1, selectedsubject1, selectedUnit1, indexvalue);
		try {
			const response = await axiosInstance.get(
				`http://localhost:5000/get-pdf/?year=${selectedYea1}&semester=${selectedSemeste1}&branch=${selectedBranc1}&subject=${selectedsubject1}&unit=${selectedUnit1}&ref=${indexvalue}`,
				{
					responseType: 'arraybuffer',
				}
			);

			const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
			const pdfUrl = URL.createObjectURL(pdfBlob);

			window.open(pdfUrl, '_blank');
		} catch (error) {
			console.error('Error retrieving PDF:', error);
		}
	};
	const updateCourses = ({ updatedCourses, selectedYear, selectedSemester, selectedBranch }) => {
		setCourses1(updatedCourses);
		setSelectedYea1(selectedYear);
		setSelectedBranc1(selectedBranch);
		SetSelectedSemeste1(selectedSemester);
	};

	return (
		<div className="user-body">
			<div className="section-1">
				<div className="user-change-wrapper">
					<Select updateCourses={updateCourses} />
					<div className="user-change-container">
						{courses1.map((course) => (
							<React.Fragment key={course.id}>
								<input type="radio" name="slide1" id={course.id} checked={selectedCourse1 === course.id} onChange={handleRadioChange1} />
								<label htmlFor={course.id} className="user-change-card">
									<div className="user-change-ll">
										<div className="user-change-row">
											<div className="user-change-subject-icon">{course.icon}</div>
											<div className="user-change-subject-description">
												<Link className="user-change-subject-title">{course.title}</Link>
											</div>
										</div>
										<div className="user-change-subjectlist">
											<div className="user-change-sub-box1">
												<nav className="user-change-list-nav">
													<ul className="user-change-unit-list">
														{[1, 2, 3, 4, 5].map((unit) => (
															<li key={unit} onClick={() => handleUnitClick1(course.id, unit)}>
																UNIT-{unit}
															</li>
														))}
													</ul>
												</nav>
											</div>
											<div className="user-change-sub-box2">
												<nav className="user-change-ref-nav">
													<ul className="user-change-ref-list">
														{(() => {
															switch (course.id) {
																case 'c1':
																	return referencesC1.map((reference, index) => (
																		<li key={index} onClick={() => handleReferenceClick1(index + 1)}>
																			{`REFERENCE-${index + 1}`}
																		</li>
																	));
																case 'c2':
																	return referencesC2.map((reference, index) => (
																		<li key={index} onClick={() => handleReferenceClick1(index + 1)}>
																			{`REFERENCE-${index + 1}`}
																		</li>
																	));
																case 'c3':
																	return referencesC3.map((reference, index) => (
																		<li key={index} onClick={() => handleReferenceClick1(index + 1)}>
																			{`REFERENCE-${index + 1}`}
																		</li>
																	));
																case 'c4':
																	return referencesC4.map((reference, index) => (
																		<li key={index} onClick={() => handleReferenceClick1(index + 1)}>
																			{`REFERENCE-${index + 1}`}
																		</li>
																	));
																case 'c5':
																	return referencesC5.map((reference, index) => (
																		<li key={index} onClick={() => handleReferenceClick1(index + 1)}>
																			{`REFERENCE-${index + 1}`}
																		</li>
																	));
																default:
																	return null;
															}
														})()}
													</ul>
												</nav>
											</div>
										</div>
									</div>
								</label>
							</React.Fragment>
						))}
					</div>
				</div>
			</div>
			<div className="section-2">
				<User2 />
			</div>
		</div>
	);
};
export default User;
