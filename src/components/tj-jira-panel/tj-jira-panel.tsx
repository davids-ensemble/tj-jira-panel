import { Component, Listen, Prop, State, h } from '@stencil/core';

import { User } from '../../utils/tj/User';

@Component({
  tag: 'tj-jira-panel',
  shadow: true,
})
export class TJJiraPanel {
  @Prop({ attribute: 'jira-id' }) jiraID: string;
  @Prop() jiraSummary: string;

  @State() isLoggedIn = false;
  @State() isLoading = true;

  async componentWillLoad() {
    if (User.sessionUuid) {
      const user = await User.isSessionValid();
      this.isLoggedIn = !!user;
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
        <with-loading isLoading={this.isLoading}>
          {!this.isLoggedIn ? (
            <tj-login-form></tj-login-form>
          ) : (
            'user is logged in'
          )}
        </with-loading>
      </notifications-provider>
    );
  }
}
