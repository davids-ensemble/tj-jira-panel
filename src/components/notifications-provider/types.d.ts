export interface Notification {
  /**
   * The type of notification to display. This will determine the color  and icon of the notification.
   */
  type: 'success' | 'error';
  message: string;
  /**
   * The number of milliseconds to display the notification for. Defaults to 5000.
   */
  timeout?: number;
}
