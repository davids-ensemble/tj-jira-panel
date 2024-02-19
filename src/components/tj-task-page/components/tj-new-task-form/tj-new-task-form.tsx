import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';

import { User } from '@utils/tj/User';
import type { Notification } from '../../../notifications-provider/types';
import { Task } from '@utils/tj/Task';

@Component({
  tag: 'tj-new-task-form',
  styleUrl: 'tj-new-task-form.css',
  shadow: true,
})
export class TJNewTaskForm {
  @Event() notification: EventEmitter<Notification>;
  @Event() taskCreated: EventEmitter<Task>;

  @Prop({ attribute: 'jira-id' }) jiraID: string;
  @Prop() jiraSummary: string;

  @State() isLoading = true;
  @State() parentTasks: Record<string, string> | null = null;

  async componentWillLoad() {
    try {
      const allTasks = await User.getAllTasks();
      if (User.selectedTasks.length > 0) {
        this.parentTasks = Object.fromEntries(
          Object.entries(allTasks).filter(([id]) =>
            User.selectedTasks.includes(id),
          ),
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
    const name = (form.querySelector('#name') as HTMLInputElement).value;
    const parentID = (form.querySelector('#parent') as HTMLInputElement).value;
    try {
      const parent = await User.getTaskById(parentID);
      const task = await parent.createSubTask(name);
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
      <with-loading isLoading={this.isLoading}>
        <p>
          <strong>No task found for {this.jiraID}</strong>
        </p>
        <p>Create a new task</p>
        <form action="" onSubmit={this.onFormSubmit}>
          <div>
            <label htmlFor="name">name</label>
            <input
              type="text"
              placeholder="name"
              id="name"
              name="name"
              onKeyPress={(e: KeyboardEvent) => {
                e.stopImmediatePropagation();
              }}
              value={`[${this.jiraID}] ${this.jiraSummary}`}
            />
          </div>
          <div>
            <label htmlFor="parent">parent task</label>
            <select name="parent" id="parent">
              $
              {Object.entries(this.parentTasks ?? {}).map(([id, name]) => (
                <option value={id}>{name}</option>
              ))}
            </select>
          </div>
          <input type="submit" value="Create" />
        </form>
      </with-loading>
    );
  }
}
