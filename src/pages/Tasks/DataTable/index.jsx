import { Table, Form, Button } from "react-bootstrap";
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination";
const { Check } = Form;

export default function DataTable({
  headers = [],
  dataSource = [],
  pagination,
  handleTaskResolved,
  handleTaskRemoved,
  handlePagination,
}) {
  return (
    <>
      <Table striped bordered={true} hover size="sm">
        <thead>
          <tr>
            {headers.map((header) => {
              return <th key={header.id}>{header.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((data, index) => {
            return (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{data.title}</td>
                <td>{data.completed ? "Solved" : "Pending"}</td>
                <td>
                  <Check
                    type="switch"
                    name="completed"
                    className="d-inline-block"
                    checked={data.completed || false}
                    onChange={(event) => {
                      handleTaskResolved(event, {
                        ...data,
                        completed: !data.completed,
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
                      className="bi bi-trash-fill"
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
      <Pagination
        {...bootstrap5PaginationPreset}
        extraClassName="float-end"
        current={pagination.page}
        total={pagination.total}
        maxWidth={300}
        onPageChange={handlePagination}
      />
    </>
  );
}
