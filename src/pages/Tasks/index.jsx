import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import {
  createTask,
  taskResolved,
  taskRemoved,
  getTasks,
  getTask
} from "../../store/slices/task.slice";

import DataTable from "./DataTable";
import Task from "./Task";
import SpinLoader from "../../components/SpinLoader";
import Filters from "./Filters";
import DeleteModal from "../../components/DeleteModal";
import TaskDetailsModal from "./TaskDetails";
import userService from "../../services/userService";

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
  const initialFilters = { type: "", search: "" };
  const dispatch = useDispatch();
  const initialPagination = { page: 1, limit: 10 };
  const { tasks: taskList, loading, total } = useSelector((state) => state.tasks);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState(initialPagination);
  const [formData, setFormData] = useState({});
  const [workableUserList, setWorkableUserList] = useState([]);

  useEffect(() => {
    dispatch(getTasks({pagination, filters}));
  }, [dispatch, pagination, filters]);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      page: 1,
    }));
  }, [filters]);

  useEffect(() => {
    if(showDetailsModal) {
      dispatch(getTask(formData));
    }
  }, [showDetailsModal])

  useEffect(() => {
    (async function() {
      if(showModal) {
        const { data: { data } } = await userService.getWorkableUsers();
        const workableUserList = data.map((user => {
          return {
            ...user,
            label: user.name,
            value: user.id

          }
        }))
        setWorkableUserList(workableUserList);
      }
    })()
  }, [showModal])

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    formData[name] = value;
    setFormData({ ...formData });
  };

  const handleChangeFilters = (event) => {
    const {
      target: { name, value },
    } = event;
    filters[name] = value;
    setFilters({ ...filters });
  };

  const handlePagination = (nextPage) => {
    setPagination({ ...pagination, page: nextPage });
  };

  const handleToggleModal = () => {
    setFormData(initialFormData);
    setShowModal((prevState) => !prevState);
  };

  const handleToggleDetailsModal = (data) => {
    setShowDetailsModal((prevState) => {
      if(!prevState) {
        setFormData(data);
      }
      return !prevState;
    });
  }

  const handleSubmit = () => {
    dispatch(createTask(formData));
    dispatch(getTasks({pagination, filters}));
    setFormData(initialFormData);
  };

  const handleTaskResolved = (event, data) => {
    const {
      target: { name, checked },
    } = event;
    data[name] = checked;
    dispatch(taskResolved(data));
    dispatch(getTasks({pagination, filters}))
  };

  const handleToggleDeleteModal = (data) => {
    setShowDeleteModal((prevState) => {
      setFormData(!prevState ? data : initialFormData);
      return !prevState;
    });
  };

  const handleTaskRemoved = () => {
    dispatch(taskRemoved(formData));
    dispatch(getTasks({pagination, filters}));
    setShowDeleteModal(false);
    setFormData(initialFormData);
  };

  return (
    <>
      <SpinLoader loading={loading} />
      <Button onClick={handleToggleModal}>Create Task</Button>
      <Filters filters={filters} handleChangeFilters={handleChangeFilters} />
      <Task
        formData={formData}
        showModal={showModal}
        handleClose={handleToggleModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        workableUserList={workableUserList}
      />
      <div className="mt-2">
        <DataTable
          headers={headers}
          dataSource={taskList}
          pagination={pagination}
          total={total}
          handleTaskResolved={handleTaskResolved}
          handleToggleDeleteModal={handleToggleDeleteModal}
          handlePagination={handlePagination}
          handleToggleDetailsModal={handleToggleDetailsModal}
        />
      </div>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        handleClose={handleToggleDeleteModal}
        handleDelete={handleTaskRemoved}
      />
      <TaskDetailsModal
        loading={loading}
        task={formData} 
        showDetailsModal={showDetailsModal}
        handleClose={() => {
          setShowDetailsModal(false);
          setFormData(initialFormData)
        }}
      />
    </>
  );
}
