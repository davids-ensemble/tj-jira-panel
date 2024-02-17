import {
  Component,
  Event,
  EventEmitter,
  Host,
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

  @Prop() jiraID: string;
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

  render() {
    return (
      <Host>
        <with-loading isLoading={this.isLoading}>
          <Switch
            shouldBreak
            cases={[
              {
                condition: this.task !== null,
                renderComponent: () => <div>Task found.</div>,
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