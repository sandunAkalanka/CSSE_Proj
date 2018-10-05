import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { journeyHandler } from '../pages/journeyHandler/journeyHandler';
import { MapPage } from '../pages/map/map';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Geolocation } from '@ionic-native/geolocation';
// import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { SignInPage } from '../pages/SignIn/SignIn';
import { SignUpPage } from '../pages/SignUp/SignUp';
import { ResetPwdPage } from '../pages/ResetPwd/ResetPwd';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    journeyHandler,
    MapPage,
    SignInPage,
    SignUpPage,
    ResetPwdPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    NgxQRCodeModule,
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    journeyHandler,
    MapPage,
    SignInPage,
    SignUpPage,
    ResetPwdPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Toast,
    DataServiceProvider,
    Geolocation,
    RestProvider,
    NativeGeocoder,
    QRScanner
  ]
})
export class AppModule {}
