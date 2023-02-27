import { Modal, Button, Form, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectTask } from '../../../store/slices/task.slice';

const TaskDetailsModal = ({
  loading,
  task,
  showDetailsModal,
  handleClose
}) => {

  const taskDetails = useSelector((state) => selectTask(state.tasks.tasks, task));
  return ( taskDetails &&
    <Modal show={showDetailsModal && !loading} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="text-muted">Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control as={"textarea"} value={taskDetails.title || ''} disabled />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control style={{minHeight: "150px"}} as={"textarea"} value={taskDetails.description || ''} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control value={taskDetails.completed ? "Solved" : "Pending"} disabled />
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
                taskDetails.users?.map((user, index) => {
                  return (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name || ""}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TaskDetailsModal;