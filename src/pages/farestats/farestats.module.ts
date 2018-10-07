import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarestatsPage } from './farestats';

@NgModule({
  declarations: [
    FarestatsPage,
  ],
  imports: [
    IonicPageModule.forChild(FarestatsPage),
  ],
})
export class FarestatsPageModule {}
