import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('jira-web-panel-heading')
export class JiraWebPanelHeading extends LitElement {
  static styles = css`
    div {
      font-size: 14px;
      display: flex;
      height: 20px;
      align-items: center;
      gap: 6px;
    }

    button {
      --btn-bg: rgba(9, 30, 66, 0.08);
      --btn-text: #344563;
      width: 14px;
      height: 14px;
      padding: 0;
      border: 0;
      border-radius: 3px;
      box-sizing: border-box;
      transition: background-color 0.1s ease-out;
      background-color: var(--btn-bg);
      color: var(--btn-text);
      cursor: pointer;
    }

    button:hover {
      --btn-bg: rgba(9, 30, 66, 0.13);
    }

    h4 {
      margin: 0;
      font-weight: 600;
      line-height: 20px;
      color: rgb(106, 115, 123);
    }
  `;

  @property()
  headingLabel = '';

  render() {
    return html`
      <div id="tj-web-panel_heading">
        <button
          aria-label="${this.headingLabel}"
          aria-controls="tj-web-panel"
          aria-expanded="true"
          resolved=""
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
            <g fill="none" fill-rule="evenodd">
              <path
                d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z"
                fill="#344563"
              ></path>
            </g>
          </svg>
        </button>
        <h4 class="toggle-title" id="tj-web-panel-label">
          ${this.headingLabel}
        </h4>
        <ul class="ops"></ul>
      </div>
    `;
  }
}
