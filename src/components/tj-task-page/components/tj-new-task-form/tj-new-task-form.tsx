import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';

import { Loader } from '@fc';
import { Task, User, getWeekDays } from '@utils/tj';

import type { Notification } from '../../../notifications-provider/types';

const cleanDescription = (value: string) =>
  value
    ?.replace(/^(\s*\\n+\s*)+/, '')
    .replace(/(\s*\\n+\s*)+$/, '')
    .trim();

const monday = getWeekDays()[0];

/**
 * A form that allows the user to create a new task for the given Jira issue.
 */
@Component({
  tag: 'tj-new-task-form',
  styleUrl: 'tj-new-task-form.css',
  scoped: true,
})
export class TJNewTaskForm {
  /**
   * Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`.
   */
  @Event() notification: EventEmitter<Notification>;
  /**
   * Emitted when a new task was created.
   */
  @Event() taskCreated: EventEmitter<Task>;

  /**
   * The Jira ID of the task.
   */
  @Prop({ attribute: 'jira-id' }) jiraID!: string;
  /**
   * The summary of the task.
   */
  @Prop() jiraSummary!: string;
  /**
   * The Jira description of the task.
   */
  @Prop() jiraDescription: string | undefined;

  @State() isLoading = true;
  @State() parentTasks: Record<string, string> | null = null;
  @State() shouldShowDescription = false;

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
      this.isLoading = false;
    } catch (error) {
      this.notification.emit({
        type: 'error',
        message: error.message,
      });
    }
  }

  onFormSubmit = async (e: Event) => {
    this.isLoading = true;
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const parentId = formData.get('parent') as string;
    const date = formData.get('date') as string;
    const description = (formData.get('description') as string) || '<p> </p>';
    const cleanedDescription = cleanDescription(description);

    try {
      const parent = await User.getTaskById(parentId);
      const task = await parent.createSubTask(name, date, cleanedDescription);
      this.taskCreated.emit(task);
    } catch (error) {
      this.notification.emit({
        type: 'error',
        message: error.message,
      });
      this.isLoading = false;
    }
  };

  onDescriptionCheckboxChange = (e: Event) => {
    this.shouldShowDescription = (e.target as HTMLInputElement).checked;
  };

  render() {
    return (
      <Loader isLoading={this.isLoading}>
        <p class="title">
          <strong>No task found for {this.jiraID}</strong>
        </p>
        <fieldset>
          <legend>Create a new task</legend>
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
              <input type="date" name="date" value={monday.iso} />
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
        </fieldset>
      </Loader>
    );
  }
}
