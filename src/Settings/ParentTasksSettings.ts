import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AuthObject, getAllTasks } from '../tjAPI.js';

import '../Loader.js';

@customElement('jira-web-panel-settings-parent-tasks')
export class JiraWebPanelSettingsParentTasks extends LitElement {
  static styles = css`
    fieldset {
      max-height: 200px;
      overflow-y: auto;
      border-style: solid;
      margin-bottom: 10px;
    }
    button {
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
  private shouldShowLoadingIndicator = true;

  @state()
  private allTasks: Awaited<ReturnType<typeof getAllTasks>> | null = null;

  @state()
  private selectedTasks: string[] = [];

  async connectedCallback() {
    super.connectedCallback?.();
    this.allTasks = await getAllTasks(this.user);
    this.shouldShowLoadingIndicator = false;
    // get selected tasks from storage
    this.selectedTasks =
      localStorage.getItem('tj_selected_tasks')?.split(',') ??
      Object.keys(this.allTasks ?? {});
  }

  private close() {
    const event = new CustomEvent('close', { bubbles: false });
    this.dispatchEvent(event);
  }

  private onCheckboxChange(e: any) {
    if (e.target.checked) {
      this.selectedTasks = [...this.selectedTasks, e.target.id];
    } else {
      this.selectedTasks = this.selectedTasks.filter(id => id !== e.target.id);
    }
    localStorage.setItem('tj_selected_tasks', this.selectedTasks.join(','));
  }

  private unselectAll() {
    this.selectedTasks = [];
    localStorage.setItem('tj_selected_tasks', '');
  }

  render() {
    return html`
      ${this.shouldShowLoadingIndicator
        ? html`<jira-web-panel-loader></jira-web-panel-loader>`
        : html` <div>
            <fieldset>
              <legend>Choose the tasks you want to see in parent tasks:</legend>
              ${Object.entries(this.allTasks ?? {}).map(
                ([id, name]) => html`<div>
                  <input
                    type="checkbox"
                    id=${id}
                    name=${id}
                    ?checked=${this.selectedTasks.includes(id)}
                    @change=${this.onCheckboxChange}
                  />
                  <label for=${id}>${name}</label>
                </div>`
              )}
            </fieldset>
            <button @click=${this.close}>Back</button>
            <button @click=${this.unselectAll}>Unselect all</button>
          </div>`}
    `;
  }
}
