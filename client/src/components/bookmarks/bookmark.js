import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bookmark.css';
function Bookmark() {
	const [activeTab, setActiveTab] = useState('student');

	const handleTabChange = (tabName) => {
		setActiveTab(tabName);
	};
	const [usery, setUsery] = useState(null);
	const [pdfdata, setPdfdata] = useState(null);

	useEffect(() => {
		const storedUser = sessionStorage.getItem('userdata');
		const newUser1 = JSON.parse(storedUser);
		const person = newUser1.person;
		const email = newUser1.email;
		if (storedUser) {
			setUsery((prevUser) => {
				const newUser = JSON.parse(storedUser);
				return newUser;
			});
		}
		const fetchData1 = async () => {
			try {
				const response = await axios.post('http://localhost:5000/my-bookmarks', { person, email });
				if (response.data === 'ok') {
					console.log('ok');
				}
				const { pdfData } = response.data;
				setPdfdata(pdfData.references);
				// console.log(pdfData.sreferences.name)
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData1();
	}, []);

	return (
		<div className="bookmarks-body">
			<div className="bookmarks-container">
				<div className="bookmarks-header">
					<h1>BookMarks</h1>
				</div>
				<div className="bookmarks-nav-links">
					<ul className="bookmarks-ul">
						<li className={activeTab === 'student' ? 'bookmarks-link bookmarks-link-active' : 'bookmarks-link '} onClick={() => handleTabChange('student')}>
							Student
						</li>
						<li className={activeTab === 'teacher' ? 'bookmarks-link bookmarks-link-active' : 'bookmarks-link '} onClick={() => handleTabChange('teacher')}>
							Teacher
						</li>
						<li className={activeTab === 'other' ? 'bookmarks-link bookmarks-link-active' : 'bookmarks-link '} onClick={() => handleTabChange('other')}>
							Other
						</li>
					</ul>
				</div>
				<div className={activeTab === 'student' ? 'mylib-row2 bookmarks-rows bookmark-show-active' : 'mylib-row2 bookmarks-rows'}>
					<div className="mylib-row1-header">
						<h1>Student Bookmarks</h1>
						<div className="mylib-search">
							<input
								type="text"
								placeholder="Search PDFs"
								//   value={searchPrivateQuery}
								required
								//   onChange={handleSearchPrivateChange}
							/>
							<div className="mylib-search-icon">
								<i className="fa-solid fa-magnifying-glass"></i>
							</div>
						</div>
					</div>
					<div>
						{pdfdata && (
							<ul>
								{pdfdata.map((pdfr, index) => (
									<li key={index} className="row">
										<div className="mylib-pdf">
											<div className="mylib-in">
												<img src="a.jpg" alt="alt" />
											</div>
										</div>
										<div className="mylib-matter">
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
						)}
					</div>
				</div>
				<div className={activeTab === 'teacher' ? 'mylib-row2 bookmarks-rows bookmark-show-active' : 'mylib-row2 bookmarks-rows'}>
					<div className="mylib-row1-header">
						<h1>teacher Bookmarks</h1>
						<div className="mylib-search">
							<input
								type="text"
								placeholder="Search PDFs"
								//   value={searchPrivateQuery}
								required
								//   onChange={handleSearchPrivateChange}
							/>
							<div className="mylib-search-icon">
								<i className="fa-solid fa-magnifying-glass"></i>
							</div>
						</div>
					</div>
					<div>
						<ul className="branch-list">
							<li className="row">
								<div className="mylib-pdf">
									<div className="mylib-in">
										<img src="a.jpg" alt="alt" />
									</div>
									<div className="mylib-matter">
										<p>as</p>
										<p>sdcs</p>
										<p>scafcsvews,aefsaefs</p>
										<p>ascsadcs</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className={activeTab === 'other' ? 'mylib-row2 bookmarks-rows bookmark-show-active' : 'mylib-row2 bookmarks-rows'}>
					<div className="mylib-row1-header">
						<h1>other Bookmarks</h1>
						<div className="mylib-search">
							<input
								type="text"
								placeholder="Search PDFs"
								//   value={searchPrivateQuery}
								required
								//   onChange={handleSearchPrivateChange}
							/>
							<div className="mylib-search-icon">
								<i className="fa-solid fa-magnifying-glass"></i>
							</div>
						</div>
					</div>
					<div>
						<ul className="branch-list">
							<li className="row">
								<div className="mylib-pdf">
									<div className="mylib-in">
										<img src="a.jpg" alt="alt" />
									</div>
									<div className="mylib-matter">
										<p>as</p>
										<p>sdcs</p>
										<p>scafcsvews,aefsaefs</p>
										<p>ascsadcs</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Bookmark;
