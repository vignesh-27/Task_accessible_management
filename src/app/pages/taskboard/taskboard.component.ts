import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Store } from '@ngrx/store';
import * as TaskAction from '../../store/actions/task.action';
import { selectAllTasks } from '../../store/selector/task.selector';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-taskboard',
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.scss',
})
export class TaskboardComponent implements OnInit {
  public allTask: any = [];
  showForm: boolean = false;
  formType: any = '';
  formValue: any;
  constructor(private taskService: TaskService, private store: Store) {}

  ngOnInit() {
    this.getAllTask();
  }

  getAllTask() {
    this.store
      .select(selectAllTasks)
      .pipe()
      .subscribe((allTask) => {
        this.allTask = allTask;
      });
  }

  createForm() {
    this.formType = 'create';
    this.showForm = true;
  }

  updateForm(value: any) {
    this.formValue = value;
    this.formType = 'update';
    this.showForm = true;
  }

  formUpdate(respData: any) {
    this.showForm = false;
  }
}
