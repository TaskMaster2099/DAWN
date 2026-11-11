package expo.modules.dawnalarm

import android.content.Intent
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DawnAlarm : Module() {
    override fun definition() = ModuleDefinition {
        Name("dawn-alarm")

        Function("hello") {
            "Hello from Dawn's native Android module!"
        }

        Function("startAlarm") {
            val context = appContext.reactContext
                ?: throw Exception("React context is unavailable")

            val intent = Intent(context, DawnAlarmService::class.java)

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent)
            } else {
                context.startService(intent)
            }

            Unit
        }

        Function("stopAlarm") {
            val context = appContext.reactContext
                ?: throw Exception("React context is unavailable")

            val intent = Intent(context, DawnAlarmService::class.java).apply {
                action = DawnAlarmService.ACTION_STOP
            }

            context.startService(intent)

            Unit
        }

        Function("pauseAlarmForPuzzle") {
            alarmId: String, delayMillis: Double ->

            val context = appContext.reactContext
                ?: throw Exception("React context is unavailable")

            // Schedule the restart before silencing the alarm.
            DawnAlarmScheduler.schedulePuzzleTimeout(
                context,
                alarmId,
                delayMillis.toLong()
            )

            // Temporarily pause the alarm audio.
            val intent = Intent(
                context,
                DawnAlarmService::class.java
            ).apply {
                action = DawnAlarmService.ACTION_PAUSE
                putExtra("alarmId", alarmId)
            }

            context.startService(intent)

            Unit
        }

        Function("dismissAlarm") {
            alarmId: String ->

            val context = appContext.reactContext
                ?: throw Exception("React context is unavailable")

            // Prevent the countdown from restarting a dismissed alarm.
            DawnAlarmScheduler.cancelPuzzleTimeout(
                context,
                alarmId
            )

            // Permanently stop the alarm service.
            val intent = Intent(
                context,
                DawnAlarmService::class.java
            ).apply {
                action = DawnAlarmService.ACTION_STOP
            }

            context.startService(intent)

            Unit
        }

        Function("scheduleDailyAlarm") {
            hour: Int, minute: Int, alarmId: String ->

            val context = appContext.reactContext
                ?: throw Exception("React context is unavailable")

            DawnAlarmScheduler.scheduleDailyAlarm(
                context,
                hour,
                minute,
                alarmId
            )

            Unit
        }

        Function("cancelScheduledAlarm") {
            alarmId: String ->

            val context = appContext.reactContext
                ?: throw Exception("React context is unavailable")

            DawnAlarmScheduler.cancelScheduledAlarm(
                context,
                alarmId
            )

            Unit
        }
    }
}