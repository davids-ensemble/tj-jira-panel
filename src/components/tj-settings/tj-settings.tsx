import { Component, Prop, State, h } from '@stencil/core';

import { Switch } from '@fc';

import { ServerPage } from './pages/ServerPage';
import { SettingsMenu } from './pages/SettingsMenu';

/**
 * Component for the settings page.
 */
@Component({
  tag: 'tj-settings',
  styleUrl: 'tj-settings.css',
  scoped: true,
})
export class TJSettings {
  /**
   * Whether the user is logged in. Used to determine which settings to show.
   */
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
              renderComponent: () => <SettingsMenu isLoggedIn={this.isLoggedIn} changePath={this.changePath} />,
            },
            {
              condition: this.path === 'server',
              renderComponent: () => <ServerPage />,
            },
            {
              condition: this.path === 'parent-tasks',
              renderComponent: () => <tj-parent-tasks-page></tj-parent-tasks-page>,
            },
            {
              condition: this.path === 'work-kind',
              renderComponent: () => <tj-work-kind-page></tj-work-kind-page>,
            },
            {
              condition: this.path !== 'menu',
              renderComponent: () => (
                <button data-path="menu" class="menuButton" onClick={this.changePath}>
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
