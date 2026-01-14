import { createAction, createActionGroup, props } from '@ngrx/store';
import { TaskType } from './task.enum';
import { taskResponse } from '../../interfaces/task';

export const createTaskAction = createAction(
  TaskType.CREATE_TASK,
  props<{ createTask: any }>()
);

export const updateTaskAction = createAction(
  TaskType.UPDATE_TASK,
  props<{ updateTask: any }>()
);

export const updateTaskSuccessAction = createAction(
  TaskType.UPDATE_SUCCESS_RESP,
  props<{ updateTaskSuccess: any }>()
);

export const createTaskSuccessAction = createAction(
  TaskType.CREATE_SUCCESS_RESP,
  props<{ createTaskSuccess: any }>()
);

export const getTaskAction = createAction(TaskType.GET_TASK, props<any>());

export const getTaskSuccessAction = createAction(
  TaskType.GET_TASK_SUCCESS,
  props<{ tasks: Array<taskResponse> }>()
);

export const errorTaskAction = createAction(TaskType.ERROR_TASK, props<any>());
