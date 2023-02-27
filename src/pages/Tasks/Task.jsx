import { Modal, Button, Form } from "react-bootstrap";
import ReactSelect from "react-select";

export default function Task({
  showModal = false,
  formData,
  handleClose,
  handleChange,
  handleSubmit,
  workableUserList
}) {

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          className="mb-2"
          placeholder="Title"
          onChange={handleChange}
          name="title"
          value={formData.title || ""}
        />
        <Form.Control
          as="textarea"
          className="mb-2"
          placeholder="Description"
          onChange={handleChange}
          name="description"
          value={formData.description || ""}
        />
        <ReactSelect 
          isMulti
          isSearchable
          classNamePrefix="Select"
          options={workableUserList}
          value={formData.users || []}
          onChange={(value) => handleChange({target: { name: "users", value }})}
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
