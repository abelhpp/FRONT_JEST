import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./context/UserContext";
import { Container, Form, Button, Table } from "react-bootstrap";

const Users = () => {
  let { users, addUser, deleteUser } = useContext(UserContext);

  const [update, setUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      uid: selectedUser?.uid || null, // Si hay un usuario seleccionado, usa su UID; si no, deja null
      name,
      address,
      age,
    };

    addUser(newUser); // Llama a addUser, que decidirá si crea o actualiza

    // Limpiar formulario y estado
    setName("");
    setAddress("");
    setAge("");
    setSelectedUser(null);
    setUpdate(false);
  };

  const handleEdit = (user) => {
    setUpdate(true);
    setSelectedUser(user);
    setName(user.name);
    setAddress(user.address);
    setAge(user.age);
  };

  return (
    <Container>
      <h1 className="text-center">React.js Context API CRUD</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Name"
            required
          />

          <Form.Label>Address</Form.Label>
          <Form.Control
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            type="text"
            placeholder="Enter Address"
            required
          />

          <Form.Label>Age</Form.Label>
          <Form.Control
            onChange={(e) => setAge(e.target.value)}
            value={age}
            type="number"
            placeholder="Enter Age"
            required
          />
          <br />

          <Button type="submit">
            {update ? "Update User" : "Add User"}
          </Button>
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Age</th>
            <th>EDIT</th>
            <th className="bg-danger text-white">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u, index) => (
              <tr key={index}>
                <td>{u.name}</td>
                <td>{u.address}</td>
                <td>{u.age}</td>
                <td>
                  <Button onClick={() => handleEdit(u)} variant="warning">
                    EDIT
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => deleteUser(u.uid)}
                    variant="danger"
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;

