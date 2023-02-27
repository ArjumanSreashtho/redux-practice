import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import SpinLoader from "../../../components/SpinLoader";
import userService from "../../../services/userService";

const UserDetails = () => {

  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    (async function() {
      try {
        setLoading(true)
        const { data: { data } } = await userService.getUserProfile();
        setCurrentUser(data);
      }
      catch(error) {

      }
      finally {
        setLoading(false);
      }
    })()
  }, [])

  return (
    <>
      <SpinLoader loading={loading}/>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Name</Form.Label>
        <Form.Control value={currentUser.name || ''} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Username</Form.Label>
        <Form.Control value={currentUser.username || ''} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Role</Form.Label>
        <Form.Control value={currentUser.role || ''} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Created At</Form.Label>
        <Form.Control value={new Date(currentUser.createdAt).toDateString() || ''} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Task Assigned</Form.Label>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              currentUser.tasks?.map((task, index) => {
                return (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.title || ""}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Form.Group>
    </>
  )
}

export default UserDetails;