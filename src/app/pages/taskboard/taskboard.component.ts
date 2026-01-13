import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';

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
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getAllTask();
  }

  getAllTask() {
    this.taskService.getTask().subscribe({
      next: (data) => {
        this.allTask = data;
      },
      error: (err) => console.log('err :', err),
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
    this.getAllTask();
    this.showForm = false;
  }
}
