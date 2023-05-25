package ch.micha.automation.room.scene;

import ch.micha.automation.room.light.configuration.LightConfig;
import ch.micha.automation.room.light.yeelight.YeelightDeviceEntity;
import ch.micha.automation.room.scene.dtos.SceneDTO;
import ch.micha.automation.room.scene.dtos.SceneLightConfigDTO;
import ch.micha.automation.room.spotify.dtos.SpotifyResourceDTO;

import java.util.Map;

public record SceneEntity(
        int id,
        String name,
        boolean defaultScene,
        Map<YeelightDeviceEntity, LightConfig> lights,
        String spotifyResource,
        int spotifyVolume
) {
    public SceneDTO toDto(SpotifyResourceDTO resource) {
        return new SceneDTO(id, name, defaultScene, resource, spotifyVolume, lights.entrySet()
                .stream()
                .map(entry -> new SceneLightConfigDTO(entry.getKey().toDto(), entry.getValue())).toList()
        );
    }
}