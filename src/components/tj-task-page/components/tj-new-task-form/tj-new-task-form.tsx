import { Component, Event, EventEmitter, Listen, Prop, State, h } from '@stencil/core';

import { Loader } from '@fc';
import { Task, User, getWeekDays } from '@utils/tj';

import type { Notification } from '../../../notifications-provider/types';
import { TaskFormData } from '../tj-task-form/tj-task-form';

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

  @Listen('formSubmit')
  async createTask(e: CustomEvent<TaskFormData>) {
    this.isLoading = true;
    const { name, parentId, date, description } = e.detail;
    try {
      const parent = await User.getTaskById(parentId);
      const task = await parent.createSubTask(name, date, description);
      this.taskCreated.emit(task);
    } catch (error) {
      this.notification.emit({
        type: 'error',
        message: error.message,
      });
      this.isLoading = false;
    }
  }

  render() {
    return (
      <Loader isLoading={this.isLoading}>
        <p class="title">
          <strong>No task found for {this.jiraID}</strong>
        </p>
        <fieldset>
          <legend>Create a new task</legend>
          <tj-task-form
            jiraID={this.jiraID}
            jiraSummary={this.jiraSummary}
            jiraDescription={this.jiraDescription}
            parentTasks={this.parentTasks}
            startDate={monday.iso}
          />
        </fieldset>
      </Loader>
    );
  }
}
