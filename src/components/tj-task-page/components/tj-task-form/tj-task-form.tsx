import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';

import { User } from '@utils/tj';

import type { Notification } from '../../../notifications-provider/types';

const cleanDescription = (value: string) =>
  value
    ?.replace(/^(\s*\\n+\s*)+/, '')
    .replace(/(\s*\\n+\s*)+$/, '')
    .trim();

export interface TaskFormData {
  name: string;
  parentId: string;
  date: string;
  description: string;
  workKind: string;
  active?: boolean;
}

@Component({
  tag: 'tj-task-form',
  styleUrl: 'tj-task-form.css',
  scoped: true,
})
export class TjTaskForm {
  /**
   * Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`.
   */
  @Event() notification: EventEmitter<Notification>;
  /**
   * Emitted when the form is submitted.
   */
  @Event() formSubmit: EventEmitter<TaskFormData>;
  /**
   * Emitted when the form is loaded.
   */
  @Event() loaded: EventEmitter<void>;

  @Prop() name!: string;
  @Prop() parentId: string | undefined;
  @Prop() startDate!: string;
  @Prop() description: string | undefined;
  @Prop() workKind: string = User.defaultWorkKind;
  @Prop() state: 'active' | 'closed' | undefined;
  @Prop() showDescription: boolean = false;
  @Prop() buttonLabel: string = 'Create';

  @State() shouldShowDescription = this.showDescription;
  @State() parentTasks: Record<string, string> | null = null;

  async componentWillLoad() {
    try {
      const allTasks = await User.getAllTasks();
      if (User.selectedTasks.length > 0) {
        this.parentTasks = Object.fromEntries(
          Object.entries(allTasks).filter(([id]) => User.selectedTasks.includes(id)),
        );
      } else {
        this.parentTasks = allTasks;
      }
      this.loaded.emit();
    } catch (error) {
      this.notification.emit({
        type: 'error',
        message: error.message,
      });
    }
  }

  onFormSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const parentId = formData.get('parent') as string;
    const date = formData.get('date') as string;
    const description = (formData.get('description') as string) || '<p> </p>';
    const workKind = (formData.get('workKind') as string) || User.defaultWorkKind;
    const cleanedDescription = cleanDescription(description);
    const state = (formData.get('status') as 'active' | 'closed') || 'active';
    const active = state === 'active';
    this.formSubmit.emit({ name, parentId, date, description: cleanedDescription, workKind, active });
  };

  onDescriptionCheckboxChange = (e: Event) => {
    this.shouldShowDescription = (e.target as HTMLInputElement).checked;
  };

  render() {
    return (
      <form action="" onSubmit={this.onFormSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            onKeyPress={(e: KeyboardEvent) => {
              e.stopImmediatePropagation();
            }}
            value={this.name}
          />
        </label>
        {this.state && (
          <label>
            Status
            <select name="status">
              <option value="active" selected={this.state === 'active'}>
                Active
              </option>
              <option value="closed" selected={this.state === 'closed'}>
                Closed
              </option>
            </select>
          </label>
        )}
        <label>
          <span class="row">
            Parent task
            <contextual-help variant="info">
              <h6 slot="heading">Choose your tasks</h6>
              <p slot="content">
                You can select the tasks you want to see in this dropdown from Settings &gt; Parent tasks
              </p>
            </contextual-help>
          </span>
          <select name="parent">
            {Object.entries(this.parentTasks ?? {}).map(([id, name]) => (
              <option value={id} selected={id === this.parentId}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span class="row">
            Work kind
            <contextual-help variant="info">
              <h6 slot="heading">Default work kind</h6>
              <p slot="content">You can set your default work kind from Settings &gt; Work kind</p>
            </contextual-help>
          </span>
          <select name="workKind">
            <option value="DEVELOPMENT" selected={this.workKind === 'DEVELOPMENT'}>
              Development
            </option>
            <option value="QA" selected={this.workKind === 'QA'}>
              QA
            </option>
          </select>
        </label>
        <label>
          Start date
          <input type="date" name="date" value={this.startDate} />
        </label>
        <label class="row">
          <input type="checkbox" checked={this.shouldShowDescription} onChange={this.onDescriptionCheckboxChange} />
          Include task description
        </label>
        {this.shouldShowDescription && (
          <label>
            Description
            <textarea rows={5} name="description" value={cleanDescription(this.description)}></textarea>
          </label>
        )}
        <button type="submit">{this.buttonLabel}</button>
      </form>
    );
  }
}
