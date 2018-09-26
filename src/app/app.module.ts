import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HistoryPage } from '../pages/history/history';
import { LastjourneyPage } from '../pages/lastjourney/lastjourney';
import { AlljourneysPage } from '../pages/alljourneys/alljourneys';
import { GetinpointsPage } from '../pages/getinpoints/getinpoints';
import { GetoffpointsPage } from '../pages/getoffpoints/getoffpoints';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    HistoryPage,
    LastjourneyPage,
    AlljourneysPage,
    GetinpointsPage,
    GetoffpointsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    HistoryPage,
    LastjourneyPage,
    AlljourneysPage,
    GetinpointsPage,
    GetoffpointsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
