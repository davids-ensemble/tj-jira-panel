import { Component, Prop, State, h } from '@stencil/core';

import { version } from '@root/package.json';
import { Server, User } from '@utils/tj';

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
   * Whether the user is logged in. Certain information is only available when logged in.
   */
  @Prop() isLoggedIn: boolean;
  /**
   * The version of the script used to inject the panel.
   */
  @Prop() scriptVersion: string | undefined;
  /**
   * Whether the panel is using jira-cloud theme or not.
   */
  @Prop() isJiraCloud: boolean;

  @State() serverVersion: string;
  @State() serverCountry: string;
  /**
   * Tracks whether the previous week's timesheet is unsubmitted.
   * When true, the update banner is suppressed so only one banner shows at a time.
   */
  @State() timesheetUnsubmitted: boolean = false;

  async componentWillLoad() {
    const config = await Server.fetchServerConfig();
    this.serverVersion = config.version;
    this.serverCountry = config.country;
  }

  handleTimesheetSubmittedChange = (e: CustomEvent<boolean>) => {
    this.timesheetUnsubmitted = !e.detail;
  };

  render() {
    return (
      <footer>
        {!this.isJiraCloud && (
          <div>
            <settings-button></settings-button>
          </div>
        )}
        <tj-unsubmitted-banner
          isLoggedIn={this.isLoggedIn}
          onTimesheetSubmittedChange={this.handleTimesheetSubmittedChange}
        ></tj-unsubmitted-banner>
        {!this.timesheetUnsubmitted && <tj-update-banner scriptVersion={this.scriptVersion}></tj-update-banner>}
        <div>
          <p>
            {this.isLoggedIn ? `Logged in as ${User.username} (${User.userId}) @ ` : null}
            {this.serverVersion ? 'TJ v' + this.serverVersion : null}
            {this.serverCountry ? ` (${this.serverCountry})` : null}
          </p>
          <a href={`https://github.com/davids-ensemble/tj-jira-panel/releases/tag/v${version}`} target="_blank">
            TJI v{version}
          </a>
        </div>
      </footer>
    );
  }
}
