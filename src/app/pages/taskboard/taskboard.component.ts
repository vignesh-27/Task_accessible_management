import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taskboard',
  imports: [CommonModule],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.scss'
})
export class TaskboardComponent implements OnInit {
  public allTask: any = [];
  constructor(private taskService: TaskService){
  }

  ngOnInit() {
    this.taskService.getTask().subscribe({
      next: (data) => {this.allTask = data;
      },
      error: (err) => console.log('err :', err)
    });
  }

  }
