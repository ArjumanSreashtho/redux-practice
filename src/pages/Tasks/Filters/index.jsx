import { Form, Row, Col } from "react-bootstrap";

export default function Filters({ filters, handleChangeFilters }) {
  return (
    <Form.Group className="mt-3">
      <Row>
        <Col className="d-flex justify-content-start">
          <Form.Check
            className="me-3"
            type="radio"
            aria-label="radio 1"
            label="All"
            onChange={() =>
              handleChangeFilters({
                target: { name: "type", value: "" },
              })
            }
            checked={filters.type === ""}
          />
          <Form.Check
            className="me-3"
            type="radio"
            aria-label="radio 2"
            label="Solved"
            onChange={() =>
              handleChangeFilters({
                target: { name: "type", value: true },
              })
            }
            checked={filters.type === true}
          />
          <Form.Check
            type="radio"
            aria-label="radio 3"
            label="Pending"
            onChange={() =>
              handleChangeFilters({
                target: { name: "type", value: false },
              })
            }
            checked={filters.type === false}
          />
        </Col>
        <Col md="auto">
          <Form.Control
            className="ms-auto"
            placeholder="Search by title"
            name="search"
            value={filters.search}
            onChange={handleChangeFilters}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}
