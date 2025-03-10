import { useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export const UserProvider = ({ children }) => {
  const generateRandomId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomId = "";
    for (let i = 6; i > 0; i--) {
      randomId += characters[Math.floor(Math.random() * characters.length)];
    }
    return randomId;
  };

  const [users, setUsers] = useState([]);

  // Fetch users from the backend API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data); // Set users with the fetched data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run only once when the component mounts

  const addUser = (userIn) => {
    if (userIn.uid) {
      // Si tiene UID, actualiza el usuario
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uid === userIn.uid ? { ...user, ...userIn } : user
        )
      );
    } else {
      // Si no tiene UID, crea uno nuevo y agrega el usuario
      const newUser = { ...userIn, uid: generateRandomId() };
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
  };

  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};