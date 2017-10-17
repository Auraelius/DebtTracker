import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillCreatePage } from './bill-create';

@NgModule({
  declarations: [
    BillCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(BillCreatePage),
  ],
})
export class BillCreatePageModule {}
