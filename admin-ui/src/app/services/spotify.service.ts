import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {firstValueFrom, Observable, of} from "rxjs";
import {apiEndpoints, appRoutes} from "../configuration/app.config";
import {SpotifyClientDTO} from "../dtos/SpotifyClientDTO";
import {environment} from "../../environments/environment";
import {SpotifyResourceDTO} from "../dtos/SpotifyResourceDTO";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyClient: SpotifyClientDTO | undefined;
  spotifyResources: SpotifyResourceDTO[] | undefined;

  constructor(
    private api: ApiService,
  ) { }

  isAuthorized(): Observable<boolean> {
    return new Observable<boolean>(observable => {
      this.api.callApi(
        apiEndpoints.SPOTIFY,
        "GET",
        undefined
      ).subscribe({
        next: () => observable.next(true),
        error: () => observable.next(false)
      });
    });
  }

  togglePlay(): void {
    this.api.callApi(
      apiEndpoints.SPOTIFY_PLAYBACK,
      "PUT",
      undefined
    ).subscribe(() => {});
  }

  fetchResources(): Observable<SpotifyResourceDTO[]> {
    if(this.spotifyResources)
      return of(this.spotifyResources);

    return new Observable<SpotifyResourceDTO[]>(obs => {
      this.api.callApi<SpotifyResourceDTO[]>(
        apiEndpoints.SPOTIFY_RESOURCES,
        "GET",
        undefined
      ).subscribe({
        next: resources => {
          obs.next(resources);
          this.spotifyResources = resources;
        },
        error: () => obs.next([])
      })
    });
  }

  async loadClient() {
    this.spotifyClient = await firstValueFrom(this.api.callApi<SpotifyClientDTO>(
      apiEndpoints.SPOTIFY_CLIENT,
      "GET",
      undefined
    ));
  }

  requestAccessToken(code: string): Observable<boolean> {
    const redirectUrl: string = `${environment.UI_URL}/${appRoutes.ROOT}/${appRoutes.SPOTIFY_CALLBACK}`;

    return new Observable<boolean>(observable => {
      this.api.callApi(
        apiEndpoints.SPOTIFY,
        "POST",
        { code, redirectUrl }
      ).subscribe({
        next: () => observable.next(true),
        error: () => observable.next(false)
      });
    });
  }
}
