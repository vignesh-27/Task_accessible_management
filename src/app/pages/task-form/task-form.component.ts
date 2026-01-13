import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit, OnDestroy {
  @ViewChild('exampleModal', { static: true }) myFormModal!: ElementRef;

  @Input() formType = '';
  @Input() formValue: any = '';
  @Output() formUpdate = new EventEmitter<string>();
  dialogTitle: any = '';
  private modalInstance: Modal | undefined;

  TaskForm: any;
  formData: any;

  statusOptions: any = [
    { value: 1, name: 'Backlog' },
    { value: 2, name: 'In Progress' },
    { value: 3, name: 'Resolved' },
  ];

  priorityOptions: any = [
    { value: 1, name: 'Medium' },
    { value: 2, name: 'High' },
    { value: 3, name: 'Critical' },
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.modalInstance = new Modal(this.myFormModal.nativeElement);

    // Add event listener for the 'hidden.bs.modal' event
    this.myFormModal.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.resetForm();
      this.closePage();
    });

    this.formInit();
    this.openModal();
    this.dialogTitle;
    switch (this.formType) {
      case 'create':
        this.dialogTitle = 'Backlog';
        break;
      case 'update':
        this.setDialogTitle();
        this.setFormValue();
        break;
    }
  }

  setDialogTitle() {
    switch (this.formValue.status) {
      case 1:
        this.dialogTitle = 'Backlog';
        break;
      case 2:
        this.dialogTitle = 'In Progress';
        break;
      case 3:
        this.dialogTitle = 'Resolved';
        break;
    }
  }

  openModal(): void {
    this.modalInstance?.show();
  }

  closePage() {
    this.formUpdate.emit('');
  }

  formInit() {
    this.TaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      priority: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  setFormValue() {
    this.TaskForm.patchValue({ title: this.formValue.title });
    this.TaskForm.patchValue({ description: this.formValue.description });
    this.TaskForm.patchValue({ priority: this.formValue.priority });
    this.TaskForm.patchValue({ status: this.formValue.status });
  }

  get title() {
    return this.TaskForm.get('title');
  }

  get priority() {
    return this.TaskForm.get('priority');
  }

  get status() {
    return this.TaskForm.get('status');
  }

  onSubmit(saveType: any) {
    if (this.TaskForm.valid) {
      switch (this.formType) {
        case 'create':
          const createData = this.TaskForm.value;
          this.taskService.createTask(createData).subscribe({
            next: (data) => {
              this.formData = data;
              this.emitFunction(saveType);
            },
            error: (err) => console.log('err :', err),
          });
          break;
        case 'update':
          const updateData = this.TaskForm.value;
          updateData['_id'] = this.formValue._id;
          this.taskService.updateTask(updateData).subscribe({
            next: (data) => {
              this.formData = data;
              this.emitFunction(saveType);
            },
            error: (err) => console.log('err :', err),
          });
          break;
      }
    } else {
      this.TaskForm.markAllAsTouched();
    }
  }

  deleteTask() {
    const deleteData = { _id: this.formValue._id };
    this.taskService.deleteTask(deleteData).subscribe({
      next: (data) => {
        this.formData = '';
        this.formUpdate.emit(this.formData);
        this.resetForm();
        this.modalInstance?.hide();
      },
      error: (err) => console.log('err :', err),
    });
  }

  emitFunction(saveType: any) {
    switch (saveType) {
      case 1:
        this.formUpdate.emit(this.formData);
        this.modalInstance?.hide();
        break;
      case 2:
        this.resetForm();
        break;
    }
  }

  resetForm() {
    this.formType = 'create';
    this.formValue = {};
    this.TaskForm.reset();
  }

  ngOnDestroy(): void {
    this.TaskForm.reset();
  }
}
