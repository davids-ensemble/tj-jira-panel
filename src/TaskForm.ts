import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AuthObject, createSubTask, getAllTasks } from './tjAPI.js';

import './Loader.js';

@customElement('jira-web-panel-task-form')
export class JiraWebPanelTaskForm extends LitElement {
  static styles = css`
    p {
      margin: 0;
      margin-bottom: 5px;
    }
    form {
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    form > div {
      display: flex;
      flex-direction: column;
    }
    input[type='submit'] {
      background-color: #005273;
      border: 0;
      color: white;
      text-transform: uppercase;
      border-radius: 2px;
      max-width: 100px;
      padding: 5px 10px;
      cursor: pointer;
    }
  `;

  @property()
  private jiraId!: string;

  @property()
  private jiraSummary!: string;

  @property({ type: Object })
  private user!: AuthObject;

  @state()
  private shouldShowLoadingIndicator = true;

  @state()
  private allTasks: Awaited<ReturnType<typeof getAllTasks>> | null = null;

  async connectedCallback() {
    super.connectedCallback?.();
    this.allTasks = await getAllTasks(this.user);
    this.shouldShowLoadingIndicator = false;
  }

  private async __onFormSubmit(e: Event) {
    this.shouldShowLoadingIndicator = true;
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = form.querySelector('#name') as HTMLInputElement;
    const parent = form.querySelector('#parent') as HTMLInputElement;
    const data = await createSubTask({
      ...this.user,
      name: name.value,
      parentTaskId: parent.value,
    });
    const event = new CustomEvent('taskCreated', {
      detail: data,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      ${this.shouldShowLoadingIndicator
        ? html`<jira-web-panel-loader></jira-web-panel-loader>`
        : html`<p><strong>No task found for ${this.jiraId}</strong></p>
            <p>Create a new task</p>
            <form action="" @submit=${this.__onFormSubmit}>
              <div>
                <label for="name">name</label>
                <input
                  type="text"
                  placeholder="name"
                  id="name"
                  name="name"
                  value=${`[${this.jiraId}] ${this.jiraSummary}`}
                />
              </div>
              <div>
                <label for="parent">parent task</label>
                <select name="parent" id="parent">
                  ${Object.entries(this.allTasks ?? {}).map(
                    ([id, name]) => html`<option value=${id}>${name}</option>`
                  )}
                </select>
              </div>
              <input type="submit" value="Create" />
            </form>`}
    `;
  }
}
