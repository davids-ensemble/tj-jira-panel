import { Component, Prop, State, h } from '@stencil/core';

import { Switch } from '../Switch/Switch';
import { ServerPage } from './pages/ServerPage';
import { SettingsMenu } from './pages/SettingsMenu';

@Component({
  tag: 'tj-settings',
  styleUrl: 'tj-settings.css',
  shadow: true,
})
export class TJSettings {
  @Prop() isLoggedIn: boolean;

  @State() path = 'menu';

  changePath = (e: Event) => {
    const target = e.target as HTMLButtonElement;
    this.path = target.dataset.path;
  };

  render() {
    return (
      <div class="settingsPage">
        <p>
          <strong>Settings</strong>
        </p>
        <Switch
          cases={[
            {
              condition: this.path === 'menu',
              renderComponent: () => (
                <SettingsMenu
                  isLoggedIn={this.isLoggedIn}
                  changePath={this.changePath}
                />
              ),
            },
            {
              condition: this.path === 'server',
              renderComponent: () => <ServerPage />,
            },
            {
              condition: this.path === 'parent-tasks',
              renderComponent: () => (
                <tj-parent-tasks-page></tj-parent-tasks-page>
              ),
            },
            {
              condition: this.path !== 'menu',
              renderComponent: () => (
                <button
                  data-path="menu"
                  class="menuButton"
                  onClick={this.changePath}
                >
                  Back
                </button>
              ),
            },
          ]}
        />
      </div>
    );
  }
}
