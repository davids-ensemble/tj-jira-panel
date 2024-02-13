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

  async componentWillLoad() {
    if (User.sessionUuid) {
      const isValid = await User.isSessionValid();
      if (isValid) {
        this.onLogin();
      }
    }
    this.isLoading = false;
  }

  @Listen('login')
  onLogin() {
    this.isLoggedIn = true;
    this.path = 'task';
  }

  @Listen('togglePanel')
  onTogglePanel() {
    this.isExpanded = !this.isExpanded;
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
                  renderComponent: () => 'user is logged in ',
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
