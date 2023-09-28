import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import './Heading.js';
import './Content.js';

export class JiraTjWebPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      margin-top: 30px;
    }
  `;

  @property()
  private jiraId?: string;

  @property()
  private jiraSummary?: string;

  render() {
    return html`
      <div id="tj-web-panel">
        <jira-web-panel-heading
          headingLabel="TJ Integration"
        ></jira-web-panel-heading>
        <jira-web-panel-content
          jiraId=${this.jiraId}
          jiraSummary=${this.jiraSummary}
        ></jira-web-panel-content>
      </div>
    `;
  }
}
