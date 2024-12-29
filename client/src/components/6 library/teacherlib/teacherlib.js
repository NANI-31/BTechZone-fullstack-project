import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import './teacherlib.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import per from './a.jpg'



 
function Tlib() {
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
  const [pdfDataPrivate, setPdfDataPrivate] = useState([]);

  useEffect(() => {
    const fetchData1 = async () => {

      try {
        const response = await axios.post('http://localhost:5000/mylib-get-all-susers',{ person: "teacher"});
        const { pdfData } = response.data;
        setUsersData(pdfData.sreferences)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchData2 = async () => {
      const storedPdfData = sessionStorage.getItem('userPdfDataPrivate');
      if (storedPdfData) {
        setPdfDataPrivate(JSON.parse(storedPdfData))
      }
      else {
        try {
          const response = await axios.post('http://localhost:5000/mylib-get-private');
          const { pdfData } = response.data;
          setPdfDataPrivate(pdfData.references)
          sessionStorage.setItem('userPdfDataPrivate', JSON.stringify(pdfData.references));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    const fetchData3 = async () => {
      try {
        const response = await axios.post('http://localhost:5000/mylib-get-public');
        const { pdfData } = response.data;
        setPdfDataPublic(pdfData.references)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData1();
    fetchData2();
    fetchData3();

  }, []);
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
    try {
      // Make API call to send data to the server
      const response = await axios.get(`http://localhost:5000/mylibopenpdf/?uniqueId=${uniqueId}`, {
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
  const [dsdatabranch, setDsdatabranch] = useState('');
  const [dsdataemail, setDsdataemail] = useState('');
  const [dsdataup, setDsdataup] = useState(false);

  const [pdfDataPublic, setPdfDataPublic] = useState([]);

  const getsUserData = async (user) => {
    setDsdataname(user.name);
    setDsdatabranch(user.branch);
    setDsdataemail(user.email);
    const mail = user.email
    try {
      const response = await axios.post('http://localhost:5000/plib-get-pdfs', { mail });
      console.log(response.data)
      const { pdfData } = response.data;
      setPdfDataPublic(pdfData.references)
      console.log(pdfData.references)
      setDsdataup(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

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
                      {filteredUsers.map((user, index) => (
                        <li key={index} onClick={() => getsUserData(user)}>
                          <div className='plib-person'>
                            <div className='plib-person-img'>
                              <img src={per} alt='pp' />
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
                      <img src={per} alt='p'></img>
                    </div>
                  </div>
                  <div className='slib-person-detail'>
                    <div className='slib-keys'>
                      <p>Name</p>
                      <p>Branch</p>
                      <p>Email</p>
                      <p>Uploads on CSE</p>
                    </div>
                    <div className='dots'>
                      <p>:</p>
                      <p>:</p>
                      <p>:</p>
                      <p>:</p>
                    </div>
                    <div className='slib-values'>
                      <p>{dsdataname}</p>
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
                    {pdfDataPublic.map((pdfr, index) => (
                      <li key={index}>
                        <div className="mylib-pdf"
                          onClick={() => handlePdfClick(pdfr.file_id)}
                        >
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
              <div className="slib-row2 slib-rows" ref={section2Ref}>
                <div className="slib-row1-header">
                  <h1>All Uploads</h1>
                  <div className='slib-search'>
                    <input
                      type="text"
                      placeholder="Search PDFs"
                      value={searchPrivateQuery}
                      required
                      onChange={handleSearchPrivateChange}
                    />
                    <div className='slib-search-icon'>

                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
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

export default Tlib;
