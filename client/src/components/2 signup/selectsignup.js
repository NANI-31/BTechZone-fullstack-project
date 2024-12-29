import React, { lazy, Suspense, useState } from "react";
// import { Link } from 'react-router-dom'
// import './plibselect.css'
import st from "./std.png";
import t from "./tec.jpeg";

const Studentsignup = lazy(() => import("./signup"));
const Teachersignup = lazy(() => import("./tsignup"));

// import o from 'https://in.pinterest.com/pin/1096415471764759904/'
function Selectsignup() {
  const [userType, setUserType] = useState(null); // Track the user type

  // Handle user selection
  const handleSelection = (type) => {
    setUserType(type);
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {userType === "student" && <Studentsignup />}
        {userType === "teacher" && <Teachersignup />}
        {userType === null && (
          <div>
            <div className="w-full h-screen text-white" id="3">
              <div className="flex flex-col items-center">
                <div>
                  <h1 className="my-16 text-center text-5xl font-bold lg:text-2l">
                    Sign Up<span> As</span>
                  </h1>
                </div>
                <div className="flex flex-col gap-20 pb-36 lg:pb-0 lg:flex-row lg:gap-80">
                  <div>
                    <div className="group relative rounded-[10px] overflow-hidden shadow-[10px_4px_20px_0px_rgba(0,0,0,1)] lg:shadow-[10px_4px_16px_2px_rgba(0,0,0,1),_10px_4px_20px_2px_rgba(0,0,0,1),_10px_4px_20px_2px_rgba(0,0,0,0.6)]">
                      <img
                        src={st}
                        alt="sd"
                        className="w-[40vh] h-[60vh] rounded-[10px] block object-cover object-center transform group-hover:scale-110 transistion-transform duration-500 ease-in-out"
                      />
                      <div className="w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-black text-white opacity-0 absolute top-0 flex flex-col justify-center items-center group-hover:opacity-100 transistion duration-500 ease-in-out text-sm">
                        <p
                          onClick={() => handleSelection("student")}
                          className="text-2xl"
                        >
                          <i className="fa-solid fa-user-plus text-2xl"></i>
                        </p>
                        <p>click to sign up as Students</p>
                      </div>
                    </div>
                    <div className="text-center p-5 text-2xl lg:text-3xl font-bold">
                      <h1>Student</h1>
                    </div>
                  </div>
                  <div>
                    <div className="group relative rounded-[10px] overflow-hidden shadow-[10px_4px_20px_0px_rgba(0,0,0,1)] lg:shadow-[10px_4px_16px_2px_rgba(0,0,0,1),_10px_4px_20px_2px_rgba(0,0,0,1),_10px_4px_20px_2px_rgba(0,0,0,0.6)]">
                      <img
                        src={t}
                        alt=""
                        className="w-[40vh] h-[60vh] rounded-[10px] block object-cover object-center transform group-hover:scale-110 transistion-transform duration-500 ease-in-out"
                      />
                      <div className="w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-black text-white opacity-0 absolute top-0 flex flex-col justify-center items-center group-hover:opacity-100 transistion duration-500 ease-in-out text-sm">
                        <p
                          onClick={() => handleSelection("teacher")}
                          className="text-2xl"
                        >
                          <i className="fa-solid fa-user-plus text-2xl"></i>
                        </p>
                        <p>click to sign up as Teacher</p>
                      </div>
                    </div>
                    <div className="text-center p-5 text-2xl lg:text-3xl font-bold">
                      <h1>Teacher</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
}

export default Selectsignup;
