import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AuthObject } from '../tjAPI.js';

import './ParentTasksSettings.js';

@customElement('jira-web-panel-settings')
export class JiraWebPanelSettings extends LitElement {
  static styles = css`
    p {
      margin: 0;
      margin-bottom: 5px;
    }
    .menu {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: fit-content;
    }
    .menu button {
      border: none;
      background: none;
      cursor: pointer;
      font-size: 14px;
      text-align: left;
      padding: 0;
      margin: 0;
      color: #2886bb;
    }
  `;

  @property({ type: Object })
  private user!: AuthObject;

  @state()
  private selectedItem: string | undefined;

  private closeSettings() {
    const event = new CustomEvent('settings--close');
    this.dispatchEvent(event);
  }

  private handleMenuClick(e: any) {
    this.selectedItem = e?.target?.id;
  }

  private renderMenu() {
    return html`<div class="menu">
      <button id="parent-tasks" @click=${this.handleMenuClick}>
        Parent tasks
      </button>
      <button @click=${this.closeSettings}>Close</button>
    </div>`;
  }

  private renderSelectedItem() {
    switch (this.selectedItem) {
      case 'parent-tasks':
        return html`<jira-web-panel-settings-parent-tasks
          .user=${this.user}
          @close=${this.handleMenuClick}
        ></jira-web-panel-settings-parent-tasks>`;
      default:
        return null;
    }
  }

  render() {
    return html`
      <div>
        <p><strong>Settings</strong></p>
        ${this.selectedItem ? this.renderSelectedItem() : this.renderMenu()}
      </div>
    `;
  }
}
