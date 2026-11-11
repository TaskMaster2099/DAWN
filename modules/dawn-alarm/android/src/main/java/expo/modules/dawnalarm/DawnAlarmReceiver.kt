package expo.modules.dawnalarm

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build

class DawnAlarmReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent?) {
        val alarmId = intent?.getStringExtra("alarmId")
        val hour = intent?.getIntExtra("hour", -1) ?: -1
        val minute = intent?.getIntExtra("minute", -1) ?: -1

        // Start the alarm service and pass it the alarm ID.
        val serviceIntent = Intent(context, DawnAlarmService::class.java).apply {
            putExtra("alarmId", alarmId)
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(serviceIntent)
        } else {
            context.startService(serviceIntent)
        }

        // Schedule this alarm again for the next day.
        if (alarmId != null && hour in 0..23 && minute in 0..59) {
            DawnAlarmScheduler.scheduleNextOccurrence(
                context,
                alarmId,
                hour,
                minute
            )
        }
    }
}