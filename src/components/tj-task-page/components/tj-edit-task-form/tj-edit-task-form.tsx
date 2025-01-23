import { Component, Host, Listen, Prop, State, h } from '@stencil/core';

import { Loader } from '@fc';
import { Task } from '@utils/tj';

@Component({
  tag: 'tj-edit-task-form',
  styleUrl: 'tj-edit-task-form.css',
  scoped: true,
})
export class TjEditTaskForm {
  /**
   * The task for which to display the edit form.
   */
  @Prop() task!: Task;

  @State() isLoading = true;

  @Listen('loaded')
  loadedHandler() {
    this.isLoading = false;
    console.log(this.task);
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
          />
        </fieldset>
      </Host>
    );
  }
}
