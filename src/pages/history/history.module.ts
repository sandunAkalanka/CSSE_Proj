import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import { LastjourneyPage } from '../lastjourney/lastjourney';

@NgModule({
  declarations: [
    HistoryPage,
    LastjourneyPage
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage),
  ],
})
export class HistoryPageModule {}
