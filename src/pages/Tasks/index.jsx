import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import {
  createTask,
  taskResolved,
  taskRemoved,
} from "../../store/actions/tasks.action";

import DataTable from "./DataTable";
import Task from "./Task";

export default function TaskList() {
  const headers = [
    {
      id: 1,
      name: "No",
    },
    {
      id: 2,
      name: "Description",
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
  const dispatch = useDispatch();
  const { tasks: taskList } = useSelector((state) => state);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    formData[name] = value;
    setFormData({ ...formData });
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
      <Button onClick={handleToggleModal}>Create Task</Button>
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
          dataSource={taskList}
          handleTaskResolved={handleTaskResolved}
          handleTaskRemoved={handleTaskRemoved}
        />
      </div>
    </>
  );
}
