import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/1 home/home';
import Signupselect from './components/2 signup/selectsignup';

import Studentsignup from './components/2 signup/signup';
import Teachersignup from './components/2 signup/tsignup';

import Login from './components/3 login/login';

import Sverification from './components/4 verification/verification';
import Tverification from './components/4 verification/tverification';

import User from './components/5 user/User';
import Sidebar from './components/required/sidebar/sidebar';
import Userupload from './components/5 user/userupload';

import Ulibrary from './components/6 library/mylibrary';
import Bookmarks from './components/bookmarks/bookmark';

import Plibrary from './components/6 library/plibselect';
import Slibrary from './components/6 library/studentlib/studentlib';
import Tlibrary from './components/6 library/teacherlib/teacherlib';

import Userprofile from './components/5 user/profile/profile';
import Pverification from './components/5 user/profile/pverification';
import Chatting from './components/7 chatting/Chatting';
import Testing from './components/5 user/testing';
import PrivateRouting from './components/PrivateRoute';

import Logout from './components/8 logout/Logout';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/select-signup" element={<Signupselect />}></Route>
				<Route path="/student-signup" element={<Studentsignup />}></Route>
				<Route path="/teacher-signup" element={<Teachersignup />}></Route>

				<Route path="/login" element={<Login />}></Route>
				<Route path="/verification" element={<Sverification />}></Route>
				<Route path="/tverification" element={<Tverification />}></Route>

				<Route element={<PrivateRouting />}>
					<Route path="/user" element={<UserWithSidebar />} />
					<Route path="/userupload" element={<UserUploadWithSidebar />} />
					<Route path="/mylibrary" element={<LibraryWithSidebar />} />
					<Route path="/mybookmarks" element={<BookmarksWithSidebar />} />
					<Route path="/publiclibrary" element={<PLibraryWithSidebar />} />
					<Route path="/studentlibrary" element={<SLibraryWithSidebar />} />
					<Route path="/teacherlibrary" element={<TLibraryWithSidebar />} />

					<Route path="/profile" element={<UserProfileWithSidebar />} />
					<Route path="/pverification" element={<Pverification />}></Route>
					<Route path="/chatting" element={<ChattingWithSidebar />}></Route>
					<Route path="/logout" element={<Logout />}></Route>
				</Route>
				{/* <Route path="/chatting" element={<Testing />}></Route> */}
			</Routes>
		</BrowserRouter>
	);
}
const UserWithSidebar = () => {
	const location = useLocation();
	return (
		<>
			<User />
			{location.pathname.includes('/user') && <Sidebar />}
		</>
	);
};
const UserUploadWithSidebar = () => {
	const location = useLocation();
	return (
		<>
			<Userupload />
			{location.pathname.includes('/userupload') && <Sidebar />}
		</>
	);
};
const LibraryWithSidebar = () => {
	const location = useLocation();
	return (
		<>
			<Ulibrary />
			{location.pathname.includes('/mylibrary') && <Sidebar />}
		</>
	);
};
const BookmarksWithSidebar = () => {
	const location = useLocation();
	return (
		<>
			<Bookmarks />
			{location.pathname.includes('/mybookmarks') && <Sidebar />}
		</>
	);
};
const PLibraryWithSidebar = () => {
	const location = useLocation();
	return (
		<>
			<Plibrary />
			{location.pathname.includes('/publiclibrary') && <Sidebar />}
		</>
	);
};
const SLibraryWithSidebar = () => {
	const location = useLocation();
	return (
		<>
			<Slibrary />
			{location.pathname.includes('/studentlibrary') && <Sidebar />}
		</>
	);
};
const TLibraryWithSidebar = () => {
	const location = useLocation();
	return (
		<>
			<Tlibrary />
			{location.pathname.includes('/teacherlibrary') && <Sidebar />}
		</>
	);
};

const UserProfileWithSidebar = () => {
	const location = useLocation();
	return (
		<>
			<Userprofile />
			{location.pathname.includes('/profile') && <Sidebar />}
		</>
	);
};

const ChattingWithSidebar = () => {
	const location = useLocation();
	return (
		<>
			<Chatting />
			{location.pathname.includes('/chatting') && <Sidebar />}
		</>
	);
};

export default App;
