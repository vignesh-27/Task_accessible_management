import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-content',
  imports: [CommonModule],
  templateUrl: './task-content.component.html',
  styleUrl: './task-content.component.scss',
})
export class TaskContentComponent implements OnInit {
  @Input() taskObj: any = {};
  @Output() formUpdate = new EventEmitter<string>();
  priority: any = {
    1: 'Medium',
    2: 'High',
    3: 'Critical',
  };

  ngOnInit() {}

  updateForm(task: any) {
    this.formUpdate.emit(task);
  }
}
