import { Component, Listen, Prop, State, h } from '@stencil/core';

import { Loader, Switch } from '@fc';
import { LOCAL_STORAGE_KEYS, User, migrateV1SelectedTasks } from '@utils/tj';

@Component({
  tag: 'tj-jira-panel',
  styleUrl: 'tj-jira-panel.css',
  scoped: true,
})
export class TJJiraPanel {
  /**
   * The Jira ID of the task to display.
   */
  @Prop({ attribute: 'jira-id' }) jiraID!: string;
  /**
   * The Jira summary of the task to display.
   */
  @Prop() jiraSummary!: string;
  /**
   * The version of the script used to inject the panel.
   */
  @Prop() scriptVersion: string | undefined;
  /**
   * The Jira description of the task.
   */
  @Prop() jiraDescription: string | undefined;

  @Prop() theme: 'jira-cloud' | 'jira-server' = 'jira-server';

  @State() isLoggedIn = false;
  @State() isLoading = true;
  @State() isExpanded =
    localStorage.getItem(LOCAL_STORAGE_KEYS.IS_EXPANDED) !== null
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.IS_EXPANDED)!)
      : true;
  @State() path = 'login';
  @State() lastPath = 'login';

  async componentWillLoad() {
    migrateV1SelectedTasks();
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
    localStorage.setItem(LOCAL_STORAGE_KEYS.IS_EXPANDED, String(this.isExpanded));
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
        <tj-heading isExpanded={this.isExpanded} isJiraCloud={this.theme === 'jira-cloud'}></tj-heading>
        <Loader isLoading={this.isLoading}>
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
                      jiraDescription={this.jiraDescription}
                    ></tj-task-page>
                  ),
                },
                {
                  condition: this.path === 'settings',
                  renderComponent: () => <tj-settings isLoggedIn={this.isLoggedIn}></tj-settings>,
                },
              ]}
            />
            <tj-footer
              isLoggedIn={this.isLoggedIn}
              isJiraCloud={this.theme === 'jira-cloud'}
              scriptVersion={this.scriptVersion}
            ></tj-footer>
          </main>
        </Loader>
      </notifications-provider>
    );
  }
}
