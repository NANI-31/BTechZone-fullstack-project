import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './User.css';
import Usubject from './uploadselect'


const CustomDropdown = ({ label, options, selectedValue, onSelect, isOpen, toggleDropdown, icon }) => {
    const handleOptionClick = (option) => {
        onSelect(option);
        toggleDropdown();
    };

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
const defaultsubjects = ['ENGLISH', 'M-I', 'Physics', 'C', 'CEW'];

function Userupload() {

    const [modalOpen, setModalOpen] = useState(false);
    const [pdfPublic, setPdfPublic] = useState(true)
    const [pdfPrivate, setPdfPrivate] = useState(false)
    const [showPopup, setShowPopup] = useState(false);


    const [email, setEmail] = useState()
    const [selectedYea1, setSelectedYea1] = useState('1st Year');
    const [selectedSemeste1, SetSelectedSemeste1] = useState('Semester 1');
    const [selectedBranc1, setSelectedBranc1] = useState('CSE');
    const [updateSubjectsu, setUpdateSubjectsu] = useState(defaultsubjects)
    const [selectedSubject, setSelectedSubject] = useState(updateSubjectsu[0]);
    const [selectedunit, setSelectedUnit] = useState('UNIT 1');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [filename, setFilename] = useState('');
    const [pdfFile, setPdfFile] = useState(null);



    useEffect(() => {
        setSelectedSubject(updateSubjectsu[0]);
    }, [updateSubjectsu]);


    const handleSubjectChange = (subject) => {
        setSelectedSubject(subject);
    };
    const handleUnitChange = (unit) => {
        setSelectedUnit(unit);
    };

    const toggleDropdown = (dropdown) => {
        setOpenDropdown((prevDropdown) => (prevDropdown === dropdown ? null : dropdown));
    };
    const updateSubjects = ({ updatedSubjects, year, semester, branch }) => {
        setUpdateSubjectsu(updatedSubjects);
        setSelectedYea1(year);
        setSelectedBranc1(branch);
        SetSelectedSemeste1(semester);
        // console.log(year, semester, branch)

    };
    const [user, setUser] = useState(null);
    const [person, setPerson] = useState(null);

    useEffect(() => {
        //   console.log("Retrieving user data from local storage...");
        const storedUser = sessionStorage.getItem('userdata');
        // console.log("Stored user data:", storedUser);

        if (storedUser) {
            setUser(prevUser => {
                const newUser = JSON.parse(storedUser);

                console.log("User data set successfully:", newUser.email);
                setEmail(newUser.email);
                setPerson(newUser.person);
                return newUser;
            });
        }

    }, []);






    // useEffect(() => {
    //     Fetch or generate the data you want to pass
    //     const fetchedData = email;

    //     Set the data in the state
    //     setDataToPass(fetchedData);

    //     Cleanup function (optional)
    //     return () => {
    //       Perform cleanup if needed
    //     };
    //   }, []);


    const uploadPdf = async (e, value) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email)
        formData.append('year', selectedYea1);
        formData.append('semester', selectedSemeste1);
        formData.append('branch', selectedBranc1);
        formData.append('subject', selectedSubject);
        formData.append('unit', selectedunit);
        formData.append('filename', filename);
        formData.append('pdfFile', pdfFile);
        formData.append('value', value)
        formData.append('person', person)

        console.log(selectedYea1, selectedSemeste1, selectedBranc1, selectedSubject, selectedunit, pdfFile, filename)
        openModal();
        console.log(value)
        if (value) {
            console.log("public file");
        }
        else {
            console.log("private file")
        }
        try {
            const response = await axios.post("http://localhost:5000/uploads/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            if (response.status === 200) {
                console.log(response);
                // alert("File uploaded successfully.");
            }
        }
        catch (error) {
            console.log(error);
            alert('Upload failed: ' + error)
        }
        // const response = await axios.post("http://localhost:5000/uploads/upload", formData, {
        //     headers: { "Content-Type": "multipart/form-data" },
        // })
        //     .then(result => {
        //         console.log(result)

        //     })
        //     .catch(error => {
        //         console.log(error);
        //         alert('Signup failed: ' + error)
        //     })
        // try {

        //     const response = await axios.post("http://localhost:5000/uploads/generate-single-presigned-url",
        //         { fileName: filename, }
        //     );
        //     const { url } = response.data;
        //     const uploadResponse = await axios.put(url, pdfFile, {
        //         headers: {
        //             "Content-Type": pdfFile.type,
        //         },
        //     });

        //     console.log("Uplaodresponse- ", uploadResponse);

        //     if (uploadResponse.status === 200) {
        //         alert("File uploaded successfully.");
        //     } else {
        //         alert("Upload failed.");
        //     }

        // else {
        //     // call multipart upload endpoint and get uploadId
        //     const response = await axios.post(
        //         "http://localhost:5000/uploads/start-multipart-upload",
        //         {
        //             fileName: filename,
        //             contentType: pdfFile.type,
        //         }
        //     );

        //     // get uploadId
        //     let { uploadId } = response.data;
        //     console.log("UploadId- ", uploadId);

        //     // get total size of the file
        //     let totalSize = pdfFile.size;
        //     // set chunk size to 10MB
        //     let chunkSize = 10000000;
        //     // calculate number of chunks
        //     let numChunks = Math.ceil(totalSize / chunkSize);

        //     // generate presigned urls
        //     let presignedUrls_response = await axios.post(
        //         "http://localhost:5000/uploads/generate-presigned-url",
        //         {
        //             fileName: filename,
        //             uploadId: uploadId,
        //             partNumbers: numChunks,
        //         }
        //     );

        //     let presigned_urls = presignedUrls_response?.data?.presignedUrls;

        //     console.log("Presigned urls- ", presigned_urls);

        //     // upload the file into chunks to different presigned url
        //     let parts = [];
        //     const uploadPromises = [];

        //     for (let i = 0; i < numChunks; i++) {
        //         let start = i * chunkSize;
        //         let end = Math.min(start + chunkSize, totalSize);
        //         let chunk = pdfFile.slice(start, end);
        //         let presignedUrl = presigned_urls[i];

        //         uploadPromises.push(
        //             axios.put(presignedUrl, chunk, {
        //                 headers: {
        //                     "Content-Type": pdfFile.type,
        //                 },
        //             })
        //         );
        //     }

        //     const uploadResponses = await Promise.all(uploadPromises);

        //     uploadResponses.forEach((response, i) => {
        //         // existing response handling

        //         parts.push({
        //             etag: response.headers.etag,
        //             PartNumber: i + 1,
        //         });
        //     });

        //     console.log("Parts- ", parts);

        //     // make a call to multipart complete api
        //     let complete_upload = await axios.post(
        //         "http://localhost:5000/uploads/complete-multipart-upload",
        //         {
        //             fileName: filename,
        //             uploadId: uploadId,
        //             parts: parts,
        //         }
        //     );

        //     console.log("Complete upload- ", complete_upload.data);

        //     // if upload is successful, alert user
        //     if (complete_upload.status === 200) {
        //         alert("File uploaded successfully.");
        //     } else {
        //         alert("Upload failed.");
        //     }
        //     // set isUpload false

        // }
        // } catch (error) {
        //     alert("Upload failed.");
        // }

    }
    // const [fileName, setFileName] = useState('');

    // const handleFileChange = (event) => {
    //   const file = event.target.files[0];
    //   console.log(file.name)
    //   if (file) {
    //     setFileName(file.name);
    //   } else {
    //     setFileName('');
    //   }
    // };
    // const [pdfFile, setPdfFile] = useState(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    const handleFileChange = (event) => {
        setPdfFile(event.target.files[0]);

    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDraggedOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggedOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        // const selectedFile = event.dataTransfer.files[0];
        // setFile(selectedFile);

        setIsDraggedOver(false);
    };
    const openModal = () => {
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);

    };

    // Function to handle clicking outside of the modal
    const handleOutsideClick = (event) => {
        if (event.target === "myModal") {
            closeModal();
        }
    };
    // const [confirmSave, setConfirmSave] = useState(false);
    // const handlePopup = () => {
    //     const result = window.confirm('Do you want to save the PDF as private?');
    //     setConfirmSave(result);
    //   };







    return (
        <div >
            <div className='upload-body'>
                <div className='upload-signup-body'>
                    <div id="upload-center">
                        <div className="upload-form-box signup-login">
                            <div id="sign-up">

                                <h2 className="upload-h2"><span className="upload-multiple-text">Upload Pdf</span></h2>
                                <form name="signup" method="post" className='upload-form' onSubmit={uploadPdf}>
                                    <div className="upload-input-box upload-bbbb">
                                        <Usubject updateSubjects={updateSubjects} />
                                    </div>
                                    <div className="upload-input-box c upload-bbbb">
                                        <CustomDropdown
                                            label="Select Subject"
                                            options={updateSubjectsu}
                                            selectedValue={selectedSubject}
                                            onSelect={handleSubjectChange}

                                            isOpen={openDropdown === 'subject'}
                                            toggleDropdown={() => toggleDropdown('subject')}
                                            icon={<i className={`fas ${openDropdown === 'subject' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>} // Replace with your desired Font Awesome icon classes
                                        />
                                        <div style={{ visibility: "hidden" }}>

                                            <CustomDropdown
                                                label="Select Subject"
                                                options={updateSubjectsu}
                                                selectedValue={selectedSubject}
                                                onSelect={handleSubjectChange}

                                                isOpen={openDropdown === 'subject'}
                                                toggleDropdown={() => toggleDropdown('subject')}
                                                icon={<i className={`fas ${openDropdown === 'subject' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>} // Replace with your desired Font Awesome icon classes
                                            />
                                        </div>
                                        <CustomDropdown
                                            label="Select Unit"
                                            options={['UNIT 1', 'UNIT 2', 'UNIT 3', 'UNIT 4', 'UNIT 5']}
                                            selectedValue={selectedunit}
                                            onSelect={handleUnitChange}
                                            isOpen={openDropdown === 'unit'}
                                            toggleDropdown={() => toggleDropdown('unit')}
                                            icon={<i className={`fas ${openDropdown === 'unit' ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>} // Replace with your desired Font Awesome icon classes
                                        />
                                    </div>


                                    {/* <!---------------------------------- pass1 ------------------------------------> */}


                                    <div className="upload-input-box upload-filename c">
                                        <input type="text" required id="password" name="password1" autoComplete="off" onChange={(e) => setFilename(e.target.value)}
                                        />
                                        <label>File Name</label>
                                    </div>

                                    {/* <!--------------------------------- pass2------------------------------------> */}

                                    <div
                                        className={`drag-area${isDraggedOver ? ' active' : ''}`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <div className="icon"><i className="fa-solid fa-cloud-arrow-up"></i></div>
                                        <header>Drag & Drop File</header>
                                        <span className='upload-or'>OR</span>
                                        <button className='drag-btn' onClick={() => document.querySelector("input").click()}>Browse File</button>
                                        <input type="file" name='pdfFile' onChange={handleFileChange} />
                                    </div>



                                    {/* <!---------------------------------- buttons ------------------------------------> */}

                                    <div className="upload-input-box signup-ib1">
                                        <div className="upload-btn" type="submit" name="submit" id="myBtn" onClick={openModal} >Upload</div>
                                    </div>
                                    <div id="myModal" className="modal" style={{ display: modalOpen ? 'block' : 'none' }} onClick={handleOutsideClick}>
                                        <div className="modal-content">
                                            <div className='main-text'>
                                                <p className='heade'>Before Uploading</p>
                                                <span className="close" onClick={closeModal}>&times;</span>

                                            </div>
                                            <div className='text1'>Are you want to make it Public or Private ?</div>
                                            <div className='text-btns'>
                                                <button className='p' onClick={(e) => { uploadPdf(e, true); closeModal(); }}>Public</button>
                                                <button className='p' onClick={(e) => { uploadPdf(e, false); closeModal(); }}>Private</button>
                                                {/* <div className='p' onClick={() => { setPdfPrivate(false); closeModal(); }}>Private</div> */}
                                            </div>
                                        </div>

                                    </div>
                                </form>
                                {showPopup && (
                                    <div className="popup">
                                        Popup content
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='subject-names-all'>
                <div className='row1'>
                    <div className='subject-year'>
                        <p>1st Year</p></div>
                    <div className='sem1'>
                        <div className='sem1-name'>
                            <p>Semester 1</p>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>ECE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>ED</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Engineering Drawing</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>IT</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>MECH</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-I</p>
                                    <p>EP</p>
                                    <p>PPS</p>
                                    <p>ENGLISH</p>
                                    <p>Eng DRWAING</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Calculus & Differential Equations-M1 </p>
                                    <p>&ensp;<b>:</b>&emsp;Engineering Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving</p>
                                    <p>&ensp;<b>:</b>&emsp;English</p>
                                    <p>&ensp;<b>:</b>&emsp;Engineering Drawing</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CIVIL</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-I</p>
                                    <p>ENGLISH</p>
                                    <p>Eng PHYSICS</p>
                                    <p>Eng DRAWING</p>
                                    <p>Eng Geology</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp; Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English</p>
                                    <p>&ensp;<b>:</b>&emsp;Engineering Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Engineering Drawing</p>
                                    <p>&ensp;<b>:</b>&emsp;Engineering Geology</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>EEE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>M-II</p>
                                    <p>C</p>
                                    <p>EDD</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Engineering Drawing & Design</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sem1'>
                        <div className='sem1-name'>
                            <p>Semester 2</p>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-II</p>
                                    <p>CHEMISTRY</p>
                                    <p>CO</p>
                                    <p>PP</p>
                                    <p>DS</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - II</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Chemistry</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Organization</p>
                                    <p>&ensp;<b>:</b>&emsp;Python Programming</p>
                                    <p>&ensp;<b>:</b>&emsp;Data Structures</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>ECE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-II</p>
                                    <p>PHYSICS</p>
                                    <p>JAVA</p>
                                    <p>NA</p>
                                    <p>BEE</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - II</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics </p>
                                    <p>&ensp;<b>:</b>&emsp;Object Oriented Programming through Java</p>
                                    <p>&ensp;<b>:</b>&emsp;Network Analysis</p>
                                    <p>&ensp;<b>:</b>&emsp;Basic Electrical Engineering</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>IT</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-II</p>
                                    <p>CHEMISTRY</p>
                                    <p>CO</p>
                                    <p>PP</p>
                                    <p>DS</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - II</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Chemistry</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Organization</p>
                                    <p>&ensp;<b>:</b>&emsp;Python Programming</p>
                                    <p>&ensp;<b>:</b>&emsp;Data Structures</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>MECH</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-II</p>
                                    <p>Eng Chemistry</p>
                                    <p>Eng Mechanics</p>
                                    <p>BEEE</p>
                                    <p>CAED</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Linear Algebra & Numerical Methods-M2</p>
                                    <p>&ensp;<b>:</b>&emsp;Engineering Chemistry</p>
                                    <p>&ensp;<b>:</b>&emsp;Engineering Mechanics</p>
                                    <p>&ensp;<b>:</b>&emsp;Basic Electrical & Electronics Engineering</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Aided Engineering Drawing</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CIVIL</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-II</p>
                                    <p>Eng Chemistry</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - II</p>
                                    <p>&ensp;<b>:</b>&emsp;Engineering Chemistry</p>
                                    <p>&ensp;<b>:</b>&emsp;Engineering Mechanics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Building Materials and Concrete Technology</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>EEE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-III</p>
                                    <p>PHYSICS</p>
                                    <p>DSC</p>
                                    <p>ECA-I</p>
                                    <p>BCME</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - III</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Data Structures Through C</p>
                                    <p>&ensp;<b>:</b>&emsp;Electrical Circuit Analysis -I</p>
                                    <p>&ensp;<b>:</b>&emsp;Basic Civil and Mechanical Engineering</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='row1'>
                    <div className='subject-year'>
                        <p>2nd Year</p></div>
                    <div className='sem1'>
                        <div className='sem1-name'>
                            <p>Semester 1</p>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-III</p>
                                    <p>OOPC</p>
                                    <p>OS</p>
                                    <p>SE</p>
                                    <p>MECS</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - III</p>
                                    <p>&ensp;<b>:</b>&emsp;Object Oriented Programming through C++</p>
                                    <p>&ensp;<b>:</b>&emsp;Operating Systems</p>
                                    <p>&ensp;<b>:</b>&emsp;Software Engineering</p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematical Foundations of Computer Science</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>ECE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>EDC</p>
                                    <p>STLD</p>
                                    <p>SS</p>
                                    <p>M-III</p>
                                    <p>RVSP</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Electronic Devices and Circuits </p>
                                    <p>&ensp;<b>:</b>&emsp;Switching Theory and Logic Design</p>
                                    <p>&ensp;<b>:</b>&emsp;Signals and Systems</p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics-III (Transforms and Vector Calculus)</p>
                                    <p>&ensp;<b>:</b>&emsp;Random Variables and Stochastic Processes</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>IT</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-III</p>
                                    <p>OOPC</p>
                                    <p>OS</p>
                                    <p>DMS</p>
                                    <p>DMGT</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - III</p>
                                    <p>&ensp;<b>:</b>&emsp;Object Oriented Programming through C++</p>
                                    <p>&ensp;<b>:</b>&emsp;Operating Systems</p>
                                    <p>&ensp;<b>:</b>&emsp;Database Management Systems</p>
                                    <p>&ensp;<b>:</b>&emsp;Discrete Mathematics and Graph Theory</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>MECH</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-III</p>
                                    <p>MS</p>
                                    <p>FMHM</p>
                                    <p>PT</p>
                                    <p>KM</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Vector Calculus, Fourier Transforms and PDE</p>
                                    <p>&ensp;<b>:</b>&emsp;Mechanics of Solids</p>
                                    <p>&ensp;<b>:</b>&emsp;Fluid Mechanics & Hydraulic Machines</p>
                                    <p>&ensp;<b>:</b>&emsp;Production Technology</p>
                                    <p>&ensp;<b>:</b>&emsp;Kinematics of Machinery</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CIVIL</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-III</p>
                                    <p>SM-I</p>
                                    <p>FM</p>
                                    <p>SG</p>
                                    <p>HM</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics -III </p>
                                    <p>&ensp;<b>:</b>&emsp;Strength of Materials - I</p>
                                    <p>&ensp;<b>:</b>&emsp;Fluid Mechanics</p>
                                    <p>&ensp;<b>:</b>&emsp;Surveying and Geometrics</p>
                                    <p>&ensp;<b>:</b>&emsp;Highway Engineering</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>EEE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>M-IV</p>
                                    <p>EDC</p>
                                    <p>ECAT</p>
                                    <p>DCMT</p>
                                    <p>EMF</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics– IV</p>
                                    <p>&ensp;<b>:</b>&emsp;Electronic Devices and Circuits</p>
                                    <p>&ensp;<b>:</b>&emsp;Electrical Circuit Analysis –II</p>
                                    <p>&ensp;<b>:</b>&emsp;DC Machines and Transformers</p>
                                    <p>&ensp;<b>:</b>&emsp;Electro Magnetic Fields</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sem1'>
                        <div className='sem1-name'>
                            <p>Semester 2</p>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>P&S</p>
                                    <p>DBMS</p>
                                    <p>FLAT</p>
                                    <p>JAVA</p>
                                    <p>MEFA</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Probability and Statistics</p>
                                    <p>&ensp;<b>:</b>&emsp;Database Management Systems</p>
                                    <p>&ensp;<b>:</b>&emsp;Formal Languages and Automata Theory</p>
                                    <p>&ensp;<b>:</b>&emsp;Java Programming</p>
                                    <p>&ensp;<b>:</b>&emsp;Managerial Economics and Financial Accountancy </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>ECE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ECA</p>
                                    <p>DICD</p>
                                    <p>AC</p>
                                    <p>LCS</p>
                                    <p>MOB</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Electronic Circuit Analysis</p>
                                    <p>&ensp;<b>:</b>&emsp;Digital IC Design</p>
                                    <p>&ensp;<b>:</b>&emsp;Analog Communications</p>
                                    <p>&ensp;<b>:</b>&emsp;Linear control Systems</p>
                                    <p>&ensp;<b>:</b>&emsp;Management and Organizational Behavior </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>IT</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>SR</p>
                                    <p>PSE</p>
                                    <p>ATCD</p>
                                    <p>JAVA</p>
                                    <p>MEFA</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Statistics with R </p>
                                    <p>&ensp;<b>:</b>&emsp;Principles of Software Engineering</p>
                                    <p>&ensp;<b>:</b>&emsp;Automata Theory and Compiler Design</p>
                                    <p>&ensp;<b>:</b>&emsp;Java Programming</p>
                                    <p>&ensp;<b>:</b>&emsp;Managerial Economics and Financial Accountancy  </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>MECH</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>MSM</p>
                                    <p>CVSM</p>
                                    <p>DM</p>
                                    <p>TE1</p>
                                    <p>IEM</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Material Science & Metallurgy</p>
                                    <p>&ensp;<b>:</b>&emsp;Complex Variables and Statistical Methods</p>
                                    <p>&ensp;<b>:</b>&emsp;Dynamics of Machinery</p>
                                    <p>&ensp;<b>:</b>&emsp;PThermal Engineering-I</p>
                                    <p>&ensp;<b>:</b>&emsp;Industrial Engineering and Management</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CIVIL</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>CVSM</p>
                                    <p>SM2</p>
                                    <p>HHM</p>
                                    <p>EE</p>
                                    <p>MEFA</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Complex Variables and Statistical Methods</p>
                                    <p>&ensp;<b>:</b>&emsp;Strength of Materials -II</p>
                                    <p>&ensp;<b>:</b>&emsp;Hydraulics and Hydraulic Machinery</p>
                                    <p>&ensp;<b>:</b>&emsp;Environmental Engineering</p>
                                    <p>&ensp;<b>:</b>&emsp;Managerial Economics & Financial Analysis</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>EEE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>PP</p>
                                    <p>DE</p>
                                    <p>PS-I</p>
                                    <p>ISM</p>
                                    <p>MEFA</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Python Programming</p>
                                    <p>&ensp;<b>:</b>&emsp;Digital Electronics</p>
                                    <p>&ensp;<b>:</b>&emsp;Power System-I</p>
                                    <p>&ensp;<b>:</b>&emsp;Induction and Synchronous Machines</p>
                                    <p>&ensp;<b>:</b>&emsp;Managerial Economics & Financial Analysis</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='row1'>
                    <div className='subject-year'>
                        <p>3rd Year</p></div>
                    <div className='sem1'>
                        <div className='sem1-name'>
                            <p>Semester 1</p>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>CN</p>
                                    <p>DAA</p>
                                    <p>DWDM</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Computer Networks </p>
                                    <p>&ensp;<b>:</b>&emsp;Design and Analysis of Algorithms</p>
                                    <p>&ensp;<b>:</b>&emsp;Data Warehousing and Data Mining</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>ECE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>AICAP</p>
                                    <p>EWTL</p>
                                    <p>DC</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Analog ICs and Applications</p>
                                    <p>&ensp;<b>:</b>&emsp;Electromagnetic Waves and Transmission Lines</p>
                                    <p>&ensp;<b>:</b>&emsp;Digital Communications</p>

                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>IT</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>CN</p>
                                    <p>DAA</p>
                                    <p>DMT</p>

                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Computer Networks </p>
                                    <p>&ensp;<b>:</b>&emsp;Design and Analysis of Algorithms</p>
                                    <p>&ensp;<b>:</b>&emsp;Data Mining Techniques</p>

                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>MECH</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>TE2</p>
                                    <p>DMM1</p>
                                    <p>MMTM</p>

                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Thermal Engineering-II </p>
                                    <p>&ensp;<b>:</b>&emsp;Design of Machine Members-I</p>
                                    <p>&ensp;<b>:</b>&emsp;Machining, Machine Tools & Metrology</p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CIVIL</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>SA</p>
                                    <p>DRCS</p>
                                    <p>GE-I</p>

                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Structure Analysis </p>
                                    <p>&ensp;<b>:</b>&emsp;DESIGN AND DRAWING OF REINFORCED CONCRETE STRUCTURES</p>
                                    <p>&ensp;<b>:</b>&emsp;GEOTECHNICAL ENGINEERING-1</p>

                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>EEE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>PS-II</p>
                                    <p>PE</p>
                                    <p>CS</p>

                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Power Systems-II</p>
                                    <p>&ensp;<b>:</b>&emsp;Power Electronics</p>
                                    <p>&ensp;<b>:</b>&emsp;Control Systems</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sem1'>
                        <div className='sem1-name'>
                            <p>Semester 2</p>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='row1'>
                    <div className='subject-year'>
                        <p>4th Year</p></div>
                    <div className='sem1'>
                        <div className='sem1-name'>
                            <p>Semester 1</p>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h2>CSE</h2>
                            <div className='subjects'>
                                <div className='subject-shortcuts'>
                                    <p>ENGLISH</p>
                                    <p>M-I</p>
                                    <p>PHYSICS</p>
                                    <p>C</p>
                                    <p>CEW</p>
                                </div>
                                <div className='subject-values'>
                                    <p>&ensp;<b>:</b>&emsp;Communicative English </p>
                                    <p>&ensp;<b>:</b>&emsp;Mathematics - I (Calculus And Differential Equations)</p>
                                    <p>&ensp;<b>:</b>&emsp;Applied Physics</p>
                                    <p>&ensp;<b>:</b>&emsp;Programming for Problem Solving using C</p>
                                    <p>&ensp;<b>:</b>&emsp;Computer Engineering Workshop </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>




            </div>
        </div>


    );
}

export default Userupload;







