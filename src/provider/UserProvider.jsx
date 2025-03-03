import { useState } from "react";
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

  let addUser = (userIn) => {
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

  let deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
