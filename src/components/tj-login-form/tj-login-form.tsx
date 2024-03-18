import { Component, Event, EventEmitter, h } from '@stencil/core';

import type { LoginParams } from '@utils/tj';
import { User } from '@utils/tj';

import { Notification } from '../notifications-provider/types';

@Component({
  tag: 'tj-login-form',
  styleUrl: 'tj-login-form.css',
  scoped: true,
})
export class TJLoginForm {
  @Event() notification: EventEmitter<Notification>;
  @Event() login: EventEmitter<void>;

  onFormSubmit = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries([
      ...formData.entries(),
    ]) as unknown as LoginParams;
    try {
      await User.login(data);
      this.login.emit();
    } catch (error) {
      this.notification.emit({
        type: 'error',
        message: error.message,
      });
    }
  };

  render() {
    return (
      <form action="" onSubmit={this.onFormSubmit}>
        <label>
          Username
          <input
            type="text"
            placeholder="Your username"
            id="username"
            name="username"
            onKeyPress={(e: KeyboardEvent) => {
              e.stopImmediatePropagation();
            }}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Your very secret password"
            id="password"
            name="password"
            onKeyPress={(e: KeyboardEvent) => {
              e.stopImmediatePropagation();
            }}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    );
  }
}
