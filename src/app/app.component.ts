import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from './model/board';
import {BoardService} from './service/board.service';
import { Task } from './model/task';
import {TaskService} from './service/task.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Status} from './model/status';
import {StatusService} from './service/status.service';
import {NotificationService} from './service/notification.service';
import {successAlert} from './notification';



declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  board: Board;
  newTask: FormGroup =  new FormGroup({
    title: new FormControl(),
    position: new FormControl(99999),
    status:  new FormControl(),
  });
  newStatus: FormGroup = new FormGroup({
    title: new FormControl(),
    position: new FormControl(99999),
    board: new FormControl(),
  });
  taskDetail: Task = {};
  statusId: number;
  statusEditId: number;
  isShowTaskAddBox: boolean = false;
  isShowTitleInput: boolean = false;
  isShowDescriptionInput: boolean = false;
  isShowDeadlineInput: boolean = false;
  isShowAddStatusBox: boolean = false;
  constructor(private boardService: BoardService,
              private taskService: TaskService,
              private statusService: StatusService,) {
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

  dropTask(event: CdkDragDrop<Task[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.data);
      this.moveInArray(event);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.moveToOtherArray(event);
    }
  }

  dropStatus(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.statuses, event.previousIndex, event.currentIndex);
    console.log(this.board.id);
    console.log(this.board.statuses);
    for (let i = 0; i < this.board.statuses.length; i++) {
     const statusMove = {
        id: this.board.statuses[i].id,
        title: this.board.statuses[i].title,
        position: i,
        board: {
          id: this.board.id,
        }
      };
     this.moveStatus(statusMove.id, statusMove);
    }
  }

  private moveToOtherArray(event: CdkDragDrop<Task[], any>) {
    for (let i = 0; i < event.container.data.length; i++) {
      const task = event.container.data[i];
      task.position = i;
      console.log(+event.container.id);
      task.status.id = +event.container.id;
      this.taskService.sortTask(event.container.data[i].id, task).subscribe(data => {
        console.log(data);
      });
    }
    for (let i = 0; i < event.previousContainer.data.length; i++) {
      const task = event.previousContainer.data[i];
      task.position = i;
      console.log(task);
      this.taskService.sortTask(event.previousContainer.data[i].id, task).subscribe(data => {
        console.log(data);
      });
    }
  }

  private moveInArray(event: CdkDragDrop<Task[], any>) {
    for (let i = 0; i < event.container.data.length; i++) {
      const task = event.container.data[i];
      task.position = i;
      this.moveTask(event, i, task);
    }
  }

  private moveTask(event: CdkDragDrop<Task[], any>, i: number, task: Task) {
    this.taskService.sortTask(event.container.data[i].id, task).subscribe(data => {
      console.log(data);
    });
  }

  private moveStatus(id: number, status: Status) {
    this.statusService.editStatus(id, status).subscribe(data => {
      console.log(data.position);
    });
  }

  listConnectTo(): string[] {
      return this.board.statuses.map(status => status.id.toString());
  }

  addNewTask() {
      this.newTask.get('status').setValue({id: this.statusId});
      this.taskService.addNew(this.newTask.value).subscribe(data => {console.log(data); this.getBoard(); });
      this.newTask = new FormGroup({
        title: new FormControl(),
        position: new FormControl(99999),
        status:  new FormControl(),
      });
      successAlert();
  }

  setStatusId(id: number) {
    this.statusId  = id;
    this.showTaskAddBox();
  }

  showTaskAddBox() {
    this.isShowTaskAddBox = !this.isShowTaskAddBox;
  }



  showTaskDetail(id: number) {
      this.taskService.findById(id).subscribe(data => {this.taskDetail = data; }, error => { console.log('khong lay duoc detail'); });
  }

  showTitleEdit() {
      this.isShowTitleInput = !this.isShowTitleInput;
  }

  showDescriptionEdit() {
    this.isShowDescriptionInput = !this.isShowDescriptionInput;
  }
  showDeadlineEdit() {
    this.isShowDeadlineInput = !this.isShowDeadlineInput;
  }

  showAddStatusForm() {
    this.isShowAddStatusBox = !this.isShowAddStatusBox;
  }

  editTaskDetail() {
    this.taskService.editTask(this.taskDetail.id, this.taskDetail).subscribe(data => {console.log(data); this.getBoard(); });
  }

  addNewStatus() {
    this.newStatus.get('board').setValue({id: this.board.id});
    this.statusService.addNewStatus(this.newStatus.value).subscribe(data => {console.log(data); this.getBoard(); });
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskDetail.id).subscribe(() => this.getBoard() );
    this.taskDetail = {};
  }

  showEditTitleStatus(id: number) {
    this.statusEditId = id;
  }

  isShowEditTitle(id: number) {
    return this.statusEditId !== id;
  }

  saveEditStatus(i: number) {
    const newTitle = $(`#titleStatus${this.statusEditId}`).val();
    const status = {
      id: this.board.statuses[i].id,
      title: newTitle,
      position: this.board.statuses[i].position,
      board: {
        id: this.board.id,
      }
    };
    this.statusService.editStatus(status.id, status).subscribe(data => {console.log(data); this.getBoard(); this.statusEditId = -1; });
  }

  deleteStatus(id: number) {
    this.statusService.deleteStatus(id).subscribe(() => this.getBoard() );
  }
}
