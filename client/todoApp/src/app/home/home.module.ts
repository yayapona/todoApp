import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TaskComponent } from './task/task.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TaskComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule
    ]
})
export class HomeModule { }
