import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  @Input() formType = '';
  @Output() taskEvent = new EventEmitter<string>();

  TaskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    priority: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  formData: any;
  constructor(private taskService: TaskService) {}

  onSubmit() {
    if (this.TaskForm.valid) {
      console.log('form values :', this.TaskForm.value);
      const formData = this.TaskForm.value;
      this.taskService.createTask(formData).subscribe({
        next: (data) => {
          this.formData = data;
          this.taskEvent.emit(this.formData);
        },
        error: (err) => console.log('err :', err),
      });
    }
  }
}
