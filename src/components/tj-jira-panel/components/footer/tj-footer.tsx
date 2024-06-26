import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';

import { version } from '@root/package.json';
import { Server, User } from '@utils/tj';

import { Icon } from './Icons';

/**
 * The footer of the panel.
 * Displays the version of the server and the extension and provides a button to open/close the settings.
 */
@Component({
  tag: 'tj-footer',
  styleUrl: 'tj-footer.css',
  scoped: true,
})
export class TJFooter {
  /**
   * Emitted when the user presses the settings button.
   */
  @Event() showSettings: EventEmitter<void>;
  /**
   * Emitted when the user presses the close settings button.
   */
  @Event() hideSettings: EventEmitter<void>;

  /**
   * Whether the user is logged in. Certain information is only available when logged in.
   */
  @Prop() isLoggedIn: boolean;
  /**
   * The version of the script used to inject the panel.
   */
  @Prop() scriptVersion: string | undefined;

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
            aria-label={this.isSettingsOpen ? 'Close settings' : 'Open settings'}
            tabindex={0}
            onClick={() => {
              this.isSettingsOpen ? this.hideSettings.emit() : this.showSettings.emit();
              this.isSettingsOpen = !this.isSettingsOpen;
            }}
          />
        </div>
        <tj-update-banner scriptVersion={this.scriptVersion}></tj-update-banner>
        <div>
          <p>
            {this.isLoggedIn ? `Logged in as ${User.username} (${User.userId}) @ ` : null}
            {this.serverVersion ? 'TJ v' + this.serverVersion : null}
          </p>
          <a href={`https://github.com/davids-ensemble/tj-jira-panel/releases/tag/v${version}`} target="_blank">
            TJI v{version}
          </a>
        </div>
      </footer>
    );
  }
}
