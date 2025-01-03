import React, { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [id, setId] = useState(null);
	const [name, setName] = useState(null);
	const [mail, setMail] = useState(null);
	const [pic, setPic] = useState(null);
	const [phoneNo, setPhoneNo] = useState(null);
	const [year, setYear] = useState(null);
	const [branch, setBranch] = useState(null);
	const [semester, setSemester] = useState(null);
	const [person, setPerson] = useState(null);
	const [token, setToken] = useState(!!localStorage.getItem('userToken'));
	const [onlineusers, setOnlineUsers] = useState([]);
	const [socketConnection, setSocketConnection] = useState(null);

	return (
		<GlobalContext.Provider
			value={{
				user,
				id,
				name,
				mail,
				pic,
				phoneNo,
				year,
				branch,
				semester,
				person,
				token,
				onlineusers,
				socketConnection,
				setUser,
				setId,
				setName,
				setMail,
				setPic,
				setPhoneNo,
				setYear,
				setBranch,
				setSemester,
				setPerson,
				setToken,
				setOnlineUsers,
				setSocketConnection,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export default GlobalProvider;

export const useGlobalContext = () => useContext(GlobalContext);
