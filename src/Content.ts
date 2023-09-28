import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { getServerConfig } from './tjAPI.js';

import './LoginForm.js';
import './Task.js';
import './Loader.js';

@customElement('jira-web-panel-content')
export class JiraWebPanelContent extends LitElement {
  static styles = css`
    section {
      font-size: 14px;
      margin-top: 5px;
      padding-left: 20px;
      box-sizing: border-box;
      min-height: 100px;
    }
    footer {
      margin-top: 10px;
      color: rgb(107, 119, 140);
      font-size: 8px;
      text-align: right;
    }
  `;

  @property()
  private jiraId?: string;

  @state()
  private shouldShowLoadingIndicator = true;

  @state()
  private serverVersion: string | undefined;

  @state()
  private user = JSON.parse(localStorage.getItem('tj_user') ?? '{}');

  constructor() {
    super();
    (async () => {
      const data = await getServerConfig();
      this.serverVersion = data.version;
      this.shouldShowLoadingIndicator = false;
    })();
  }

  loginHandler(e: CustomEvent) {
    this.user = e.detail;
    localStorage.setItem('tj_user', JSON.stringify(this.user));
  }

  renderUI() {
    if (this.shouldShowLoadingIndicator) {
      return html`<jira-web-panel-loader></jira-web-panel-loader>`;
    }
    if (!this.user.sessionUuid) {
      return html`<jira-web-panel-login
        @login=${this.loginHandler}
      ></jira-web-panel-login>`;
    }
    return html`<jira-web-panel-task
      jiraId=${this.jiraId}
      .user=${this.user}
    ></jira-web-panel-task>`;
  }

  render() {
    return html`
      <section id="tj-web-panel_content">
        ${this.renderUI()}
        <footer>
          ${this.user.username
            ? html`Logged in as ${this.user.username} (${this.user.userId}) @ `
            : null}
          ${this.serverVersion ? html`v${this.serverVersion}` : null}
        </footer>
      </section>
    `;
  }
}
