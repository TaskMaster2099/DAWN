package expo.modules.dawnalarm

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import java.util.Calendar

object DawnAlarmScheduler {

    private const val ACTION_DAILY_ALARM =
        "expo.modules.dawnalarm.DAILY_ALARM"

    fun scheduleDailyAlarm(
        context: Context,
        hour: Int,
        minute: Int,
        alarmId: String
    ) {
        require(hour in 0..23) { "Hour must be between 0 and 23." }
        require(minute in 0..59) { "Minute must be between 0 and 59." }

        val alarmManager =
            context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        
        if (
            Build.VERSION.SDK_INT >= Build.VERSION_CODES.S &&
            !alarmManager.canScheduleExactAlarms()
        ) {
            throw SecurityException(
                "Dawn does not have permission to schedule exact alarms."
            )
        }

        val pendingIntent = createPendingIntent(
            context, alarmId, hour, minute
        )

        val triggerTime = getNextTriggerTime(hour, minute)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            alarmManager.setExactAndAllowWhileIdle(
                AlarmManager.RTC_WAKEUP,
                triggerTime,
                pendingIntent
            )
        } else {
            alarmManager.setExact(
                AlarmManager.RTC_WAKEUP,
                triggerTime,
                pendingIntent
            )
        }
    }

    fun cancelScheduledAlarm(context: Context, alarmId: String) {
        val alarmManager =
            context.getSystemService(Context.ALARM_SERVICE) as AlarmManager

        val pendingIntent = createPendingIntent(
            context, alarmId, 0, 0
        )

        alarmManager.cancel(pendingIntent)
        pendingIntent.cancel()
    }

    fun scheduleNextOccurrence(
        context: Context,
        alarmId: String,
        hour: Int,
        minute: Int
    ) {
        scheduleDailyAlarm(context, hour, minute, alarmId)
    }

    private fun createPendingIntent(
        context: Context,
        alarmId: String,
        hour: Int,
        minute: Int
    ): PendingIntent {
        val intent = Intent(context, DawnAlarmReceiver::class.java).apply {
            action = ACTION_DAILY_ALARM
            data = Uri.parse("dawn://alarm/$alarmId")
            putExtra("alarmId", alarmId)
            putExtra("hour", hour)
            putExtra("minute", minute)
        }

        val flags = PendingIntent.FLAG_UPDATE_CURRENT or
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                PendingIntent.FLAG_IMMUTABLE
            } else {
                0
            }

        return PendingIntent.getBroadcast(
            context,
            alarmId.hashCode(),
            intent,
            flags
        )
    }

    private fun getNextTriggerTime(hour: Int, minute: Int): Long {
        val calendar = Calendar.getInstance().apply {
            set(Calendar.HOUR_OF_DAY, hour)
            set(Calendar.MINUTE, minute)
            set(Calendar.SECOND, 0)
            set(Calendar.MILLISECOND, 0)

            if (timeInMillis <= System.currentTimeMillis()) {
                add(Calendar.DAY_OF_YEAR, 1)
            }
        }

        return calendar.timeInMillis
    }
}