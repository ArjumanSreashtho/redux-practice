import { Modal, Button } from "react-bootstrap";

export default function DeleteModal({
  showDeleteModal,
  handleClose,
  handleDelete,
}) {
  return (
    <Modal show={showDeleteModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure, you want to <span className="text-danger">delete</span>{" "}
        it?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
