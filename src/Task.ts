import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { AuthObject, findTaskForJiraId, recordHours } from './tjAPI.js';

import './TaskForm.js';

interface Day {
  date: Date;
  dayOfWeek: number;
  label: string;
  iso: string;
}

@customElement('jira-web-panel-task')
export class JiraWebPanelTask extends LitElement {
  static styles = css`
    p {
      font-weight: 600;
      margin: 0;
      font-size: 12px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    table,
    th,
    td {
      border: 1px solid rgba(106, 115, 123, 0.25);
    }

    th div {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: rgb(50, 60, 70);
      font-weight: 500;
    }

    input {
      width: 100%;
      border: none;
      background: transparent;
      text-align: center;
      cursor: pointer;
    }

    input[disabled] {
      cursor: not-allowed;
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
  private task: Awaited<ReturnType<typeof findTaskForJiraId>> | null = null;

  connectedCallback() {
    super.connectedCallback?.();
    (async () => {
      if (this.jiraId) {
        this.task = await findTaskForJiraId({
          jiraId: this.jiraId,
          ...this.user,
        });
        this.shouldShowLoadingIndicator = false;
      }
    })();
  }

  async saveHours(hours: string, day: string) {
    await recordHours({
      ...this.user,
      taskId: this.task?.id ?? '',
      day,
      hours,
    });
  }

  static getWeekDays(date: Date): Day[] {
    const formatter = new Intl.DateTimeFormat('en', { weekday: 'short' });
    const days: Day[] = [];
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    for (let i = 0; i < 7; i += 1) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      days.push({
        date: day,
        dayOfWeek: day.getDay(),
        label: formatter.format(day),
        iso: day.toISOString().split('T')[0],
      });
    }
    return days;
  }

  renderTable() {
    const date = new Date();
    const days = JiraWebPanelTask.getWeekDays(date);

    return html`
      <table>
        <thead>
          <tr>
            ${days.map(
              day => html`<th>
                <div>
                  <span>${day.label}</span>
                  <span>${day.date.getDate()}</span>
                </div>
              </th>`
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            ${days.map(
              day => html`<td>
                <input
                  type="text"
                  ?disabled=${(this.task?.startDate ?? new Date()) > day.date}
                  value=${ifDefined(this.task?.recordedHours[day.iso])}
                  @focus=${(e: FocusEvent) => {
                    (e.target as HTMLInputElement).select();
                  }}
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      this.saveHours(
                        (e.target as HTMLInputElement).value,
                        day.iso
                      );
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                />
              </td>`
            )}
          </tr>
        </tbody>
      </table>
    `;
  }

  renderUI() {
    if (this.shouldShowLoadingIndicator) {
      return html`<jira-web-panel-loader></jira-web-panel-loader>`;
    }
    if (!this.task) {
      return html`<jira-web-panel-task-form
        .user=${this.user}
        jiraId=${this.jiraId}
        jiraSummary=${this.jiraSummary}
        @taskCreated=${(e: CustomEvent) => {
          this.task = e.detail;
        }}
      ></jira-web-panel-task-form>`;
    }
    return html`<p>${this.task?.name}</p>
      ${this.renderTable()}`;
  }

  render() {
    return html`<div>${this.renderUI()}</div>`;
  }
}
