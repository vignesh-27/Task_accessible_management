import { Injectable, inject } from '@angular/core';
import {
  Actions,
  ofType,
  createEffect,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import * as TaskAction from '../actions/task.action';
import { TaskService } from '../../services/task.service';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private taskService = inject(TaskService);

  getTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      tap((action) => console.log('')),
      switchMap((tasks) =>
        this.taskService.getTask().pipe(
          map((res) => TaskAction.getTaskSuccessAction({ tasks: res })),
          catchError((error) => of(TaskAction.errorTaskAction({ error })))
        )
      )
    );
  });

  getAllTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskAction.getTaskAction),
      tap((action) => console.log('')),
      switchMap((tasks) =>
        this.taskService.getTask().pipe(
          map((res) => TaskAction.getTaskSuccessAction({ tasks: res })),
          catchError((error) => of(TaskAction.errorTaskAction({ error })))
        )
      )
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskAction.createTaskAction),
      tap((action) => console.log('')),
      switchMap((createTask) =>
        this.taskService.createTask(createTask).pipe(
          mergeMap((res) =>
            of(
              TaskAction.createTaskSuccessAction({ createTaskSuccess: res }),
              TaskAction.getTaskAction({})
            )
          ),
          catchError((error) => of(TaskAction.errorTaskAction({ error })))
        )
      )
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskAction.updateTaskAction),
      exhaustMap((action) =>
        this.taskService.updateTask(action.updateTask).pipe(
          mergeMap((res) =>
            of(
              TaskAction.updateTaskSuccessAction({ updateTaskSuccess: res }),
              TaskAction.getTaskAction({})
            )
          ),
          catchError((error) => of(TaskAction.errorTaskAction({ error })))
        )
      )
    );
  });
}
