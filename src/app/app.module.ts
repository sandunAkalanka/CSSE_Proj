import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

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
import { FarestatsPage } from '../pages/farestats/farestats';

import { ViewselectedjourneyPage } from '../pages/viewselectedjourney/viewselectedjourney';
import { journeyHandler } from '../pages/journeyHandler/journeyHandler';
import { ResetPwdPage } from '../pages/ResetPwd/ResetPwd';
import { SignInPage } from '../pages/SignIn/SignIn';
import { SignUpPage } from '../pages/SignUp/SignUp';
import { MapPage } from '../pages/map/map';

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
    FarestatsPage,
    ViewselectedjourneyPage,
    journeyHandler,
    ResetPwdPage,
    SignInPage,
    SignUpPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
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
    FarestatsPage,
    ViewselectedjourneyPage,
    journeyHandler,
    ResetPwdPage,
    SignInPage,
    SignUpPage,
    MapPage
  ],
  providers: [
    StatusBar,
    BarcodeScanner,
    QRScanner,
    Geolocation,
    NativeGeocoder,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
