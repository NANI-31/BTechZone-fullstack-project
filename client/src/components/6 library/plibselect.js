import React from 'react';
import './plibselect.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import s from './ss.jpeg'
import t from './tt.jpeg'
import e from '../required/images/plibE-book.jpg'
function Plib() {
  // const [selectedDiv, setSelectedDiv] = useState(null);

  // const handleDivClick = (divId) => {
  //   setSelectedDiv(divId);

  //       console.log('Response from server:', divId);

  // };
  // const st = "student"
  const handleplib = async (value) => {
    await axios.post('http://localhost:5000/updatepubliclib', { value });
  }

  return (
    <div className='plibselect-body'>
      <div className="works" id="3">
        <div className="container">
          <div className="title">
            <h1>Select<span> Library</span></h1>
          </div>
          <div className="work-list">
            <div className='work-list1'>
              <div className="list1">
                <img src={s} alt="" />
                <div className="layer">
                  <Link to='/studentlibrary'><i onClick={() => handleplib("student")} className="fa-solid fa-swatchbook"></i></Link>
                  <p>click to see Students Library</p>
                  <h1>Drawing</h1>
                </div>
              </div>
              <div className='list1-name'><h1>Students</h1></div>
            </div>
            <div className='work-list1'>
              <div className="list1">
                <img src={t} alt="" />
                <div className="layer">
                  <Link to='/teacherlibrary'><i onClick={() => handleplib("teacher")} className="fa-solid fa-swatchbook"></i></Link>
                  <p>click to see Faculty Library</p>
                  <h1>Drawing</h1>
                </div>
              </div>
              <div className='list1-name'><h1>Teachers</h1></div>
            </div>
            <div className='work-list1'>
              <div className="list1">
                <img src={e} alt="" style={{ objectFit: 'cover' }} />
                <div className="layer">
                  <Link to='/teacherlibrary'><i onClick={() => handleplib("teacher")} className="fa-solid fa-swatchbook"></i></Link>
                  <p>click to see Faculty Library</p>
                  <h1>Drawing</h1>
                </div>
              </div>
              <div className='list1-name'><h1>E-book</h1></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plib;
