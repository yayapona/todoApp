import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {DataTaskService} from "../../core/service/data-task.service";
import {taskModel} from "../../model/taskModel";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  formTask!: FormGroup;
  dataTask: any = []
  taskModel = new taskModel();
  constructor(
    private _fb: FormBuilder,
    private taskService: DataTaskService
  ) {
    this.formTask = this._fb.group({
      taskName: ['', Validators.required]
    })
  };
  ngOnInit() {
    this.getAllTask()
  }

  getAllTask(){
    this.taskService.getAllTask()
      .subscribe(res => {
        this.dataTask = res.data.tasks;
        console.log(this.dataTask)
      })
  };
  postTask(){
    this.taskModel.taskName = this.formTask.get('taskName')?.value;
    this.taskService.AddTask(this.taskModel)
      .subscribe(res=> console.log(res))
  }

}
