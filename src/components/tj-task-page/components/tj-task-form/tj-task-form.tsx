import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';

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
}

@Component({
  tag: 'tj-task-form',
  styleUrl: 'tj-task-form.css',
  scoped: true,
})
export class TjTaskForm {
  @Prop({ attribute: 'jira-id' }) jiraID!: string;
  @Prop() jiraSummary!: string;
  @Prop() jiraDescription: string | undefined;
  @Prop() parentTasks!: Record<string, string>;
  @Prop() startDate!: string;

  @State() shouldShowDescription = false;

  @Event() formSubmit: EventEmitter<TaskFormData>;

  onFormSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const parentId = formData.get('parent') as string;
    const date = formData.get('date') as string;
    const description = (formData.get('description') as string) || '<p> </p>';
    const cleanedDescription = cleanDescription(description);
    this.formSubmit.emit({ name, parentId, date, description: cleanedDescription });
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
            value={`[${this.jiraID}] ${this.jiraSummary}`}
          />
        </label>
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
              <option value={id}>{name}</option>
            ))}
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
            <textarea rows={5} name="description" value={cleanDescription(this.jiraDescription)}></textarea>
          </label>
        )}
        <button type="submit">Create</button>
      </form>
    );
  }
}
