import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

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
  const initialFilterData = { type: "" };
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

  const handleChangeFilterData = (event, value) => {
    const {
      target: { name },
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
      <Form.Group className="d-flex justify-content-start mt-3">
        <Form.Check
          className="me-3"
          name="type"
          type="radio"
          aria-label="radio 1"
          label="All"
          onChange={(event) => handleChangeFilterData(event, "")}
          checked={filterData.type === ""}
        />
        <Form.Check
          className="me-3"
          name="type"
          type="radio"
          aria-label="radio 2"
          label="Solved"
          onChange={(event) => handleChangeFilterData(event, true)}
          checked={filterData.type === true}
        />
        <Form.Check
          className="mr-3"
          name="type"
          value={false}
          type="radio"
          aria-label="radio 3"
          label="Pending"
          onChange={(event) => handleChangeFilterData(event, false)}
          checked={filterData.type === false}
        />
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
