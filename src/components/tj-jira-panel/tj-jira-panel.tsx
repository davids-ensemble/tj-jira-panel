import { Component, Listen, Prop, State, h } from '@stencil/core';

import { User } from '@utils/tj/User';
import { Switch } from '../Switch/Switch';

@Component({
  tag: 'tj-jira-panel',
  styleUrl: 'tj-jira-panel.css',
  shadow: true,
})
export class TJJiraPanel {
  @Prop({ attribute: 'jira-id' }) jiraID: string;
  @Prop() jiraSummary: string;

  @State() isLoggedIn = false;
  @State() isLoading = true;
  @State() isExpanded = true;
  @State() path = 'login';
  @State() lastPath = 'login';

  async componentWillLoad() {
    if (User.sessionUuid) {
      const isValid = await User.isSessionValid();
      if (isValid) {
        this.onLogin();
      }
    }
    this.isLoading = false;
  }

  updatePath(value: string) {
    this.lastPath = this.path;
    this.path = value;
  }

  @Listen('login')
  onLogin() {
    this.isLoggedIn = true;
    this.updatePath('task');
  }

  @Listen('togglePanel')
  onTogglePanel() {
    this.isExpanded = !this.isExpanded;
  }

  @Listen('showSettings')
  onShowSettings() {
    this.updatePath('settings');
  }

  @Listen('hideSettings')
  onHideSettings() {
    this.path = this.lastPath;
  }

  render() {
    return (
      <notifications-provider>
        <tj-heading isExpanded={this.isExpanded}></tj-heading>
        <with-loading isLoading={this.isLoading}>
          <main id="tj-panel" aria-hidden={this.isExpanded ? 'false' : 'true'}>
            <Switch
              shouldBreak
              cases={[
                {
                  condition: this.path === 'login',
                  renderComponent: () => <tj-login-form></tj-login-form>,
                },
                {
                  condition: this.path === 'task',
                  renderComponent: () => (
                    <tj-task-page
                      jiraID={this.jiraID}
                      jiraSummary={this.jiraSummary}
                    ></tj-task-page>
                  ),
                },
                {
                  condition: this.path === 'settings',
                  renderComponent: () => (
                    <tj-settings isLoggedIn={this.isLoggedIn}></tj-settings>
                  ),
                },
              ]}
            />
            <tj-footer isLoggedIn={this.isLoggedIn}></tj-footer>
          </main>
        </with-loading>
      </notifications-provider>
    );
  }
}
