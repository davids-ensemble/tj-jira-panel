import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';

import { version } from '@root/package.json';
import { Server } from '@utils/tj/Server';
import { User } from '@utils/tj/User';
import { Icon } from './Icons';

@Component({
  tag: 'tj-footer',
  styleUrl: 'tj-footer.css',
  shadow: true,
})
export class TJFooter {
  @Event() showSettings: EventEmitter<void>;
  @Event() hideSettings: EventEmitter<void>;

  @Prop() isLoggedIn: boolean;

  @State() serverVersion: string;
  @State() isSettingsOpen = false;

  async componentWillLoad() {
    const config = await Server.fetchServerConfig();
    this.serverVersion = config.version;
  }

  render() {
    return (
      <footer>
        <div>
          <Icon
            type={this.isSettingsOpen ? 'settings-x' : 'settings'}
            size={24}
            role="button"
            aria-label={
              this.isSettingsOpen ? 'Close settings' : 'Open settings'
            }
            tabindex={0}
            onClick={() => {
              this.isSettingsOpen
                ? this.hideSettings.emit()
                : this.showSettings.emit();
              this.isSettingsOpen = !this.isSettingsOpen;
            }}
          />
        </div>
        <div>
          <p>
            {this.isLoggedIn
              ? `Logged in as ${User.username} (${User.userId}) @ `
              : null}
            {this.serverVersion ? 'TJ v' + this.serverVersion : null}
          </p>
          <p>TJI v{version}</p>
        </div>
      </footer>
    );
  }
}
