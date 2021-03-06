import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook }  from '@ionic-native/facebook';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { MatcherPage } from '../pages/matcher/matcher';

import { SocialService } from '../services/social-service'
import { Config } from '../config/config'

import { Autocomplete } from '../components/autocomplete/autocomplete'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    Autocomplete,
    MatcherPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    Autocomplete,
    MatcherPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    SocialService,
    Config,
  ]
})
export class AppModule {}
