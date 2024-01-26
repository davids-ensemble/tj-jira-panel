import { Component, Listen, Prop, State, h } from '@stencil/core';

import { User } from '../../utils/tj/User';

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

  async componentWillLoad() {
    if (User.sessionUuid) {
      const isValid = await User.isSessionValid();
      this.isLoggedIn = isValid;
    }
    this.isLoading = false;
  }

  @Listen('login')
  onLogin() {
    this.isLoggedIn = true;
  }

  render() {
    return (
      <notifications-provider>
        <section>
          <with-loading isLoading={this.isLoading}>
            {!this.isLoggedIn ? (
              <tj-login-form></tj-login-form>
            ) : (
              'user is logged in'
            )}
            <tj-footer isLoggedIn={this.isLoggedIn}></tj-footer>
          </with-loading>
        </section>
      </notifications-provider>
    );
  }
}
