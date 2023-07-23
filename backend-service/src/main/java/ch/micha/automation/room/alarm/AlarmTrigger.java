package ch.micha.automation.room.alarm;

import ch.micha.automation.room.errorhandling.exceptions.InvalidAlarmState;
import ch.micha.automation.room.events.EventHandlerPriority;
import ch.micha.automation.room.events.HandlerPriority;
import ch.micha.automation.room.events.OnAppShutdownListener;
import ch.micha.automation.room.events.OnAppStartupListener;
import ch.micha.automation.room.scene.SceneEntity;
import ch.micha.automation.room.scene.SceneProvider;
import com.cronutils.model.CronType;
import com.cronutils.model.definition.CronDefinitionBuilder;
import com.cronutils.model.time.ExecutionTime;
import com.cronutils.parser.CronParser;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

@ApplicationScoped
public class AlarmTrigger implements OnAppStartupListener, OnAppShutdownListener {
    public static final int ALARM_CHECK_INTERVAL = 5; // minutes
    private static final Logger LOGGER = Logger.getLogger(AlarmTrigger.class.getSimpleName());

    private final AlarmProvider alarmProvider;
    private final SceneProvider sceneProvider;
    private final AlarmExecutor alarmExecutor;
    private final ScheduledExecutorService alarmCheckScheduler =
        Executors.newSingleThreadScheduledExecutor();
    private final CronParser cronParser =
        new CronParser(CronDefinitionBuilder.instanceDefinitionFor(CronType.UNIX));

    private Thread currentAlarmThread;

    @Inject
    public AlarmTrigger(AlarmProvider alarmProvider, SceneProvider sceneProvider, AlarmExecutor alarmExecutor) {
        this.alarmProvider = alarmProvider;
        this.sceneProvider = sceneProvider;
        this.alarmExecutor = alarmExecutor;
    }

    @Override
    @EventHandlerPriority(HandlerPriority.LAST)
    public void onAppStartup() {
        LOGGER.log(Level.INFO, "initializing alarm executor", new Object[]{ });

        // Calculate the initial delay to the next round five-minute interval
        int initialDelayMinutes = 5 - ( LocalDateTime.now().getMinute() % 5 );
        alarmCheckScheduler.scheduleAtFixedRate(this::checkForAlarmToRun, initialDelayMinutes, ALARM_CHECK_INTERVAL, TimeUnit.MINUTES);
        LOGGER.log(Level.INFO, "initialized alarm checker every {0} minutes", new Object[]{ ALARM_CHECK_INTERVAL });
    }

    @Override
    @EventHandlerPriority(HandlerPriority.FIRST)
    public void onAppShutdown() {
        LOGGER.log(Level.INFO, "stopping running alarms & scheduler");
        if(currentAlarmThread != null)
            currentAlarmThread.interrupt();
        alarmCheckScheduler.shutdown();
    }

    public void continueSceneOfAlarm() {
        if(currentAlarmThread != null && currentAlarmThread.isAlive()) {
            alarmExecutor.applyFinalVolume();
            currentAlarmThread.interrupt();
            currentAlarmThread = null;
            LOGGER.log(Level.INFO, "continued with scene after alarm");
        } else throw new InvalidAlarmState();
    }

    public void stopCurrentAlarm() {
        if(currentAlarmThread != null && currentAlarmThread.isAlive()) {
            alarmExecutor.stopAlarm();
            currentAlarmThread.interrupt();
            currentAlarmThread = null;
            LOGGER.log(Level.INFO, "interrupted current alarm");
        } else throw new InvalidAlarmState();
    }

    public AlarmEntity loadNextAlarm() {
        List<AlarmEntity> alarms = alarmProvider.loadAlarms();
        ZonedDateTime now = ZonedDateTime.now().minusMinutes(1); // to respect already started minute

        long minTimeGap = Integer.MAX_VALUE;
        AlarmEntity nextAlarm = null;
        for (AlarmEntity alarm : alarms) {
            if(alarm.active()) {
                long minutesToNextExecution = calcTimeUntil(alarm, now);
                if(minutesToNextExecution < minTimeGap) {
                    minTimeGap = minutesToNextExecution;
                    nextAlarm = alarm;
                }
            }
        }

        return nextAlarm;
    }

    public long calcTimeUntil(AlarmEntity alarm, ZonedDateTime from) {
        ExecutionTime executionTime = ExecutionTime.forCron(cronParser.parse(alarm.cronSchedule()));
        ZonedDateTime nextExecution = executionTime.nextExecution(from)
            .orElseThrow(() -> new IllegalStateException("alarm schedule will never occur again"));
        return Duration.between(from, nextExecution).toMinutes();
    }

    /**
     * checks if any alarm is scheduled in the next {@link #ALARM_CHECK_INTERVAL} minutes, if so
     * runs this alarm.
     * the first alarm that needs to be run will be executed, all others will be ignored.
     */
    private void checkForAlarmToRun() {
        LOGGER.log(Level.INFO, "checking if alarm needs to be executed");

        AlarmEntity nextAlarm = loadNextAlarm();
        if(calcTimeUntil(nextAlarm, ZonedDateTime.now().minusMinutes(1)) <= ALARM_CHECK_INTERVAL)
            runAlarm(nextAlarm);
    }

    private void runAlarm(AlarmEntity alarm) {
        Optional<SceneEntity> scene = sceneProvider.findSceneById(alarm.sceneId());
        if(scene.isEmpty()) {
            LOGGER.log(Level.WARNING,
                "could not find scene by id -> {0}, for alarm, not running alarm",
                new Object[]{alarm.sceneId()});
            // todo add to queue for UI notification
        } else {
            if(currentAlarmThread != null && currentAlarmThread.isAlive()) {
                LOGGER.log(Level.WARNING, "an alarm is already running, killing and starting new one");
                currentAlarmThread.interrupt();
            }

            alarmExecutor.setAlarmToRun(alarm);
            alarmExecutor.setSceneToRun(scene.get());
            currentAlarmThread = new Thread(alarmExecutor, "alarm-executor");
            currentAlarmThread.setUncaughtExceptionHandler(this::handleAlarmExecutorExceptions);
            currentAlarmThread.start();
            LOGGER.log(Level.INFO, "started new alarm with scene {0}", new Object[]{ scene.get().name() });
        }
    }

    // to handle exceptions thrown in the alarm executor thread
    // TODO add to queue for UI notification
    public void handleAlarmExecutorExceptions(Thread thread, Throwable throwable) {
        if(throwable instanceof IllegalStateException illegalState) {
            LOGGER.log(Level.SEVERE, "could not run alarm: {0}", new Object[]{ illegalState.getMessage() });
        } else
            LOGGER.log(Level.SEVERE, "unexpected error while running alarm", throwable);
    }
}
