import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";

import {
  createTask,
  taskResolved,
  taskRemoved,
  getTasks,
} from "../../store/actions/tasks.action";
import { getFilterTaskList } from "../../store/reducers/tasks.reducer";
import DataTable from "./DataTable";
import Task from "./Task";
import SpinLoader from "../../components/SpinLoader";

export default function TaskList() {
  const headers = [
    {
      id: 1,
      name: "No",
    },
    {
      id: 2,
      name: "Title",
    },
    {
      id: 3,
      name: "Status",
    },
    {
      id: 4,
      name: "Action",
    },
  ];

  const initialFormData = {};
  const initialFilterData = { type: "", search: "" };
  const dispatch = useDispatch();
  const { tasks: taskList, loading } = useSelector((state) => state.tasks);
  const [filterList, setFilterList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterData, setFilterData] = useState(initialFilterData);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(getTasks());
    setFilterList(taskList);
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    const filterList = getFilterTaskList(taskList, filterData);
    setFilterList(filterList);
  }, [filterData, taskList]);

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    formData[name] = value;
    setFormData({ ...formData });
  };

  const handleChangeFilterData = (event) => {
    const {
      target: { name, value },
    } = event;
    filterData[name] = value;
    setFilterData({ ...filterData });
  };

  const handleToggleModal = () => {
    setFormData(initialFormData);
    setShowModal((prevState) => !prevState);
  };

  const handleSubmit = () => {
    dispatch(createTask(formData));
    setFormData(initialFormData);
  };

  const handleTaskResolved = (event, data) => {
    const {
      target: { name, checked },
    } = event;
    data[name] = checked;
    dispatch(taskResolved(data));
  };

  const handleTaskRemoved = (data) => {
    dispatch(taskRemoved(data));
  };

  return (
    <>
      <SpinLoader loading={loading} />
      <Button onClick={handleToggleModal}>Create Task</Button>
      <Form.Group className="mt-3">
        <Row>
          <Col className="d-flex justify-content-start">
            <Form.Check
              className="me-3"
              type="radio"
              aria-label="radio 1"
              label="All"
              onChange={() =>
                handleChangeFilterData({
                  target: { name: "type", value: "" },
                })
              }
              checked={filterData.type === ""}
            />
            <Form.Check
              className="me-3"
              type="radio"
              aria-label="radio 2"
              label="Solved"
              onChange={() =>
                handleChangeFilterData({
                  target: { name: "type", value: true },
                })
              }
              checked={filterData.type === true}
            />
            <Form.Check
              type="radio"
              aria-label="radio 3"
              label="Pending"
              onChange={() =>
                handleChangeFilterData({
                  target: { name: "type", value: false },
                })
              }
              checked={filterData.type === false}
            />
          </Col>
          <Col md="auto">
            <Form.Control
              className="ms-auto"
              placeholder="Search by title"
              name="search"
              value={filterData.search}
              onChange={handleChangeFilterData}
            />
          </Col>
        </Row>
      </Form.Group>
      <Task
        formData={formData}
        showModal={showModal}
        handleClose={handleToggleModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="mt-2">
        <DataTable
          headers={headers}
          dataSource={filterList}
          handleTaskResolved={handleTaskResolved}
          handleTaskRemoved={handleTaskRemoved}
        />
      </div>
    </>
  );
}
