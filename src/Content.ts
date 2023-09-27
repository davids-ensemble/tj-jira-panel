import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getServerConfig } from './tjAPI.js';

@customElement('jira-web-panel-content')
export class JiraWebPanelContent extends LitElement {
  static styles = css`
    div {
      font-size: 14px;
      margin-top: 5px;
      padding-left: 20px;
      box-sizing: border-box;
      min-height: 100px;
    }
    p {
      margin: 0;
    }
    .gray {
      color: rgb(107, 119, 140);
    }
  `;

  @state()
  private shouldShowLoadingIndicator = true;

  @state()
  private serverVersion: string | undefined;

  constructor() {
    super();
    getServerConfig().then(data => {
      this.serverVersion = data.version;
      this.shouldShowLoadingIndicator = false;
    });
  }

  render() {
    return html`
      <div id="tj-web-panel_content">
        ${this.shouldShowLoadingIndicator
          ? 'Loading...'
          : html`<p class="gray">v${this.serverVersion}</p>`}
      </div>
    `;
  }
}
