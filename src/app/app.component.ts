import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {HttpClient} from '@angular/common/http';
import {Board} from './model/board';
import {BoardService} from './service/board.service';
import { Task } from './model/task';
import {TaskService} from './service/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  board: Board;
  task: Task = {
    id: 8,
    title: 'Test Edit',
    description: 'check check',
    position: 5,
  };
  constructor(private boardService: BoardService,
              private taskService: TaskService) {
    this.getBoard();
  }

  private getBoard() {
    this.boardService.getBoardById(1).subscribe(data => {
      this.board = data;
      console.log(this.board);
    }, error => {
      console.log('Error');
    });
  }

//
  // todo = {id: 1, data: ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep', 'Choi game', 'Top 1']};
  //
  // done = {id: 2, data: ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog']};
  //
  // done2 = {id: 3, data: ['Get to work2', 'Pick up groceries2', 'Go home2', 'Fall asleep2', 'Choi game2', 'Top 12']};

  // index: number;

  drop(event: CdkDragDrop<Task[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.data);
      for (let i = 0; i < event.container.data.length; i++) {
        const task = event.container.data[i];
        task.position = i;
        this.moveTask(event, i, task);
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      for (let i = 0; i < event.container.data.length; i++) {
        const task = event.container.data[i];
        task.position = i;
        console.log(+event.container.id);
        task.status.id = +event.container.id;
        console.log(task);
        this.taskService.sortTask(event.container.data[i].id, task).subscribe(data => {console.log(data); });
      }
      for (let i = 0; i < event.previousContainer.data.length; i++) {
        const task = event.previousContainer.data[i];
        task.position = i;
        console.log(task);
        this.taskService.sortTask(event.previousContainer.data[i].id, task).subscribe(data => {console.log(data); });
      }
    }
    // this.getBoard();
  }

  private moveTask(event: CdkDragDrop<Task[], any>, i: number, task: Task) {
    this.taskService.sortTask(event.container.data[i].id, task).subscribe(data => {
      console.log(data);
    });
  }

  public checkEdit(id: number) {
    this.taskService.sortTask(id, this.task).subscribe( data => console.log(data));
  }
  listConnectTo(): string[] {
      return this.board.statuses.map(status => status.id.toString());
  }
}
