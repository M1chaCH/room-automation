import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home.page/home.page.component';
import { ScenesPageComponent } from './pages/scenes.page/scenes.page.component';
import { SpotifyPageComponent } from './pages/spotify.page/spotify.page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {PageMessagesComponent} from "./components/page-messages/page-messages.component";
import { SpotifyAuthorisationComponent } from './components/spotify/spotify.authorisation/spotify-authorisation.component';
import { SpotifyResourcesComponent } from './components/spotify/spotify.resources/spotify.resources.component';
import { FancyButtonComponent } from './components/fancy-button/fancy-button.component';
import { DevicePageComponent } from './pages/device.page/device.page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SceneComponent } from './components/scene/scene.component';
import { LightConfigComponent } from './components/light-config/light-config.component';
import { HiddenInputComponent } from './components/hidden-input/hidden-input.component';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { RgbConvertPipe } from './pipes/rgb-convert.pipe';
import { BrightnessConvertPipe } from './pipes/brightness-convert.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ScenesPageComponent,
    SpotifyPageComponent,
    NavigationComponent,
    PageMessagesComponent,
    SpotifyAuthorisationComponent,
    SpotifyResourcesComponent,
    FancyButtonComponent,
    DevicePageComponent,
    SceneComponent,
    LightConfigComponent,
    HiddenInputComponent,
    RgbConvertPipe,
    BrightnessConvertPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
