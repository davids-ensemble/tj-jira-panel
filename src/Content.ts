import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { AuthObject, getServerConfig, isSessionValid } from './tjAPI.js';

import './LoginForm.js';
import './TasksTable.js';
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

  @property()
  private jiraSummary?: string;

  @state()
  private shouldShowLoadingIndicator = true;

  @state()
  private serverVersion: string | undefined;

  @state()
  private user: AuthObject | null = JSON.parse(
    localStorage.getItem('tj_user') ?? '{}'
  );

  constructor() {
    super();
    (async () => {
      const data = await getServerConfig();
      this.serverVersion = data.version;
    })();
  }

  async connectedCallback() {
    super.connectedCallback?.();
    if (this.user?.sessionUuid && !(await isSessionValid(this.user))) {
      this.user = null;
    }
    this.shouldShowLoadingIndicator = false;
  }

  loginHandler(e: CustomEvent) {
    this.user = e.detail;
    localStorage.setItem('tj_user', JSON.stringify(this.user));
  }

  renderUI() {
    let content;
    if (this.shouldShowLoadingIndicator) {
      content = html`<jira-web-panel-loader></jira-web-panel-loader>`;
    } else if (this.user?.sessionUuid) {
      content = html`<jira-web-panel-tasks-table
        jiraId=${ifDefined(this.jiraId)}
        jiraSummary=${ifDefined(this.jiraSummary)}
        .user=${this.user}
      ></jira-web-panel-tasks-table>`;
    } else {
      content = html`<jira-web-panel-login
        @login=${this.loginHandler}
      ></jira-web-panel-login>`;
    }
    return content;
  }

  render() {
    return html`
      <section id="tj-web-panel_content">
        ${this.renderUI()}
        <footer>
          ${this.user?.sessionUuid
            ? html`Logged in as ${this.user.username} (${this.user.userId}) @ `
            : null}
          ${this.serverVersion ? html`v${this.serverVersion}` : null}
        </footer>
      </section>
    `;
  }
}
