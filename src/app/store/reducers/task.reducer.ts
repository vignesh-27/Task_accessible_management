import { Action, createReducer, on } from '@ngrx/store';
import * as taskAction from '../actions/task.action';
import { taskResponse, initialState } from '../../interfaces/task';

export const taskReducer = createReducer(
  initialState,
  on(taskAction.getTaskSuccessAction, (state, { tasks }) => {
    return {
      ...state,
      taskArray: tasks,
    };
  }),
  on(taskAction.createTaskSuccessAction, (state, { createTaskSuccess }) => {
    return {
      ...state,
      createTaskResp: createTaskSuccess,
      createSuccess: true,
    };
  }),
  on(taskAction.updateTaskSuccessAction, (state, { updateTaskSuccess }) => {
    return {
      ...state,
      updateTaskResp: updateTaskSuccess,
      updateSuccess: true,
    };
  }),
  on(taskAction.errorTaskAction, (state, { errorResp }) => {
    return {
      ...state,
      error: errorResp,
    };
  })
);
