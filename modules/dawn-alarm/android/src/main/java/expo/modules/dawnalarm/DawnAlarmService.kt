package expo.modules.dawnalarm

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.media.AudioAttributes
import android.media.MediaPlayer
import android.net.Uri
import android.os.Build
import android.os.IBinder
import android.util.Log

class DawnAlarmService : Service() {

    private var mediaPlayer: MediaPlayer? = null
    private var currentAlarmId: String = "manual"

    companion object {
        const val CHANNEL_ID = "dawn-active-alarm-v2"
        const val NOTIFICATION_ID = 2001

        const val ACTION_STOP =
            "expo.modules.dawnalarm.STOP_ALARM"

        const val ACTION_PAUSE =
            "expo.modules.dawnalarm.PAUSE_ALARM"

        const val ACTION_RESUME =
            "expo.modules.dawnalarm.RESUME_ALARM"

        const val TAG = "DawnAlarmService"
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
    }

    override fun onStartCommand(
        intent: Intent?,
        flags: Int,
        startId: Int
    ): Int {

        // Permanently stop the alarm service.
        if (intent?.action == ACTION_STOP) {
            stopAlarm()
            return START_NOT_STICKY
        }

        // Remember which alarm is active.
        currentAlarmId =
            intent?.getStringExtra("alarmId") ?: currentAlarmId

        // Temporarily stop the sound, but keep the service alive.
        if (intent?.action == ACTION_PAUSE) {
            pauseAlarmPlayback()
            updateNotification("Solve your puzzle before time runs out.")
            return START_NOT_STICKY
        }

        // Resume ringing when the puzzle countdown expires.
        if (intent?.action == ACTION_RESUME) {
            startForeground(
                NOTIFICATION_ID,
                buildNotification("Your alarm is ringing again.")
            )

            startAlarmPlayback()
            return START_STICKY
        }

        // Normal alarm startup.
        startForeground(
            NOTIFICATION_ID,
            buildNotification("Your alarm is ringing.")
        )

        startAlarmPlayback()

        return START_STICKY
    }

    private fun startAlarmPlayback() {
        if (mediaPlayer != null) return

        try {
            val audioAttributes = AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_ALARM)
                .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                .build()

            mediaPlayer = MediaPlayer.create(
                this,
                R.raw.alarm,
                audioAttributes,
                0
            )

            if (mediaPlayer == null) {
                Log.e(TAG, "MediaPlayer could not load R.raw.alarm")
                updateNotification("ERROR: Could not load alarm.wav")
            } else {
                mediaPlayer?.apply {
                    isLooping = true
                    setVolume(1.0f, 1.0f)
                    start()
                }

                Log.d(TAG, "Custom alarm started successfully")
                updateNotification("Your alarm is ringing.")
            }

        } catch (error: Exception) {
            Log.e(TAG, "Failed to start alarm playback", error)
            updateNotification("ERROR: Alarm playback failed")
        }
    }

    private fun pauseAlarmPlayback() {
        mediaPlayer?.release()
        mediaPlayer = null

        Log.d(TAG, "Alarm audio temporarily paused")
    }

    private fun createNotificationPendingIntent(): PendingIntent? {
        val launchIntent = packageManager
            .getLaunchIntentForPackage(packageName)
            ?: return null

        launchIntent.apply {
            action = Intent.ACTION_VIEW
            data = Uri.parse(
                "dawn://alarm/ringing?alarmId=${Uri.encode(currentAlarmId)}"
            )
            addFlags(
                Intent.FLAG_ACTIVITY_NEW_TASK or
                    Intent.FLAG_ACTIVITY_CLEAR_TOP or
                    Intent.FLAG_ACTIVITY_SINGLE_TOP
            )
        }

        val flags = PendingIntent.FLAG_UPDATE_CURRENT or
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                PendingIntent.FLAG_IMMUTABLE
            } else {
                0
            }

        return PendingIntent.getActivity(
            this,
            2002,
            launchIntent,
            flags
        )
    }

    private fun buildNotification(message: String): Notification {
        val builder = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Notification.Builder(this, CHANNEL_ID)
        } else {
            Notification.Builder(this)
                .setDefaults(0)
        }

        return builder
            .setContentTitle("Dawn Alarm")
            .setContentText(message)
            .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
            .setContentIntent(createNotificationPendingIntent())
            .setOngoing(true)
            .setAutoCancel(false)
            .setPriority(Notification.PRIORITY_MAX)
            .build()
    }

    private fun updateNotification(message: String) {
        val manager = getSystemService(NotificationManager::class.java)
        manager.notify(NOTIFICATION_ID, buildNotification(message))
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Active Dawn Alarm",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                setSound(null, null)
                enableVibration(false)
            }

            getSystemService(NotificationManager::class.java)
                .createNotificationChannel(channel)
        }
    }

    private fun stopAlarm() {
        mediaPlayer?.release()
        mediaPlayer = null

        stopForeground(true)
        stopSelf()
    }

    override fun onDestroy() {
        mediaPlayer?.release()
        mediaPlayer = null
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null
}