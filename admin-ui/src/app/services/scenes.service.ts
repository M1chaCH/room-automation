import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {SceneDTO, SimpleSceneDTO} from "../dtos/scene/SceneDTO";
import {apiEndpoints} from "../configuration/app.config";
import {LightConfigDTO} from "../dtos/scene/LightConfigDTO";
import {ChangeSceneDTO} from "../dtos/scene/ChangeSceneDTO";
import {SceneApplyResponseDTO} from "../dtos/ApplyResponseDTOs";

@Injectable({
  providedIn: 'root'
})
export class ScenesService {

  constructor(
    private api: ApiService,
  ) { }

  applyScene(id: number, playAudio: boolean): Observable<SceneApplyResponseDTO> {
    return this.api.callApi<SceneApplyResponseDTO>(`${apiEndpoints.SCENE}/${id}?audio=${playAudio}`, "POST", undefined);
  }

  loadScenes(): Observable<SceneDTO[]> {
    return this.api.callApi<SceneDTO[]>(apiEndpoints.SCENE_CRUD, "GET", undefined);
  }

  loadSimpleScenes(): Observable<SimpleSceneDTO[]> {
    return this.api.callApi<SimpleSceneDTO[]>(`${apiEndpoints.SCENE_CRUD}/simple`, "GET", undefined);
  }

  createScene(scene: ChangeSceneDTO): Observable<SceneDTO> {
    return this.api.callApi<SceneDTO>(apiEndpoints.SCENE_CRUD, "POST", scene);
  }

  updateScene(scene: ChangeSceneDTO): Observable<void> {
    return this.api.callApi(apiEndpoints.SCENE_CRUD, "PUT", scene);
  }

  deleteScene(id: number): Observable<void> {
    return this.api.callApi(`${apiEndpoints.SCENE_CRUD}/${id}`, "DELETE", undefined);
  }

  loadLightConfigs(): Observable<LightConfigDTO[]> {
    return this.api.callApi<LightConfigDTO[]>(apiEndpoints.CONFIG_CRUD, "GET", undefined);
  }

  createLightConfig(lightConfig: LightConfigDTO): Observable<LightConfigDTO> {
    return this.api.callApi<LightConfigDTO>(apiEndpoints.CONFIG_CRUD, "POST", lightConfig);
  }

  updateLightConfig(lightConfig: LightConfigDTO): Observable<void> {
    return this.api.callApi<void>(apiEndpoints.CONFIG_CRUD, "PUT", lightConfig);
  }

  removeLightConfig(configId: number): Observable<void> {
    return this.api.callApi<void>(`${apiEndpoints.CONFIG_CRUD}/${configId}`, "DELETE", undefined);
  }
}
