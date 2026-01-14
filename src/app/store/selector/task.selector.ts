import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from '../../interfaces/task';

export const selectTaskState = createFeatureSelector<TaskState>('task');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state) => state.taskArray
);

export const selectCreateTaskSuccess = createSelector(
  selectTaskState,
  (state) => state.createSuccess
);
export const selectUpdateTaskSuccess = createSelector(
  selectTaskState,
  (state) => state.updateSuccess
);
