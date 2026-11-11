import { NativeModule, requireNativeModule } from 'expo';

declare class DawnAlarmModule extends NativeModule<{}> {
  hello(): string;
  startAlarm(): void;
  stopAlarm(): void;
  pauseAlarmForPuzzle(alarmId: string, delayMillis: number): void;
  dismissAlarm(alarmId: string): void;
  scheduleDailyAlarm(hour: number, minute: number, alarmId: string): void;
  cancelScheduledAlarm(alarmId: string): void;
}

export default requireNativeModule<DawnAlarmModule>('dawn-alarm');