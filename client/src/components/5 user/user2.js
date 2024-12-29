import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './User.css';
import Select2 from './select2';
import axios from 'axios';
import { generate2 } from './sems2.js';


const defaultCourses = [
    { id: 'p1', icon: 'AI', title: 'Artificial Intelligence' },
    { id: 'p2', icon: 'SPM', title: '. Software Project Management' },
    { id: 'p3', icon: 'DS', title: 'Distributed Systems' },
    { id: 'p4', icon: 'AUP', title: 'Advanced Unix Programming' },
];



const User = () => {
    const [selectedCourse2, setSelectedCourse2] = useState('p1');
    const [courses2, setCourses2] = useState(defaultCourses);
    // const [selectedicon2, setSelectedicon2] = useState('p1');
    const [selectedsubject2, setSelectedsubject2] = useState('');

    const [selectedUnit2, setSelectedUnit2] = useState(1);
    // const [pdfData2, setPdfData2] = useState([]);
    const [selectedYea2, setSelectedYea2] = useState('');
    const [selectedSemeste2, SetSelectedSemeste2] = useState('');
    const [selectedBranc2, setSelectedBranc2] = useState('');

    const [referencesC1, setReferencesC1] = useState([]);
    const [referencesC2, setReferencesC2] = useState([]);
    const [referencesC3, setReferencesC3] = useState([]);
    const [referencesC4, setReferencesC4] = useState([]);


    const [countSem, setCountSem] = useState(2);




    const handleRadioChange2 = (event) => {
        setSelectedCourse2(event.target.id);
        // setSelectedicon2(event.target.icon);

    };

    const handleUnitClick2 = async (courseId, unitNumber) => {
        setSelectedUnit2(unitNumber);

        const sub2 = courses2.find(course => course.id === courseId).title;
        setSelectedsubject2(sub2);
        console.log(sub2, courseId,
            unitNumber, selectedYea2, selectedSemeste2, selectedBranc2);
        try {

            const response = await axios.post('http://localhost:3005/getReferences', {
                year: selectedYea2,
                semester: selectedSemeste2,
                branch: selectedBranc2,
                subject: sub2,
                unit: unitNumber,
                id: courseId,
            });
            const { pdfData } = response.data;

            console.log(courseId)
            switch (courseId) {
                case 'p1':
                    setReferencesC1(pdfData.references);
                    break;
                case 'p2':
                    setReferencesC2(pdfData.references);
                    break;
                case 'p3':
                    setReferencesC3(pdfData.references);
                    break;
                case 'p4':
                    setReferencesC4(pdfData.references);
                    break;
                default:
                    break;
            }

            // Update state with the received PDF data
            // setPdfData2(pdfData.references);



        } catch (error) {
            console.error('Error fetching PDF:', error);
        }

    };
    const handleReferenceClick2 = async (indexvalue) => {
        console.log(selectedUnit2, indexvalue, selectedsubject2);
        try {
            const response = await axios.get(`http://localhost:3005/get-pdf/?year=${selectedYea2}&semester=${selectedSemeste2}&branch=${selectedBranc2}&subject=${selectedsubject2}&unit=${selectedUnit2}&ref=${indexvalue}`, {
                responseType: 'arraybuffer',
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error('Error retrieving PDF:', error);
        }
    };
    const updateCourses = ({ updatedCourses, selectedYear, selectedSemester, selectedBranch }) => {
        setCourses2(updatedCourses);
        setSelectedYea2(selectedYear);
        setSelectedBranc2(selectedBranch);
        SetSelectedSemeste2(selectedSemester);
        setCountSem(1);
    };
    const handlechangeprevious = () => {
        if (countSem === 2 && selectedYea2 === '4th Year') {
            const selectedNumber = 1
            setCountSem(1)
            const previousupdatedCourses = generate2(selectedYea2, selectedSemeste2, selectedBranc2, selectedNumber);
            setCourses2(previousupdatedCourses);
        }
        else if (countSem === 3 && selectedYea2 === '4th Year') {
            const selectedNumber = 2
            setCountSem(2)
            const previousupdatedCourses = generate2(selectedYea2, selectedSemeste2, selectedBranc2, selectedNumber);
            setCourses2(previousupdatedCourses);
        }
    }

    const handlechangenext = () => {
        if (countSem === 1 && selectedYea2 === '4th Year') {
            const selectedNumber = 2
            setCountSem(2)
            const nextupdatedCourses = generate2(selectedYea2, selectedSemeste2, selectedBranc2, selectedNumber);
            setCourses2(nextupdatedCourses);
        }
        else if (countSem === 2 && selectedYea2 === '4th Year') {
            const selectedNumber = 3
            setCountSem(3)
            const nextupdatedCourses = generate2(selectedYea2, selectedSemeste2, selectedBranc2, selectedNumber);
            setCourses2(nextupdatedCourses);
        }


    }



    return (
        <div>
            <div className="user2-change-wrapper">
                <Select2 updateCourses={updateCourses} />

                <div className="user2-change-container">
                    <div className='previous-round' onClick={handlechangeprevious} >
                        <div className='previous-round-shape'>
                            <i className="fa-solid fa-arrow-left"></i>
                        </div>
                    </div>
                    {courses2.map(course => (
                        <React.Fragment key={course.id}>
                            <input
                                type="radio"
                                name="slide2"
                                id={course.id}
                                checked={selectedCourse2 === course.id}
                                onChange={handleRadioChange2}
                            />
                            <label htmlFor={course.id} className="user2-change-card">
                                <div className='user2-change-ll'>
                                    <div className="user2-change-row">
                                        <div className="user2-change-subject-icon">{course.icon}</div>
                                        <div className="user2-change-subject-description">
                                            <Link className='user2-change-subject-title'>{course.title}</Link>
                                        </div>
                                    </div>
                                    <div className='user2-change-subjectlist'>
                                        <div className='user2-change-sub-box1'>
                                            <nav className='user2-change-list-nav'>
                                                <ul className='user2-change-unit-list'>
                                                    {[1, 2, 3, 4, 5].map(unit => (
                                                        <li key={unit} onClick={() => handleUnitClick2(course.id, unit)}>UNIT-{unit}</li>
                                                    ))}
                                                </ul>
                                            </nav>
                                        </div>
                                        <div className='user2-change-sub-box2'>
                                            <nav className='user2-change-ref-nav'>
                                                <ul className='user2-change-ref-list'>
                                                    {(() => {
                                                        switch (course.id) {
                                                            case 'p1':
                                                                return referencesC1.map((reference, index) => (
                                                                    <li key={index} onClick={() => handleReferenceClick2(index + 1)}>
                                                                        {`REFERENCE-${index + 1}`}
                                                                    </li>
                                                                ));
                                                            case 'p2':
                                                                return referencesC2.map((reference, index) => (
                                                                    <li key={index} onClick={() => handleReferenceClick2(index + 1)}>
                                                                        {`REFERENCE-${index + 1}`}
                                                                    </li>
                                                                ));
                                                            case 'p3':
                                                                return referencesC3.map((reference, index) => (
                                                                    <li key={index} onClick={() => handleReferenceClick2(index + 1)}>
                                                                        {`REFERENCE-${index + 1}`}
                                                                    </li>
                                                                ));
                                                            case 'p4':
                                                                return referencesC4.map((reference, index) => (
                                                                    <li key={index} onClick={() => handleReferenceClick2(index + 1)}>
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
                    <div className='next-round2' onClick={handlechangenext}>
                        <div className='next-round-shape2'>
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};
export default User;