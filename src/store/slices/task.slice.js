import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  loading: false,
  tasks: [],
  total: 0,
  error: ''
}

export const getTasks = createAsyncThunk('tasks/fetch', async ({pagination, filters}) => {
  console.log(filters)
  const { data } = await axios.get(`tasks?page=${pagination.page}&total=${pagination.limit}&type=${filters.type}&search=${filters.search}`);
  return data;
})

export const createTask = createAsyncThunk('tasks/create', async (task, { _, rejectWithValue }) => {

  try {
    const { data: newTask } = await axios.post(
      "tasks",
      { ...task, completed: false }
    );
    toast.info("New task has been created");
    return newTask;
  }
  catch(error) {
    if (!error.response) {
      throw error
    }
    toast.error(error.response.data.title);
    return rejectWithValue(error.response.data)
  }
})

export const taskResolved = createAsyncThunk('tasks/resolve', async (task) => {
  const { data } = await axios.put(`tasks/${task.id}`, task)
  return data;
})

export const taskRemoved = createAsyncThunk('tasks/delete', async (task) => {
  await axios.delete(`tasks/${task.id}`);
  return task;
})

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload.taskList;
      state.total = action.payload.total;
      state.error = '';
    })
    builder.addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })

    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
      state.error = '';
    })
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;
      // state.tasks = [...state.tasks, {...action.payload}];
      state.error = ''
    })
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.title;
    })
    builder.addCase(taskResolved.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(taskResolved.fulfilled, (state, action) => {
      const updatedTasks = state.tasks.map(task => {
        if(task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      })
      state.loading = false;
      state.tasks = updatedTasks;
      state.error = '';
    })
    builder.addCase(taskResolved.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })
    builder.addCase(taskRemoved.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(taskRemoved.fulfilled, (state, action) => {
      const updatedtasks = state.tasks.filter((task) => task.id !== action.payload.id);
      state.loading = false;
      state.tasks = updatedtasks;
      state.error = '';
    })
    builder.addCase(taskRemoved.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.messagep;
    })
  }
})

export const getFilterTaskList = (taskList, filters) => {
  // eslint-disable-next-line
  const filteredList = taskList.filter((task) => {
    if (
      task.title.toLowerCase().includes(filters.search.trim().toLowerCase())
    ) {
      if (filters.type === "") {
        return task;
      }
      return task.completed === filters.type;
    }
  });
  return { data: filteredList, total: filteredList.length };
};

export const getPaginatedTaskList = (
  taskList,
  pagination = { page: 1, limit: 10 }
) => {
  const { page, limit } = pagination;
  return taskList.slice((page - 1) * limit, page * limit);
};


export const { resetError } = slice.actions;
export default slice.reducer;
