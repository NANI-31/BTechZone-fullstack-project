import React, { useState, useEffect, useRef } from 'react';
import { uploadsubject } from './useruploadsub';


const CustomDropdown = ({ label, options, selectedValue, onSelect, isOpen, toggleDropdown, icon, disabled }) => {
    const dropdownRef = useRef(null);

    const handleOptionClick = (option) => {
        onSelect(option);
        toggleDropdown();
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                toggleDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef, toggleDropdown, isOpen]);

    return (
        <div className="user-upload-custom-select">
            <div className="user-upload-selected-option" onClick={toggleDropdown}>
                {selectedValue}
                <span className="icon">{icon}</span>
            </div>
            {isOpen && (
                <div className="user-upload-options">
                    {options.map((option) => (
                        <div className="user-upload-option" key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Usubject = ({ updateSubjects }) => {

    const [selectedYear, setSelectedYear] = useState('1st Year');
    const [selectedSemester, setSelectedSemester] = useState('Semester 1');
    const [selectedBranch, setSelectedBranch] = useState('CSE');
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleYearChange = (year) => {
        setSelectedYear(year);
        handleButtonsubject(year, selectedSemester, selectedBranch);
    };

    const handleSemesterChange = (semester) => {
        setSelectedSemester(semester);
        handleButtonsubject(selectedYear, semester, selectedBranch);
    };

    const handleBranchChange = (branch) => {
        setSelectedBranch(branch);
        handleButtonsubject(selectedYear, selectedSemester, branch);
    };

    const toggleDropdown = (dropdown) => {
        setOpenDropdown((prevDropdown) => (prevDropdown === dropdown ? null : dropdown));
    };

    const handleButtonsubject = (year, semester, branch) => {
        console.log(year, semester, branch)
        const updatedSubjects = uploadsubject(year, semester, branch);
        updateSubjects({
            updatedSubjects,year, semester, branch
        });
        // console.log(updateSubjects)
        // Send selected values to the server-side logic
        // You can implement your logic for sending data to the server her

    };

    return (
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
                options={selectedYear === '4th Year' ? ['Semester 1'] : ['Semester 1', 'Semester 2']}
                selectedValue={selectedSemester}
                onSelect={handleSemesterChange}
                isOpen={openDropdown === 'semester'}
                toggleDropdown={() => toggleDropdown('semester')}
                icon={<i className={`fas ${openDropdown === 'semester' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>} // Replace with your desired Font Awesome icon classes
            />
            <CustomDropdown
                label="Select Branch"
                options={['CSE', 'ECE', 'IT', 'MECH', 'CIVIL', 'EEE']}
                selectedValue={selectedBranch}
                onSelect={handleBranchChange}
                isOpen={openDropdown === 'branch'}
                toggleDropdown={() => toggleDropdown('branch')}
                icon={<i className={`fas ${openDropdown === 'branch' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>} // Replace with your desired Font Awesome icon classes
            />

        </>
    )
};

export default Usubject;
