import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';

import { Loader } from '@fc';
import { Task, User } from '@utils/tj';

import type { Notification } from '../../../notifications-provider/types';

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

  @State() isLoading = true;
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
    try {
      const parent = await User.getTaskById(parentId);
      const task = await parent.createSubTask(name, date);
      this.taskCreated.emit(task);
    } catch (error) {
      this.notification.emit({
        type: 'error',
        message: error.message,
      });
    }
  };

  render() {
    return (
      <Loader isLoading={this.isLoading}>
        <p>
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
              Parent task
              <select name="parent">
                {Object.entries(this.parentTasks ?? {}).map(([id, name]) => (
                  <option value={id}>{name}</option>
                ))}
              </select>
            </label>
            <label>
              Start date
              <input type="date" name="date" value={new Date().toISOString().split('T')[0]} />
            </label>
            <button type="submit">Create</button>
          </form>
        </fieldset>
      </Loader>
    );
  }
}
