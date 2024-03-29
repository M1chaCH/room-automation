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
import { RgbConvertPipe } from './pipes/light-config-converters/rgb-convert.pipe';
import { BrightnessConvertPipe } from './pipes/light-config-converters/brightness-convert.pipe';
import { AddSceneComponent } from './components/add-scene/add-scene.component';
import { LightConfigsPageComponent } from './pages/light-configs.page/light-configs.page.component';
import { AddLightConfigComponent } from './components/add-light-config/add-light-config.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import {RgbsConvertPipe} from "./pipes/light-config-converters/rgba-convert.pipe";
import { VerifyPopupComponent } from './components/verify-popup/verify-popup.component';
import { LightConfigPreviewComponent } from './components/light-config-preview/light-config-preview.component';
import { SpotifyPlayerComponent } from './components/spotify/spotify.player/spotify.player.component';
import {NgOptimizedImage} from "@angular/common";
import { SceneAudioComponent } from './components/scene-audio/scene-audio.component';
import { SpotifyResourceSelectorComponent } from './components/spotify/spotify.resource-selector/spotify.resource-selector.component';
import { MessageDetailPageComponent } from './pages/message-detail.page/message-detail-page.component';
import { AlarmPageComponent } from './pages/alarm.page/alarm.page.component';
import { AddAlarmComponent } from './components/add-alarm/add-alarm.component';
import { SceneSelectorComponent } from './components/scene-selector/scene-selector.component';
import { AlarmDaysComponent } from './components/alarm-days/alarm-days.component';
import { SubstringPipe } from './pipes/substring.pipe';
import { NextAlarmComponent } from './components/next-alarm/next-alarm.component';
import { AlarmListenerComponent } from './components/alarm-listener/alarm-listener.component';

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
    RgbsConvertPipe,
    AddSceneComponent,
    LightConfigsPageComponent,
    AddLightConfigComponent,
    ColorPickerComponent,
    VerifyPopupComponent,
    LightConfigPreviewComponent,
    SpotifyPlayerComponent,
    SceneAudioComponent,
    SpotifyResourceSelectorComponent,
    MessageDetailPageComponent,
    AlarmPageComponent,
    AddAlarmComponent,
    SceneSelectorComponent,
    AlarmDaysComponent,
    SubstringPipe,
    NextAlarmComponent,
    AlarmListenerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgOptimizedImage
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
