import { Component, Prop, State, h } from '@stencil/core';

import { Icon } from './Icons';
import type { Notification } from './types';

@Component({
  tag: 'notification-toast',
  styleUrl: 'notification-toast.css',
  scoped: true,
})
export class NotificationToast {
  @Prop() identifier!: string;
  @Prop() message!: string;
  @Prop() type!: Notification['type'];
  @Prop() timeout!: number;

  @State() shouldRender = true;
  @State() timeoutID: NodeJS.Timeout;

  componentWillLoad() {
    this.timeoutID = setTimeout(() => {
      this.shouldRender = false;
    }, this.timeout);
  }

  closeNotification = () => {
    clearTimeout(this.timeoutID);
    this.shouldRender = false;
  };

  render() {
    return this.shouldRender ? (
      <div
        class="notification"
        id={this.identifier}
        data-type={this.type}
        style={{ '--timeout': this.timeout / 1000 + 's' }}
      >
        <Icon type={this.type} />
        <p>{this.message}</p>
        <div role="separator"></div>
        <button
          aria-label="close notification"
          onClick={this.closeNotification}
        >
          <Icon type="close" size={16} />
        </button>
      </div>
    ) : null;
  }
}
