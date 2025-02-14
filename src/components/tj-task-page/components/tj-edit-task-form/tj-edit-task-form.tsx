import { Component, Event, EventEmitter, Host, Listen, Prop, State, h } from '@stencil/core';

import { Loader } from '@fc';
import { Task, UpdateTaskPayload } from '@utils/tj';

import type { Notification } from '../../../notifications-provider/types';
import { TaskFormData } from '../tj-task-form/tj-task-form';

@Component({
  tag: 'tj-edit-task-form',
  styleUrl: 'tj-edit-task-form.css',
  scoped: true,
})
export class TjEditTaskForm {
  /**
   * Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`.
   */
  @Event() notification: EventEmitter<Notification>;
  /**
   * Emitted when the form is cancelled.
   */
  @Event() cancelEditTask: EventEmitter<void>;

  /**
   * The task for which to display the edit form.
   */
  @Prop() task!: Task;

  @State() isLoading = true;

  @Listen('loaded')
  loadedHandler() {
    this.isLoading = false;
  }

  @Listen('formSubmit')
  async updateTask(e: CustomEvent<TaskFormData>) {
    this.isLoading = true;
    try {
      await this.task.update(e.detail as UpdateTaskPayload);
      this.notification.emit({
        type: 'success',
        message: 'Task updated successfully.',
      });
      this.cancelEditTask.emit();
    } catch (error) {
      this.notification.emit({
        type: 'error',
        message: error.message,
      });
      console.error(error);
      this.isLoading = false;
    }
  }

  render() {
    return (
      <Host>
        <Loader isLoading={this.isLoading} />
        <fieldset style={{ display: this.isLoading ? 'none' : 'block' }}>
          <legend>Edit task</legend>
          <tj-task-form
            name={this.task.name}
            description={this.task.description}
            startDate={this.task.startDate.toISOString().split('T')[0]}
            showDescription={this.task.description.trim().length > 0}
            parentId={this.task.parentTask?.id}
            state={this.task.active ? 'active' : 'closed'}
            buttonLabel="Update"
          />
        </fieldset>
        <button class="backButton" onClick={() => this.cancelEditTask.emit()}>
          Back
        </button>
      </Host>
    );
  }
}
