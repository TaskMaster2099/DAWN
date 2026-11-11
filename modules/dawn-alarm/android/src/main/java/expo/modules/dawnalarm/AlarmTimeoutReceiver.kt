package expo.modules.dawnalarm

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build

class AlarmTimeoutReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent?) {
        val alarmId = intent?.getStringExtra("alarmId") ?: return

        // Tell the alarm service to resume ringing.
        val serviceIntent = Intent(
            context,
            DawnAlarmService::class.java
        ).apply {
            action = DawnAlarmService.ACTION_RESUME
            putExtra("alarmId", alarmId)
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(serviceIntent)
        } else {
            context.startService(serviceIntent)
        }
    }
}