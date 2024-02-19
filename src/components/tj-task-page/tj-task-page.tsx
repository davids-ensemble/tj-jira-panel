import {
  Component,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  State,
  h,
} from '@stencil/core';
import { Notification } from '../notifications-provider/types';
import { Task } from '@utils/tj/Task';
import { User } from '@utils/tj/User';
import { Switch } from '../Switch/Switch';

@Component({
  tag: 'tj-task-page',
  shadow: true,
})
export class TJTaskPage {
  @Event() notification: EventEmitter<Notification>;

  @Prop({ attribute: 'jira-id' }) jiraID: string;
  @Prop() jiraSummary: string;

  @State() isLoading = true;
  @State() task: Task | null;

  async componentWillLoad() {
    this.isLoading = false;
    try {
      if (!this.jiraID) {
        throw new Error('Jira ID is missing. Check your configuration.');
      }
      this.task = await User.findTaskForJiraID(this.jiraID);
    } catch (error) {
      this.notification.emit({
        type: 'error',
        message: error.message,
      });
    }
  }

  @Listen('taskCreated')
  taskCreatedHandler(event: CustomEvent<Task>) {
    this.task = event.detail;
  }

  render() {
    return (
      <Host>
        <with-loading isLoading={this.isLoading}>
          <Switch
            shouldBreak
            cases={[
              {
                condition: this.task !== null,
                renderComponent: () => <tj-task-timesheet task={this.task} />,
              },
              {
                condition: this.task === null,
                renderComponent: () => (
                  <tj-new-task-form
                    jiraID={this.jiraID}
                    jiraSummary={this.jiraSummary}
                  />
                ),
              },
            ]}
          />
        </with-loading>
      </Host>
    );
  }
}
