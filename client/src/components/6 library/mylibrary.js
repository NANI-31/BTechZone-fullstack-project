import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// import pdfjs from 'pdfjs-dist';
import './mylibrary.css'; // Import CSS file for styling
import axios from 'axios';
import { useSelector } from 'react-redux';

function DraggableNavigationMenu() {
	const userData = useSelector((state) => state.user);

	const [isDragging, setIsDragging] = useState(false);

	const section1Ref = useRef(null);
	const section2Ref = useRef(null);
	const section3Ref = useRef(null);
	const section4Ref = useRef(null);

	function onDrag(e) {
		if (isDragging) {
			const movementY = e.movementY;
			const nav = document.querySelector('nav');
			const navStyle = window.getComputedStyle(nav);
			const navTop = parseInt(navStyle.top);
			const navHeight = parseInt(navStyle.height);
			const windHeight = window.innerHeight;

			nav.style.top = navTop > 0 ? `${navTop + movementY}px` : '1px';
			if (navTop > windHeight - navHeight) {
				nav.style.top = `${windHeight - navHeight}px`;
			}
		}
	}

	function handleMouseDown() {
		setIsDragging(true);
		document.addEventListener('mousemove', onDrag);
	}

	function handleMouseUp() {
		setIsDragging(false);
		document.removeEventListener('mousemove', onDrag);
	}

	function handleMouseLeave() {
		setIsDragging(false);
		document.removeEventListener('mousemove', onDrag);
	}

	const person = userData.person;

	const [pdfDataPrivate, setPdfDataPrivate] = useState([]);
	const [pdfDataPublic, setPdfDataPublic] = useState([]);
	const [pdfDataRecent, setPdfDataRecent] = useState([]);
	useEffect(() => {
		fetchData1();
	}, []);
	const fetchData1 = async () => {
		const email = userData.email;
		const person = userData.person;
		try {
			const response = await axios.post('http://localhost:5000/userLibrary/mylib-get-recent', { email, person });
			const { pdfData } = response.data;
			setPdfDataRecent(pdfData.rreferences);
			console.log(pdfData.rreferences);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	const fetchData2 = async () => {
		const email = userData.email;
		const person = userData.person;
		try {
			const response = await axios.post('http://localhost:5000/userLibrary/mylib-get-private', { email, person });
			const { pdfData } = response.data;
			setPdfDataPrivate(pdfData.references);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	const fetchData3 = async () => {
		const email = userData.email;
		const person = userData.person;
		try {
			const response = await axios.post('http://localhost:5000/userLibrary/mylib-get-public', { email, person });
			const { pdfData } = response.data;
			setPdfDataPublic(pdfData.references);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const handlePdfClick = async (uniqueId, accessType) => {
		try {
			console.log(uniqueId);
			// Make API call to send data to the server
			const response = await axios.post(
				'http://localhost:5000/userLibrary/libx',
				{ uniqueId, accessType, person },
				{
					responseType: 'blob',
				}
			);
			const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
			const pdfUrl = URL.createObjectURL(pdfBlob);

			// const fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
			// const pdfUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
			// const url = URL.createObjectURL(response.data);
			window.open(pdfUrl, '_blank');
		} catch (error) {
			console.error('Error downloading PDF:', error);
		}
	};
	const getYearValue = (year, semester) => {
		let yearValue = 0;
		switch (year) {
			case '1st Year':
				yearValue = 1;
				break;
			case '2nd Year':
				yearValue = 2;
				break;
			case '3rd Year':
				yearValue = 3;
				break;
			case '4th Year':
				yearValue = 4;
				break;
			default:
				yearValue = 0; // You might want to handle other cases
		}

		if (semester === 'Semester 2') {
			yearValue += 0.5; // Add 0.5 to indicate second semester
		}

		return yearValue;
	};

	// Sort the PDF data based on the year and semester values
	const sortedPdfPrivateData = pdfDataPrivate.sort((a, b) => {
		const yearValueA = getYearValue(a.year, a.semester);
		const yearValueB = getYearValue(b.year, b.semester);
		return yearValueA - yearValueB;
	});
	const sortedPdfPublicData = pdfDataPublic.sort((a, b) => {
		const yearValueA = getYearValue(a.year, a.semester);
		const yearValueB = getYearValue(b.year, b.semester);
		return yearValueA - yearValueB;
	});
	const [privateBranchGroups, setPrivateBranchGroups] = useState({});
	const [publicBranchGroups, setPublicBranchGroups] = useState({});
	useEffect(() => {
		// This effect runs whenever pdfDataPrivate changes
		const updatePrivateBranchGroups = () => {
			const updatedPrivateBranchGroups = {};
			sortedPdfPrivateData.forEach((pdf) => {
				const branch = pdf.branch;
				if (!updatedPrivateBranchGroups[branch]) {
					updatedPrivateBranchGroups[branch] = [];
				}
				updatedPrivateBranchGroups[branch].push(pdf);
			});
			setPrivateBranchGroups(updatedPrivateBranchGroups);
		};

		const updatePublicBranchGroups = () => {
			const updatedPublicBranchGroups = {};
			sortedPdfPublicData.forEach((pdf) => {
				const branch = pdf.branch;
				if (!updatedPublicBranchGroups[branch]) {
					updatedPublicBranchGroups[branch] = [];
				}
				updatedPublicBranchGroups[branch].push(pdf);
			});
			setPublicBranchGroups(updatedPublicBranchGroups);
		};

		updatePrivateBranchGroups();
		updatePublicBranchGroups();
	}, [pdfDataPrivate, pdfDataPublic]);

	// State for search query
	const [searchPrivateQuery, setSearchPrivateQuery] = useState('');
	// Handle search query change
	const handleSearchPrivateChange = (event) => {
		setSearchPrivateQuery(event.target.value);
	};

	// State for search query
	const [searchPublicQuery, setSearchPublicQuery] = useState('');
	// Handle search query change
	const handleSearchPublicChange = (event) => {
		setSearchPublicQuery(event.target.value);
	};
	const [isNavOpen, setIsNavOpen] = useState(false);
	function toggleNav() {
		setIsNavOpen(!isNavOpen);
	}
	function scrollToSectionAndCloseNav(ref) {
		if (ref.current) {
			ref.current.scrollIntoView({ behavior: 'smooth' });
			setIsNavOpen(false); // Close the navigation after scrolling
		}
	}

	const [modalOpendeletepriv, setModalOpendeletepriv] = useState(false);
	const [modalOpendeletepub, setModalOpendeletepub] = useState(false);
	const [modalOpendeleteres, setModalOpendeleteres] = useState(false);
	const openModaldeletepriv = () => {
		setModalOpendeletepriv(true);
	};
	const openModaldeletepub = () => {
		setModalOpendeletepub(true);
	};
	const openModaldeleteres = () => {
		setModalOpendeleteres(true);
	};
	const closeModal = () => {
		setModalOpendeletepriv(false);
		setModalOpendeletepub(false);
	};
	const [privateOptionsListActiveIndex, setPrivateOptionsListActiveIndex] = useState(null);
	const [publicOptionsListActiveIndex, setPublicOptionsListActiveIndex] = useState(null);
	const [recentOptionsListActiveIndex, setRecentOptionsListActiveIndex] = useState(null);
	const mylibPdfRef = useRef(null);

	const handleOptionsIconClick = (index, isPrivate, isPublic, isRecent, event) => {
		event.stopPropagation();
		if (isPrivate) {
			setPrivateOptionsListActiveIndex((prevIndex) => (prevIndex === index ? null : index));
			setPublicOptionsListActiveIndex(null); // Remove active class from public options list
			setRecentOptionsListActiveIndex(null); // Remove active class from recent options list
		} else if (isPublic) {
			setPublicOptionsListActiveIndex((prevIndex) => (prevIndex === index ? null : index));
			setPrivateOptionsListActiveIndex(null); // Remove active class from private options list
			setRecentOptionsListActiveIndex(null); // Remove active class from recent options list
		} else if (isRecent) {
			setRecentOptionsListActiveIndex((prevIndex) => (prevIndex === index ? null : index));
			setPrivateOptionsListActiveIndex(null); // Remove active class from private options list
			setPublicOptionsListActiveIndex(null); // Remove active class from public options list
		}
	};
	const [deletetool, setDeletetool] = useState('');
	const [movetool, setMovetool] = useState('');
	const [bookmarktool, setBookmarktool] = useState('');
	const [deletetoolp, setDeletetoolp] = useState('');
	const [movetoolp, setMovetoolp] = useState('');
	const [bookmarktoolp, setBookmarktoolp] = useState('');
	const handleToolTip = (index, isD, isM, isB, isP) => {
		if (isP) {
			if (isD) {
				setDeletetool((prevIndex) => (prevIndex === index ? null : index));
				setMovetool(null); // Remove active class from public options list
				setBookmarktool(null); // Remove active class from recent options list
			} else if (isM) {
				setDeletetool(null);
				setMovetool((prevIndex) => (prevIndex === index ? null : index)); // Remove active class from public options list
				setBookmarktool(null); // Remove active class from recent options list
			} else if (isB) {
				setDeletetool(null);
				setMovetool(null); // Remove active class from public options list
				setBookmarktool((prevIndex) => (prevIndex === index ? null : index)); // Remove active class from recent options list
			}
		} else {
			if (isD) {
				setDeletetoolp((prevIndex) => (prevIndex === index ? null : index));
				setMovetoolp(null); // Remove active class from public options list
				setBookmarktoolp(null); // Remove active class from recent options list
			} else if (isM) {
				setDeletetoolp(null);
				setMovetoolp((prevIndex) => (prevIndex === index ? null : index)); // Remove active class from public options list
				setBookmarktoolp(null); // Remove active class from recent options list
			} else if (isB) {
				setDeletetoolp(null);
				setMovetoolp(null); // Remove active class from public options list
				setBookmarktoolp((prevIndex) => (prevIndex === index ? null : index)); // Remove active class from recent options list
			}
		}
	};
	const handleToolTipclose = () => {
		setDeletetool(null);
		setMovetool(null);
		setBookmarktool(null);
		setDeletetoolp(null);
		setMovetoolp(null);
		setBookmarktoolp(null);
	};
	const handleOutsideClick = (event) => {
		if (event.target === 'myModal') {
			closeModal();
		}
	};

	const [isoptonclose, setIsoptionclose] = useState(false);
	const Optionclose = (value) => {
		setIsoptionclose(value);
	};
	const [pdfFileid, setPdfFileid] = useState();
	const [recent, setRecent] = useState();
	const deletePdf = async (e, value, access) => {
		console.log(person, access, pdfFileid);
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/userLibrary/delete-PDF', { person, access, pdfFileid });
			if (response.data === 'ok') {
				fetchData1();
				fetchData2();
				fetchData3();
				const updatedPdfData1 = pdfDataPrivate.filter((pdf) => pdf.file_id !== pdfFileid);
				const updatedPdfData2 = pdfDataPublic.filter((pdf) => pdf.file_id !== pdfFileid);
				setPdfDataPrivate(updatedPdfData1);
				setPdfDataPublic(updatedPdfData2);
				console.log('ok');
			} else if (response.data == 'no') {
				console.log('no');
			} else {
				console.log('no file');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleOptionItemClick = (isPrivate, isPublic, isRecent) => {
		if (isPrivate) {
			setPrivateOptionsListActiveIndex(null);
			// if(isoptonclose){
			// }
		} else if (isPublic) {
			setPublicOptionsListActiveIndex(null);
		} else if (isRecent) {
			setRecentOptionsListActiveIndex(null);
		}
	};

	const handlechangepdftype = async (e, pdfFileid, access) => {
		e.preventDefault();
		const person = userData.person;
		console.log(person, access, pdfFileid);
		const response = await axios.post('http://localhost:5000/userLibrary/change-PDF-type', { person, access, pdfFileid });
		if (response.data === 'ok') {
			fetchData1();
			fetchData2();
			fetchData3();
			const updatedPdfData1 = pdfDataPrivate.filter((pdf) => pdf.file_id !== pdfFileid);
			const updatedPdfData2 = pdfDataPublic.filter((pdf) => pdf.file_id !== pdfFileid);
			setPdfDataPrivate(updatedPdfData1);
			setPdfDataPublic(updatedPdfData2);
			console.log('changed');
		} else {
			console.log('fail');
		}
		// console.log(person, access, pdfFileid);
	};

	return (
		<div className="mylib-body">
			<nav className={isNavOpen ? 'open mylib-nav' : 'mylib-nav'}>
				<div className="nav-content">
					<div className="toggle-btn" onClick={toggleNav}>
						<i className="fa-solid fa-plus"></i>
					</div>
					<span style={{ '--i': 4 }} onClick={() => scrollToSectionAndCloseNav(section1Ref)}>
						<Link>
							<i>recent</i>
						</Link>
					</span>
					<span style={{ '--i': 3 }} onClick={() => scrollToSectionAndCloseNav(section2Ref)}>
						<Link>
							<i>private</i>
						</Link>
					</span>
					<span style={{ '--i': 2 }} onClick={() => scrollToSectionAndCloseNav(section3Ref)}>
						<Link>
							<i>public</i>
						</Link>
					</span>
					<span style={{ '--i': 1 }} onClick={() => scrollToSectionAndCloseNav(section4Ref)}>
						<Link>
							<i>all</i>
						</Link>
					</span>
				</div>
			</nav>
			<div className="mmm">
				<div className="my-lib-main">
					<div className="mylib-container" ref={section1Ref}>
						<div className="mylib-row">
							<div className="mylib-row1 mylib-rows">
								<div className="mylib-row1-header">
									<h1>Recent Uploads</h1>
								</div>
								<ul>
									{pdfDataRecent.map((pdfr, index) => (
										<li key={index}>
											<div className="mylib-pdf" ref={mylibPdfRef} onClick={() => handlePdfClick(pdfr.file_id, 'recent')}>
												<div className="ss">
													<div className="options-icon" onClick={(event) => handleOptionsIconClick(index, false, false, true, event)}>
														<i className="fa-solid fa-ellipsis-vertical"></i>
													</div>
													<div className={`options ${recentOptionsListActiveIndex === index ? 'active-options-list' : ''}`}>
														<p
															onClick={(event) => {
																event.stopPropagation();
																handleOptionItemClick(true, false, false);
																openModaldeleteres();
																setPdfFileid(pdfr.file_id);
															}}
															onMouseEnter={() => handleToolTip(index, true, false, false, true)}
															onMouseLeave={() => handleToolTipclose()}
														>
															<i className="fa-solid fa-trash"></i>
														</p>
														<p
															onClick={(event) => {
																event.stopPropagation();
																handleOptionItemClick(true, false, false);
																handlechangepdftype(event, pdfr.file_id, 'private');
															}}
															onMouseEnter={() => handleToolTip(index, false, true, false, true)}
															onMouseLeave={() => handleToolTipclose()}
														>
															<i className="fa-solid fa-lock-open"></i>
														</p>
														<p
															onClick={(event) => {
																event.stopPropagation();
																handleOptionItemClick(true, false, false);
															}}
															onMouseEnter={() => handleToolTip(index, false, false, true, true)}
															onMouseLeave={() => handleToolTipclose()}
														>
															<i className="fa-regular fa-bookmark"></i>
														</p>
													</div>
												</div>

												<div className={`tips1 ${deletetool === index ? 'tips-show-active' : ''}`}>
													<span className="tooltiptext1 ">delete</span>
												</div>

												<div className={`tips2 ${movetool === index ? 'tips-show-active' : ''}`}>
													<span className="tooltiptext2">Make {pdfr.classified === 'private' ? 'Public' : 'Private'}</span>
												</div>
												<div className={`tips3 ${bookmarktool === index ? 'tips-show-active' : ''}`}>
													<span className="tooltiptext3">Bookmark</span>
												</div>

												<div className="mylib-in">
													<img src="a.jpg" alt="alt" />
												</div>
											</div>
											<div className="mylib-matter">
												{/* <p>1st Year, Semester 1 CSE, ENGLISH, UNIT 1, ref{1}</p> */}
												<p>{pdfr.year}</p>
												<p>{pdfr.semester}</p>
												<p>
													{pdfr.branch},{pdfr.subject_name}
												</p>
												<p>
													{pdfr.unit_no},{`ref{${pdfr.refer}}`}
												</p>
											</div>
										</li>
									))}
								</ul>
							</div>
							<div id="myModal" className="modal" style={{ display: modalOpendeleteres ? 'block' : 'none' }} onClick={handleOutsideClick}>
								<div className="modal-content">
									<div className="main-text">
										<p className="heade">Delete PDF</p>
										<span className="close" onClick={closeModal}>
											&times;
										</span>
									</div>
									<div className="text1">Are You sure you want to delete..!</div>
									<div className="text-btns">
										<button
											className="p"
											onClick={(e) => {
												Optionclose(true);
												deletePdf(e, true, 'recent');
												closeModal();
											}}
										>
											YES
										</button>
										<button
											className="p"
											onClick={(e) => {
												Optionclose(true);
												closeModal();
											}}
										>
											NO
										</button>
									</div>
								</div>
							</div>
							<div className="mylib-row2 mylib-rows" ref={section2Ref}>
								<div className="mylib-row1-header">
									<h1>Private Uploads</h1>
									<div className="mylib-search">
										<input type="text" placeholder="Search PDFs" value={searchPrivateQuery} required onChange={handleSearchPrivateChange} />
										<div className="mylib-search-icon">
											<i className="fa-solid fa-magnifying-glass"></i>
										</div>
									</div>
								</div>
								{Object.keys(privateBranchGroups).map((branch) => (
									<div key={branch}>
										<h2 className="mylib-starts-branch">{branch}</h2>
										<ul className="branch-list">
											{privateBranchGroups[branch].map((pdf, index) => {
												// Check if any value in the PDF matches the search query
												const matchesSearch = Object.values(pdf).some((value) => {
													if (typeof value === 'string') {
														return value.toLowerCase().includes(searchPrivateQuery.toLowerCase());
													}
													return false;
												});

												// If there's no search query or the PDF matches the search query, render it
												if (!searchPrivateQuery || matchesSearch) {
													return (
														<li key={index} className="row">
															<div className="mylib-pdf" ref={mylibPdfRef} onClick={() => handlePdfClick(pdf.file_id, 'private')}>
																<div className="ss">
																	<div className="options-icon" onClick={(event) => handleOptionsIconClick(index, true, false, false, event)}>
																		<i className="fa-solid fa-ellipsis-vertical"></i>
																	</div>
																	<div className={`options ${privateOptionsListActiveIndex === index ? 'active-options-list' : ''}`}>
																		<p
																			onClick={(event) => {
																				event.stopPropagation();
																				handleOptionItemClick(true, false, false);
																				openModaldeletepriv();
																				setPdfFileid(pdf.file_id);
																			}}
																			onMouseEnter={() => handleToolTip(index, true, false, false, true)}
																			onMouseLeave={() => handleToolTipclose()}
																		>
																			<i className="fa-solid fa-trash"></i>
																		</p>
																		<p
																			onClick={(event) => {
																				event.stopPropagation();
																				handleOptionItemClick(true, false, false);
																				handlechangepdftype(event, pdf.file_id, 'private');
																			}}
																			onMouseEnter={() => handleToolTip(index, false, true, false, true)}
																			onMouseLeave={() => handleToolTipclose()}
																		>
																			<i className="fa-solid fa-lock-open"></i>
																		</p>
																		<p
																			onClick={(event) => {
																				event.stopPropagation();
																				handleOptionItemClick(true, false, false);
																			}}
																			onMouseEnter={() => handleToolTip(index, false, false, true, true)}
																			onMouseLeave={() => handleToolTipclose()}
																		>
																			<i className="fa-regular fa-bookmark"></i>
																		</p>
																	</div>
																</div>

																<div className={`tips1 ${deletetool === index ? 'tips-show-active' : ''}`}>
																	<span className="tooltiptext1 ">delete</span>
																</div>

																<div className={`tips2 ${movetool === index ? 'tips-show-active' : ''}`}>
																	<span className="tooltiptext2">Make Public</span>
																</div>
																<div className={`tips3 ${bookmarktool === index ? 'tips-show-active' : ''}`}>
																	<span className="tooltiptext3">Bookmark</span>
																</div>

																<div className="mylib-in">
																	<img src="a.jpg" alt="alt" />
																</div>
																<div className="mylib-matter">
																	<p>{pdf.year}</p>
																	<p>{pdf.semester}</p>
																	<p>
																		{pdf.branch},{pdf.subject_name}
																	</p>
																	<p>
																		{pdf.unit_no},{`ref{${pdf.refer}}`}
																	</p>
																</div>
															</div>
														</li>
													);
												} else {
													return null; // Skip rendering this PDF
												}
											})}
										</ul>
									</div>
								))}
							</div>
							<div id="myModal" className="modal" style={{ display: modalOpendeletepriv ? 'block' : 'none' }} onClick={handleOutsideClick}>
								<div className="modal-content">
									<div className="main-text">
										<p className="heade">Delete PDF</p>
										<span className="close" onClick={closeModal}>
											&times;
										</span>
									</div>
									<div className="text1">Are You sure you want to delete..!</div>
									<div className="text-btns">
										<button
											className="p"
											onClick={(e) => {
												Optionclose(true);
												deletePdf(e, true, 'private');
												closeModal();
											}}
										>
											YES
										</button>
										<button
											className="p"
											onClick={(e) => {
												Optionclose(true);
												closeModal();
											}}
										>
											NO
										</button>
									</div>
								</div>
							</div>

							<div className="mylib-row2 mylib-rows" ref={section3Ref}>
								<div className="mylib-row1-header">
									<h1>Public Uploads</h1>
									<div className="mylib-search">
										<input type="text" placeholder="Search PDFs" value={searchPublicQuery} required onChange={handleSearchPublicChange} />
										<div className="mylib-search-icon">
											<i className="fa-solid fa-magnifying-glass"></i>
										</div>
									</div>
								</div>
								{Object.keys(publicBranchGroups).map((branch) => (
									<div key={branch}>
										<h2 className="mylib-starts-branch">{branch}</h2>
										<ul className="branch-list">
											{publicBranchGroups[branch].map((pdf, index) => {
												// Check if any value in the PDF matches the search query
												const matchesSearch = Object.values(pdf).some((value) => {
													if (typeof value === 'string') {
														return value.toLowerCase().includes(searchPublicQuery.toLowerCase());
													}
													return false;
												});

												// If there's no search query or the PDF matches the search query, render it
												if (!searchPublicQuery || matchesSearch) {
													return (
														<li key={index} className="row">
															<div className="mylib-pdf" ref={mylibPdfRef} onClick={() => handlePdfClick(pdf.file_id, 'public')}>
																<div className="ss">
																	<div className="options-icon" onClick={(event) => handleOptionsIconClick(index, false, true, false, event)}>
																		<i className="fa-solid fa-ellipsis-vertical"></i>
																	</div>
																	<div className={`options ${publicOptionsListActiveIndex === index ? 'active-options-list' : ''}`}>
																		<p
																			onClick={(event) => {
																				event.stopPropagation();
																				handleOptionItemClick(false, true, false);
																				openModaldeletepub();
																				setPdfFileid(pdf.file_id);
																			}}
																			onMouseEnter={() => handleToolTip(index, true, false, false, false)}
																			onMouseLeave={() => handleToolTipclose()}
																		>
																			<i className="fa-solid fa-trash"></i>
																		</p>
																		<p
																			onClick={(event) => {
																				event.stopPropagation();
																				handleOptionItemClick(false, true, false);
																				handlechangepdftype(event, pdf.file_id, 'public');
																			}}
																			onMouseEnter={() => handleToolTip(index, false, true, false, false)}
																			onMouseLeave={() => handleToolTipclose()}
																		>
																			<i className="fa-solid fa-lock-open"></i>
																		</p>
																		<p
																			onClick={(event) => {
																				event.stopPropagation();
																				handleOptionItemClick(false, true, false);
																			}}
																			onMouseEnter={() => handleToolTip(index, false, false, true, false)}
																			onMouseLeave={() => handleToolTipclose()}
																		>
																			<i className="fa-regular fa-bookmark"></i>
																		</p>
																	</div>
																</div>

																<div className={`tips1 ${deletetoolp === index ? 'tips-show-active' : ''}`}>
																	<span className="tooltiptext1 ">delete</span>
																</div>
																<div className={`tips2 ${movetoolp === index ? 'tips-show-active' : ''}`}>
																	<span className="tooltiptext2 active-tooltip">Make Public</span>
																</div>
																<div className={`tips3 ${bookmarktoolp === index ? 'tips-show-active' : ''}`}>
																	<span className="tooltiptext3">Bookmark</span>
																</div>

																<div className="mylib-in">
																	<img src="a.jpg" alt="alt" />
																</div>
																<div className="mylib-matter">
																	<p>{pdf.year}</p>
																	<p>{pdf.semester}</p>
																	<p>
																		{pdf.branch},{pdf.subject_name}
																	</p>
																	<p>
																		{pdf.unit_no},{`ref{${pdf.refer}}`}
																	</p>
																</div>
															</div>
														</li>
													);
												} else {
													return null; // Skip rendering this PDF
												}
											})}
										</ul>
									</div>
								))}
							</div>
							<div id="myModal" className="modal" style={{ display: modalOpendeletepub ? 'block' : 'none' }} onClick={handleOutsideClick}>
								<div className="modal-content">
									<div className="main-text">
										<p className="heade">Delete PDF</p>
										<span className="close" onClick={closeModal}>
											&times;
										</span>
									</div>
									<div className="text1">Are You sure you want to delete..!</div>
									<div className="text-btns">
										<button
											className="p"
											onClick={(e) => {
												Optionclose(true);
												deletePdf(e, true, 'public');
												closeModal();
											}}
										>
											YES
										</button>
										<button
											className="p"
											onClick={(e) => {
												Optionclose(true);
												closeModal();
											}}
										>
											NO
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DraggableNavigationMenu;
