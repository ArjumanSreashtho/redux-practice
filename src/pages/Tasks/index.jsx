import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import {
  createTask,
  taskResolved,
  taskRemoved,
  getTasks,
  getFilterTaskList,
  getPaginatedTaskList,
} from "../../store/slices/task.slice";

import DataTable from "./DataTable";
import Task from "./Task";
import SpinLoader from "../../components/SpinLoader";
import Filters from "./Filters";
import DeleteModal from "../../components/DeleteModal";

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
  const initialPagination = { page: 1, limit: 10, total: 0 };
  const dispatch = useDispatch();
  const { tasks: taskList, loading } = useSelector((state) => state.tasks);
  const [filterList, setFilterList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState(initialPagination);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    const { total, data: filterList } = getFilterTaskList(taskList, filters);
    const paginatedList = getPaginatedTaskList(filterList, pagination);
    setPagination((prevState) => ({
      ...prevState,
      page:
        !paginatedList.length && prevState.page > 1
          ? prevState.page - 1
          : prevState.page,
      total: Math.ceil(total / prevState.limit),
    }));
    setFilterList(paginatedList);
    // eslint-disable-next-line
  }, [filters, taskList, pagination.page, pagination.limit]);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      page: 1,
    }));
  }, [filters]);

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

  const handleToggleDeleteModal = (data) => {
    setShowDeleteModal((prevState) => {
      setFormData(!prevState ? data : initialFormData);
      return !prevState;
    });
  };

  const handleTaskRemoved = () => {
    dispatch(taskRemoved(formData));
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
      />
      <div className="mt-2">
        <DataTable
          headers={headers}
          dataSource={filterList}
          pagination={pagination}
          handleTaskResolved={handleTaskResolved}
          handleToggleDeleteModal={handleToggleDeleteModal}
          handlePagination={handlePagination}
        />
      </div>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        handleClose={handleToggleDeleteModal}
        handleDelete={handleTaskRemoved}
      />
    </>
  );
}
