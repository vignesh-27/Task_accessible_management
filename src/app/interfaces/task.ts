export interface taskResponse {
  title: string;
  description: string;
  priority: number;
  status: number;
}

export interface TaskState {
  taskArray: taskResponse[];
  createTaskResp?: taskResponse;
  updateTaskResp?: taskResponse;
  createSuccess?: boolean;
  updateSuccess?: boolean;
  error?: any;
}

export const initialState: TaskState = {
  taskArray: [],
  createTaskResp: undefined,
  updateTaskResp: undefined,
  createSuccess: false,
  updateSuccess: false,
  error: null,
};
