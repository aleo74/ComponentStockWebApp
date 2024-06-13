import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailRoutingModule } from './detail-routing.module';

import { LoaderComponent } from "../../loader/loader.component";
import { SharedModule } from '../../shared/shared.module';
import { DetailComponent } from './detail.component';

@NgModule({
    declarations: [DetailComponent],
    imports: [CommonModule, SharedModule, DetailRoutingModule, LoaderComponent]
})
export class DetailModule {}
