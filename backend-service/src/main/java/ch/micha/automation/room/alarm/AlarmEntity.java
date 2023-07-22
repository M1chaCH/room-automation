package ch.micha.automation.room.alarm;

public record AlarmEntity(
    int id,
    String cronSchedule,
    boolean active,
    int sceneId
) { }