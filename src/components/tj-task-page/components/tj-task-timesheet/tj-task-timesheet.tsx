import { Component, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';

import { Loader } from '@fc';
import { Day, Task, User, getWeekDays } from '@utils/tj';

import type { Notification } from '../../../notifications-provider/types';

const longWeekdayFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  day: 'numeric',
});

const now = new Date();

/**
 * A component that displays the timesheet for a given task allowing the user to record hours.
 */
@Component({
  tag: 'tj-task-timesheet',
  styleUrl: 'tj-task-timesheet.css',
  scoped: true,
})
export class TJNewTaskForm {
  /**
   * Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`.
   */
  @Event() notification: EventEmitter<Notification>;

  /**
   * The task for which to display the timesheet.
   */
  @Prop() task!: Task;

  @State() recordedHours = this.task.recordedHours;
  @State() days: Day[] = getWeekDays();
  @State() loadingHours = this.task.recordedHours ? false : true;

  async saveHours(hours: string, day: string) {
    try {
      const isHoursNumber = !isNaN(Number(hours));
      if (!isHoursNumber) {
        throw new Error('You must enter a valid number of hours.');
      }
      await this.task.recordHours(hours, day);
      this.notification.emit({
        type: 'success',
        message: 'Hours saved successfully.',
      });
    } catch (error) {
      this.notification.emit({
        type: 'error',
        message: error.message,
      });
    }
  }

  onWeekChange = (e: Event) => {
    const target = e.target as HTMLButtonElement;
    const type = target.dataset.type;
    const newDate = new Date(this.days[0].date.getTime());
    const offset = type === 'next' ? 7 : -7;
    newDate.setDate(newDate.getDate() + offset);
    this.days = getWeekDays(newDate);
  };

  @Watch('days')
  async getTimeSheet(newDays: Day[]) {
    const day = newDays[0].date;
    this.loadingHours = true;
    const task = await User.getTaskById(this.task.id, day);
    this.recordedHours = task.recordedHours;
    this.loadingHours = false;
  }

  render() {
    return (
      <Host>
        {this.task.parentTask && <span class="parent">{this.task.parentTask.name}</span>}
        <p data-active={this.task.active}>{this.task.name}</p>
        <table>
          <thead>
            <tr>
              {this.days.map(day => (
                <th>
                  <div
                    class={[
                      day.date.getDate() < now.getDate() && 'previousDay',
                      day.date.getDate() === now.getDate() && 'currentDay',
                      (this.task?.startDate ?? now) > day.date && 'disabled',
                    ].join(' ')}
                  >
                    <span>{day.label}</span>
                    <span>{day.date.getDate()}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {this.days.map(day => (
                <td>
                  <Loader isLoading={this.loadingHours} type="elastic" style={{ height: '18px' }}>
                    <input
                      type="text"
                      key={`${day.iso}-week-${Math.ceil(day.date.getDate() / 7)}`}
                      aria-label={`Hours recorded on ${longWeekdayFormatter.format(day.date)}`}
                      disabled={(this.task?.startDate ?? now) > day.date}
                      value={this.recordedHours[day.iso]}
                      onFocus={(e: FocusEvent) => {
                        (e.target as HTMLInputElement).select();
                      }}
                      onKeyPress={(e: KeyboardEvent) => {
                        e.stopImmediatePropagation();
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          this.saveHours((e.target as HTMLInputElement).value, day.iso);
                          (e.target as HTMLInputElement).blur();
                        }
                      }}
                    />
                  </Loader>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div class="week-navigation__container">
          {this.days[0].date > this.task.startDate && (
            <button data-type="previous" class="week-navigation__button" onClick={this.onWeekChange}>
              &lt; Previous week
            </button>
          )}
          <span class="week-navigation__spacer"></span>
          {this.days[6].date < now && (
            <button data-type="next" class="week-navigation__button" onClick={this.onWeekChange}>
              Next week &gt;
            </button>
          )}
        </div>
      </Host>
    );
  }
}
