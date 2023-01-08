import { Modal, Button, Form } from "react-bootstrap";

export default function Task({
  showModal = false,
  formData,
  handleClose,
  handleChange,
  handleSubmit,
}) {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          placeholder="Description"
          onChange={handleChange}
          name="description"
          value={formData.description || ""}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
