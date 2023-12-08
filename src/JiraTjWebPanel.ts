import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

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

    jira-web-panel-content[data-hidden='true'] {
      display: none;
    }
  `;

  @state()
  private expanded = true;

  @property()
  private jiraId?: string;

  @property()
  private jiraSummary?: string;

  render() {
    return html`
      <div id="tj-web-panel">
        <jira-web-panel-heading
          .isExpanded=${this.expanded}
          @toggle=${() => {
            this.expanded = !this.expanded;
          }}
          headingLabel="TJ Integration"
        ></jira-web-panel-heading>
        <jira-web-panel-content
          data-hidden=${!this.expanded}
          jiraId=${this.jiraId}
          jiraSummary=${this.jiraSummary}
        ></jira-web-panel-content>
      </div>
    `;
  }
}
