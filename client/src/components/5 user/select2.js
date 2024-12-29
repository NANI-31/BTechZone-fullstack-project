import React, { useState, useEffect, useRef } from 'react';
import { generate2 } from './sems2.js';

const CustomDropdown = ({ label, options, selectedValue, onSelect, isOpen, toggleDropdown, icon, disabled}) => {
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
        <div ref={dropdownRef} className={`user-change-custom-select ${isOpen ? 'open' : ''}`}>
            <div className="user-change-selected-option" onClick={toggleDropdown}>
                {selectedValue}
                <span className="user-change-iconn">{icon}</span>
            </div>
            {isOpen && (
                <div className="user-change-options">
                    {options.map((option) => (
                        <div 
                        className={`user-change-option ${disabled ? 'disabled' : ''}`}
                        key={option}
                        onClick={() => !disabled && handleOptionClick(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Select2 = ({ updateCourses }) => {

    const [selectedYear, setSelectedYear] = useState('3rd Year');
    const [selectedSemester, setSelectedSemester] = useState('Semester 1');
    const [selectedBranch, setSelectedBranch] = useState('CSE');
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleYearChange = (year) => {
        setSelectedYear(year);
        // Resetting Semester selection if 4th year is selected
        if (year === '4th Year' && selectedSemester === 'Semester 2') {
            setSelectedSemester('Semester 1');
        }
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

    const handleButtonClick = () => {
        const click = 0
        const updatedCourses = generate2(selectedYear, selectedSemester, selectedBranch, click);
        updateCourses({
            updatedCourses,
            selectedYear,
            selectedSemester,
            selectedBranch,
          });
        // Send selected values to the server-side logic
        // You can implement your logic for sending data to the server here
        console.log('Sending to server:', selectedYear, selectedSemester, selectedBranch);
        
    };

    return (
        <>
            <div className='user-change-s-menu'>
                <CustomDropdown
                    label="1st Year"
                    options={['3rd Year', '4th Year']}
                    selectedValue={selectedYear}
                    onSelect={handleYearChange}
                    isOpen={openDropdown === 'year'}
                    toggleDropdown={() => toggleDropdown('year')}
                    icon={<i className={`fas ${openDropdown === 'year' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>} // Replace with your desired Font Awesome icon classes
                />
                <CustomDropdown
                    label="Semester"
                    options={selectedYear === '4th Year' ? ['Semester 1'] : ['Semester 1', 'Semester 2']}
                    selectedValue={selectedSemester}
                    onSelect={handleSemesterChange}
                    isOpen={openDropdown === 'semester'}
                    toggleDropdown={() => toggleDropdown('semester')}
                    icon={<i className={`fas ${openDropdown === 'semester' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>} // Replace with your desired Font Awesome icon classes
                />
                <CustomDropdown
                    label="CSE"
                    options={['CSE', 'ECE', 'IT', 'MECH', 'Civil', 'EEE']}
                    selectedValue={selectedBranch}
                    onSelect={handleBranchChange}
                    isOpen={openDropdown === 'branch'}
                    toggleDropdown={() => toggleDropdown('branch')}
                    icon={<i className={`fas ${openDropdown === 'branch' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>} // Replace with your desired Font Awesome icon classes
                />
                <button className='user-change-subject-button' onClick={handleButtonClick}>Change</button>
            </div>
        </>
    )
};

export default Select2;
