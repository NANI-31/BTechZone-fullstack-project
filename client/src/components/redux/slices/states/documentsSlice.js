import { createSlice } from '@reduxjs/toolkit';

const initaialState = {
	// year: '',
	// semester: '',
	// branch: '',
	// subject_name: '',
	// unit_no: '',
	// file_name: '',
	// refer: '',
	// classified: '',
	// file_id: '',
	// file_pic: '',
	documents: '',
};

const documentSlice = createSlice({
	name: 'documents',
	initialState: initaialState,
	reducers: {
		// login
		setDocuments: (state, action) => {
			console.log(action.payload);
			state.documents = action.payload;
			// state.year = action.payload.filesWithImages[0].fileDetails.year;
			// state.semester = action.payload.filesWithImages[0].fileDetails.semester;
			// state.branch = action.payload.filesWithImages[0].fileDetails.branch;
			// state.subject_name = action.payload.filesWithImages[0].fileDetails.subject_name;
			// state.unit_no = action.payload.filesWithImages[0].fileDetails.unit_no;
			// state.file_name = action.payload.filesWithImages[0].fileDetails.file_name;
			// state.refer = action.payload.filesWithImages[0].fileDetails?.refer || '';
			// state.classified = action.payload.documentDetails.classified;
			// state.file_id = action.payload.filesWithImages[0].fileDetails.file.file_id;
			// state.file_pic = action.payload.filesWithImages[0].imageUrl;
		},
		// logout
		logoutDocuments: (state, action) => {
			state._id = '';
			state.name = '';
			state.email = '';
			state.pic = '';
			state.phoneNo = '';
			state.year = '';
			state.branch = '';
			state.semester = '';
			state.person = '';
			state.token = '';
			state.socketConnection = null;
		},
		clearDocuments() {
			return initaialState;
		},
		// clearUser: () => {
		// 	initaialState;
		// },
	},
});
// const getYearValue = (year, semester) => {
// 	let yearValue = 0;
// 	switch (year) {
// 		case '1st Year':
// 			yearValue = 1;
// 			break;
// 		case '2nd Year':
// 			yearValue = 2;
// 			break;
// 		case '3rd Year':
// 			yearValue = 3;
// 			break;
// 		case '4th Year':
// 			yearValue = 4;
// 			break;
// 		default:
// 			yearValue = 0; // You might want to handle other cases
// 	}

// 	if (semester === 'Semester 2') {
// 		yearValue += 0.5; // Add 0.5 to indicate second semester
// 	}

// 	return yearValue;
// };
// const sortedPdfPublicData = pdfDataPublic.sort((a, b) => {
// 	const yearValueA = getYearValue(a.year, a.semester);
// 	const yearValueB = getYearValue(b.year, b.semester);
// 	return yearValueA - yearValueB;
// });
// const [publicBranchGroups, setPublicBranchGroups] = useState({});
// useEffect(() => {
// 	const updatePublicBranchGroups = () => {
// 		const updatedPublicBranchGroups = {};
// 		sortedPdfPublicData.forEach((pdf) => {
// 			const branch = pdf.branch;
// 			if (!updatedPublicBranchGroups[branch]) {
// 				updatedPublicBranchGroups[branch] = [];
// 			}
// 			updatedPublicBranchGroups[branch].push(pdf);
// 		});
// 		setPublicBranchGroups(updatedPublicBranchGroups);
// 	};
// 	updatePublicBranchGroups();
// }, [pdfDataPublic]);
// {
// 	Object.keys(publicBranchGroups).map((branch) => (
// 		<div key={branch}>
// 			<h2 className="mylib-starts-branch">{branch}</h2>
// 			<ul className="branch-list">
// 				{publicBranchGroups[branch].map((pdf, index) => {
// 					// Check if any value in the PDF matches the search query
// 					const matchesSearch = Object.values(pdf).some((value) => {
// 						if (typeof value === 'string') {
// 							return value.toLowerCase().includes(searchPublicQuery.toLowerCase());
// 						}
// 						return false;
// 					});

// 					// If there's no search query or the PDF matches the search query, render it
// 					if (!searchPublicQuery || matchesSearch) {
// 						return (
// 							<li key={index} className="row">
// 								<div className="mylib-pdf" ref={mylibPdfRef} onClick={() => handlePdfClick(pdf.file_id, 'public')}>
// 									<div className="ss">
// 										<div className="options-icon" onClick={(event) => handleOptionsIconClick(index, false, true, false, event)}>
// 											<i className="fa-solid fa-ellipsis-vertical"></i>
// 										</div>
// 										<div className={`options ${publicOptionsListActiveIndex === index ? 'active-options-list' : ''}`}>
// 											<p
// 												onClick={(event) => {
// 													event.stopPropagation();
// 													handleOptionItemClick(false, true, false);
// 													openModaldeletepub();
// 													setPdfFileid(pdf.file_id);
// 												}}
// 												onMouseEnter={() => handleToolTip(index, true, false, false, false)}
// 												onMouseLeave={() => handleToolTipclose()}
// 											>
// 												<i className="fa-solid fa-trash"></i>
// 											</p>
// 											<p
// 												onClick={(event) => {
// 													event.stopPropagation();
// 													handleOptionItemClick(false, true, false);
// 													handlechangepdftype(event, pdf.file_id, 'public');
// 												}}
// 												onMouseEnter={() => handleToolTip(index, false, true, false, false)}
// 												onMouseLeave={() => handleToolTipclose()}
// 											>
// 												<i className="fa-solid fa-lock-open"></i>
// 											</p>
// 											<p
// 												onClick={(event) => {
// 													event.stopPropagation();
// 													handleOptionItemClick(false, true, false);
// 												}}
// 												onMouseEnter={() => handleToolTip(index, false, false, true, false)}
// 												onMouseLeave={() => handleToolTipclose()}
// 											>
// 												<i className="fa-regular fa-bookmark"></i>
// 											</p>
// 										</div>
// 									</div>

// 									<div className={`tips1 ${deletetoolp === index ? 'tips-show-active' : ''}`}>
// 										<span className="tooltiptext1 ">delete</span>
// 									</div>
// 									<div className={`tips2 ${movetoolp === index ? 'tips-show-active' : ''}`}>
// 										<span className="tooltiptext2 active-tooltip">Make Public</span>
// 									</div>
// 									<div className={`tips3 ${bookmarktoolp === index ? 'tips-show-active' : ''}`}>
// 										<span className="tooltiptext3">Bookmark</span>
// 									</div>

// 									<div className="mylib-in">
// 										<img src="a.jpg" alt="alt" />
// 									</div>
// 									<div className="mylib-matter">
// 										<p>{pdf.year}</p>
// 										<p>{pdf.semester}</p>
// 										<p>
// 											{pdf.branch},{pdf.subject_name}
// 										</p>
// 										<p>
// 											{pdf.unit_no},{`ref{${pdf.refer}}`}
// 										</p>
// 									</div>
// 								</div>
// 							</li>
// 						);
// 					} else {
// 						return null; // Skip rendering this PDF
// 					}
// 				})}
// 			</ul>
// 		</div>
// 	));
// }

export const { setDocuments, logoutDocuments, clearDocuments } = documentSlice.actions;
export default documentSlice.reducer;
