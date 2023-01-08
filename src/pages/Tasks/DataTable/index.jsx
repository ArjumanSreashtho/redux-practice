import { Table, Form, Button } from "react-bootstrap";

const { Check } = Form;

export default function DataTable({
  headers = [],
  dataSource = [],
  handleTaskResolved,
  handleTaskRemoved,
}) {
  return (
    <Table striped bordered={true} hover size="sm">
      <thead>
        <tr>
          {headers.map((header) => {
            return <th key={header.id}>{header.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data) => {
          return (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.description}</td>
              <td>{data.resolved ? "Solved" : "Pending"}</td>
              <td>
                <Check
                  type="switch"
                  name="resolved"
                  className="d-inline-block"
                  checked={data.resolved || false}
                  onChange={(event) => {
                    handleTaskResolved(event, {
                      ...data,
                      resolved: !data.resolved,
                    });
                  }}
                />
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleTaskRemoved(data)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
