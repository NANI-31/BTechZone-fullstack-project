import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
import './studentlib.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import per from './a.jpg'




function Plib() {
  // const [selectedDiv, setSelectedDiv] = useState(null);

  // const handleDivClick = (divId) => {
  //   setSelectedDiv(divId);

  //       console.log('Response from server:', divId);

  // };



  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  const [usersData, setUsersData] = useState([]);
  const [usery, setUsery] = useState(null);
  const [eemail, setEemail] = useState('');
  const usersDataExcludingClient = usersData.filter(user => user.email !== eemail);
  const [pdfDataPublicall, setPdfDataPublicall] = useState([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('userdata');
    if (storedUser) {
      setUsery(prevUser => {
        const newUser = JSON.parse(storedUser);
        setEemail(newUser.email);
        return newUser;

      });
    }
    const fetchData1 = async () => {

      try {
        const response = await axios.post('http://localhost:5000/mylib-get-all-susers', { person: "student" });
        const { pdfData } = response.data;
        setUsersData(pdfData.sreferences)
        // console.log(pdfData.sreferences.person)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchData3 = async () => {
      const storedUser = sessionStorage.getItem('userdata');
      const newUser = JSON.parse(storedUser);
      const email = newUser.email
      const person = 'student'
      try {
        const response = await axios.post('http://localhost:5000/mylib-get-all-public', { person });
        const { pdfData } = response.data;
        setPdfDataPublicall(pdfData.allreferences)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData1();
    fetchData3();

  }, []);
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


  const sortedPdfPublicData = pdfDataPublicall.sort((a, b) => {
    const yearValueA = getYearValue(a.year, a.semester);
    const yearValueB = getYearValue(b.year, b.semester);
    return yearValueA - yearValueB;
  });
  const [publicBranchGroups, setPublicBranchGroups] = useState({});
  useEffect(() => {

    const updatePublicBranchGroups = () => {
      const updatedPublicBranchGroups = {};
      sortedPdfPublicData.forEach(pdf => {
        const branch = pdf.branch;
        if (!updatedPublicBranchGroups[branch]) {
          updatedPublicBranchGroups[branch] = [];
        }
        updatedPublicBranchGroups[branch].push(pdf);
      });
      setPublicBranchGroups(updatedPublicBranchGroups);
    };

    updatePublicBranchGroups();
  }, [pdfDataPublicall]);




  // users filter
  const [searchQuery, setSearchQuery] = useState('');
  // function filterUsers(usersData) {
  //   const nameMatch = usersData.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   const branchMatch = usersData.branch.toLowerCase().includes(searchQuery.toLowerCase());
  //   return nameMatch || branchMatch;
  // }
  function filterUsers(user) {
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.trim() !== '');

    // If search query is empty, display all users
    if (searchTerms.length === 0) {
      return true;
    }

    // Check if both name and branch match any search term
    return searchTerms.every(term => {
      const nameMatch = user.name.toLowerCase().includes(term);
      const branchMatch = user.branch.toLowerCase().includes(term);
      return nameMatch || branchMatch;
    });
  }

  // Event handler to update search query
  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  // Filtered users based on search query
  const filteredUsers = usersData.filter(filterUsers);

  // end of users filter


  const handlePdfClick = async (uniqueId) => {
    const accessType = "public";
    const person = "student"
    try {
      // Make API call to send data to the server
      const response = await axios.post('http://localhost:5000/libx', { uniqueId, accessType, person }, {
        responseType: 'arraybuffer',
      });
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };



  // State for search query
  const [searchPrivateQuery, setSearchPrivateQuery] = useState('');
  // Handle search query change
  const handleSearchPrivateChange = event => {
    setSearchPrivateQuery(event.target.value);
  };



  // State for search query
  const [searchPublicQuery, setSearchPublicQuery] = useState('');
  // Handle search query change
  const handleSearchPublicChange = event => {
    setSearchPublicQuery(event.target.value);
  };
  const [dsdataname, setDsdataname] = useState('');
  const [dsdatayear, setDsdatayear] = useState('');
  const [dsdatasem, setDsdatasem] = useState('');
  const [dsdatabranch, setDsdatabranch] = useState('');
  const [dsdataemail, setDsdataemail] = useState('');
  const [dsdataPic, setDsdataPic] = useState('');

  const [pdfDataPublic, setPdfDataPublic] = useState([]);

  const getsUserData = async (user) => {

    setDsdataname(user.name);
    setDsdatayear(user.year);
    setDsdatasem(user.semester);
    setDsdatabranch(user.branch);
    setDsdataemail(user.email);
    setDsdataPic(user.pic);
    console.log(user.person)
    const mail = user.email
    try {
      const response = await axios.post('http://localhost:5000/plib-get-pdfs', { mail });
      console.log(response.data)
      const { pdfData } = response.data;
      setPdfDataPublic(pdfData.references)
      console.log(pdfData.references)
   
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const [privateOptionsListActiveIndex, setPrivateOptionsListActiveIndex] = useState(null);
  const [publicOptionsListActiveIndex, setPublicOptionsListActiveIndex] = useState(null);
  const [recentOptionsListActiveIndex, setRecentOptionsListActiveIndex] = useState(null);
  const mylibPdfRef = useRef(null);

  const handleOptionItemClick = (isPrivate, isPublic, isRecent) => {
    if (isPrivate) {
      setPrivateOptionsListActiveIndex(null);
    } else if (isPublic) {
      setPublicOptionsListActiveIndex(null);
    } else if (isRecent) {
      setRecentOptionsListActiveIndex(null);
    }
  };

  const handleOptionsIconClick = (index, isPrivate, isPublic, isRecent, event) => {
    event.stopPropagation();
    if (isPrivate) {
      setPrivateOptionsListActiveIndex(prevIndex => (prevIndex === index ? null : index));
      setPublicOptionsListActiveIndex(null); // Remove active class from public options list
      setRecentOptionsListActiveIndex(null); // Remove active class from recent options list
    } else if (isPublic) {
      setPublicOptionsListActiveIndex(prevIndex => (prevIndex === index ? null : index));
      setPrivateOptionsListActiveIndex(null); // Remove active class from private options list
      setRecentOptionsListActiveIndex(null); // Remove active class from recent options list
    } else if (isRecent) {
      setRecentOptionsListActiveIndex(prevIndex => (prevIndex === index ? null : index));
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
  const handleToolTip = (index, isD, isP) => {
    if (isP) {
      if (isD) {
        setBookmarktool(prevIndex => (prevIndex === index ? null : index)); // Remove active class from recent options list
      } else {
        setBookmarktool(null); // Remove active class from recent options list
      } 
    }
    else {
      if (!isD) {
        setBookmarktoolp(prevIndex => (prevIndex === index ? null : index)); // Remove active class from recent options list
        } else  {
         setBookmarktoolp(null); // Remove active class from recent options list
      }
    }
  };
  const handleToolTipclose = () => {
    setBookmarktool(null);
    setBookmarktoolp(null);
  }

  const handlebookmark = async (e, fileid) => {
    e.stopPropagation();
    e.preventDefault();
    const person = 'student';
    const youmail = usery.email;
    const response = await axios.post('http://localhost:5000/plib-bookmark', { fileid, person, youmail });
    if (response.data === 'ok') {
      console.log("ok");
    }
    else if (response.data === 'no') {
      console.log("no");
    }
    else if (response.data === 'exits') {
      console.log("exits");
    }
  }




  return (
    <div className='slib-body'>
      <div className='slib-back'>
        <Link to="/publiclibrary" className='back-slib'>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>
      <div className='mmm'>
        <div className="s-lib-main">
          <div className="slib-container" ref={section1Ref}>
            <div className="slib-row">
              <div className='slib-persons-section'>
                <div className='slib-all-persons slib-persons-section-same'>
                  <div className='slib-person-search'>
                    <input size="30" type='text' placeholder='Search User' value={searchQuery} onChange={handleSearchChange} />
                    <div className='slib-person-search-icon'>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                  </div>
                  <div className='persons-list'>
                    <ul>
                      { usersDataExcludingClient.map((user, index) => (
                        <li key={index} onClick={() => getsUserData(user)}>
                          <div className='plib-person'>
                            <div className='plib-person-img'>
                              {user.pic && <img src={user.pic} alt="User Image" />}
                            </div>
                            <div className='plib-person-name'>
                              <h3>{user.name}</h3>
                              <h3>{user.branch}</h3>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='slib-person-details slib-persons-section-same'>
                  <div className='slib-ss-img'>
                    <div className='slib-selected-person-img'>
                      <img src={dsdataname ? dsdataPic : per} alt='p'></img>
                    </div>
                  </div>
                  <div className='slib-person-detail'>
                    <div className='slib-keys'>
                      <p>Name</p>
                      <p>Year</p>
                      <p>Semester</p>
                      <p>Branch</p>
                      <p>Email</p>
                      <p>Uploads on CSE</p>
                    </div>
                    <div className='dots'>
                      <p>:</p>
                      <p>:</p>
                      <p>:</p>
                      <p>:</p>
                      <p>:</p>
                      <p>:</p>
                    </div>
                    <div className='slib-values'>
                      <p>{dsdataname}</p>
                      <p>{dsdatayear}</p>
                      <p>{dsdatasem}</p>
                      <p>{dsdatabranch}</p>
                      <p>{dsdataemail}</p>
                    </div>

                  </div>
                  
                </div>
              </div>
              <div className="mylib-row2 mylib-rows" ref={section3Ref}>
                <div className="mylib-row1-header">
                  <h1>Public Uploads</h1>
                  <div className='mylib-search'>
                    <input
                      type="text"
                      placeholder="Search PDFs"
                      value={searchPublicQuery}
                      required
                      onChange={handleSearchPublicChange}
                    />
                    <div className='mylib-search-icon'>

                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                  </div>
                </div>
                {pdfDataPublic && (
                  <ul>
                    {pdfDataPublic.map((pdfr, index) => {
                      const matchesSearch = Object.values(pdfr).some(value => {
                        if (typeof value === 'string') {
                          return value.toLowerCase().includes(searchPublicQuery.toLowerCase());
                        }
                        return false;
                      });
                      if (!searchPublicQuery || matchesSearch) {
                        return (
                          <li key={index}>
                            <div className="mylib-pdf"
                              onClick={() => handlePdfClick(pdfr.file_id)}
                            >
                              <div className='ss'>
                            <div className='options-icon'
                              onClick={(e) => handlebookmark(e, pdfr.file_id)}
                              onMouseEnter={() => handleToolTip(index, true, true)}
                              onMouseLeave={() => handleToolTipclose()}>
                              <i className="fa-regular fa-bookmark" ></i>
                            </div>
                            <div className={`options ${publicOptionsListActiveIndex === index ? 'sactive-options-list' : ''}`}>
                              <p onClick={(event) => { event.stopPropagation(); handleOptionItemClick(false, true, false); }}>
                                <i className="fa-regular fa-bookmark"></i>
                              </p>
                            </div>
                          </div>

                          <div className={`stips1 ${bookmarktool === index ? 'stips-show-active' : ''}`}>
                            <span className='tooltiptext1'>Bookmark</span>
                          </div>
                              <div className="mylib-in">
                                <img src="a.jpg" alt="alt" />
                              </div>
                            </div>
                            <div className="mylib-matter">
                              <p>{pdfr.year}</p>
                              <p>{pdfr.semester}</p>
                              <p>{pdfr.branch},{pdfr.subject_name}</p>
                              <p>{pdfr.unit_no},{`ref{${pdfr.refer}}`}</p>
                            </div>
                          </li>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </ul>
                )
                }
              </div>
              <div className="mylib-row2 mylib-rows" ref={section3Ref}>
                <div className="mylib-row1-header">
                  <h1>All Uploads</h1>
                  <div className='mylib-search'>
                    <input
                      type="text"
                      placeholder="Search PDFs"
                      value={searchPrivateQuery}
                      required
                      onChange={handleSearchPrivateChange}
                    />
                    <div className='mylib-search-icon'>

                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                  </div>
                </div>
                {pdfDataPublicall && (
                  <ul>
                    {pdfDataPublicall.map((pdfr, index) => (
                      <li key={index}>
                        <div className="mylib-pdf"
                          onClick={() => handlePdfClick(pdfr.file_id)}
                        >
                          <div className='ss'>
                            <div className='options-icon'
                              onClick={(e) => handlebookmark(e, pdfr.file_id)}
                              onMouseEnter={() => handleToolTip(index, false, false, true, false)}
                              onMouseLeave={() => handleToolTipclose()}>
                              <i className="fa-regular fa-bookmark" ></i>
                            </div>
                            <div className={`options ${publicOptionsListActiveIndex === index ? 'sactive-options-list' : ''}`}>
                              <p onClick={(event) => { event.stopPropagation(); handleOptionItemClick(false, true, false); }}>
                                <i className="fa-regular fa-bookmark"></i>
                              </p>
                            </div>
                          </div>

                          <div className={`stips1 ${bookmarktoolp === index ? 'stips-show-active' : ''}`}>
                            <span className='tooltiptext1'>Bookmark</span>
                          </div>
                          <div className="mylib-in">
                            <img src="a.jpg" alt="alt" />
                          </div>
                        </div>
                        <div className="mylib-matter">
                          <p>{pdfr.year}</p>
                          <p>{pdfr.semester}</p>
                          <p>{pdfr.branch},{pdfr.subject_name}</p>
                          <p>{pdfr.unit_no},{`ref{${pdfr.refer}}`}</p>
                        </div>
                      </li>
                    ))
                    }
                  </ul>
                )
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Plib;
