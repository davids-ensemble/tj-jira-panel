import { Component, Host, Listen, State, h } from '@stencil/core';

import type { Notification } from './types';

type KeyedNotification = Required<Notification> & { identifier: string };

@Component({
  tag: 'notifications-provider',
  styleUrl: 'notifications-provider.css',
  scoped: true,
})
export class NotificationsProvider {
  @State() notifications: KeyedNotification[] = [];

  @Listen('notification')
  onNotification(event: CustomEvent<Notification>) {
    const data = {
      timeout: 5000,
      ...event.detail,
      identifier: Math.random().toString() + event.detail.type,
    };
    this.notifications = [...this.notifications, data];
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <div class="notifications">
          {this.notifications.map(notification => (
            <notification-toast
              key={notification.identifier}
              {...notification}
            />
          ))}
        </div>
      </Host>
    );
  }
}
