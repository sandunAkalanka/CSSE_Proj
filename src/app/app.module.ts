import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRScanner } from '@ionic-native/qr-scanner';

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
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { ChangepassPage } from '../pages/changepass/changepass';
import { ViewselectedjourneyPage } from '../pages/viewselectedjourney/viewselectedjourney';
import { journeyHandler } from '../pages/journeyHandler/journeyHandler';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    HistoryPage,
    LastjourneyPage,
    AlljourneysPage,
    GetinpointsPage,
    GetoffpointsPage,
    ProfileViewPage,
    EditprofilePage,
    ChangepassPage,
    ViewselectedjourneyPage,
    journeyHandler
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    BarcodeScanner,
    QRScanner,
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
    GetoffpointsPage,
    ProfileViewPage,
    EditprofilePage,
    ChangepassPage,
    ViewselectedjourneyPage,
    journeyHandler
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
