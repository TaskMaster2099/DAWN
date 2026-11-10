
import {Platform} from 'react-native';
import * as Notifications from 'expo-notifications';

export async function prepareAlarmPermissions() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('dawn-alarms-custom', {
            name: 'Dawn Alarms',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            enableVibrate: true,
            sound: 'alarm.wav'
        });
    }

    let permissions = await Notifications.getPermissionsAsync();

    if (!permissions.granted) {
        permissions = await Notifications.requestPermissionsAsync();
    }

    if (!permissions.granted) {
        throw new Error('Notification permissions not granted.');
    }

    let exactAlarmGranted = false;

    if (Platform.OS === 'android') {
        let exactPermission =
            await Notifications.getExactAlarmPermissionsAsync();

        if (!exactPermission.granted) {
            exactPermission =
                await Notifications.requestExactAlarmPermissionsAsync();
        }

        exactAlarmGranted = exactPermission.granted;
    }

    return exactAlarmGranted;
}

export function convertTo24Hour(timeString) {
    const match = timeString.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

    if (!match) {
        throw new Error('Invalid alarm time.');
    }

    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const period = match[3].toUpperCase();

    if (hour < 1 || hour > 12 || minute < 0 || minute > 59) {
        throw new Error('Invalid alarm time.');
    }

    hour = hour % 12;

    if (period === 'PM') {
        hour += 12;
    }

    return {hour, minute};
}

export async function scheduleDailyAlarm(timeString, alarmId) {
    await prepareAlarmPermissions();

    const {hour, minute} = convertTo24Hour(timeString);

    const trigger = {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute
    };

    if (Platform.OS === 'android') {
        trigger.channelId = 'dawn-alarms-custom';
    }

    return await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Dawn Alarm',
            body: 'Time to wake up! Tap to open Dawn.',
            sound: 'alarm.wav',
            data: {alarmId}
        },
        trigger
    });
}

export async function cancelAlarm(notificationId) {
    if (!notificationId) return;

    await Notifications.cancelScheduledNotificationAsync(notificationId);
}