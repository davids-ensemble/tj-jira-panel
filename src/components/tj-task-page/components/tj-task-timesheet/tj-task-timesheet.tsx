import { Component, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';

import { Loader } from '@fc';
import { Task, User } from '@utils/tj';

import type { Notification } from '../../../notifications-provider/types';

interface Day {
  date: Date;
  dayOfWeek: number;
  label: string;
  iso: string;
}

const longWeekdayFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  day: 'numeric',
});

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
  @State() days: Day[] = this.getWeekDays(new Date());
  @State() loadingHours = this.task.recordedHours ? false : true;

  /**
   * Returns an array of Day objects representing the week days of the current week.
   * @param date - The date you want to get the week days for.
   * @returns An array of Day objects representing the week days.
   */
  getWeekDays(date: Date): Day[] {
    const formatter = new Intl.DateTimeFormat('en', { weekday: 'short' });
    const days: Day[] = [];
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    // Calculate the date of the Monday of the current week.
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    for (let i = 0; i < 7; i += 1) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      days.push({
        date: day,
        dayOfWeek: day.getDay(),
        label: formatter.format(day),
        iso: day.toISOString().split('T')[0],
      });
    }
    return days;
  }

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
    this.days = this.getWeekDays(newDate);
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
                      day.date.getDate() < new Date().getDate() && 'previousDay',
                      day.date.getDate() === new Date().getDate() && 'currentDay',
                      (this.task?.startDate ?? new Date()) > day.date && 'disabled',
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
                      disabled={(this.task?.startDate ?? new Date()) > day.date}
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
          {this.days[6].date < new Date() && (
            <button data-type="next" class="week-navigation__button" onClick={this.onWeekChange}>
              Next week &gt;
            </button>
          )}
        </div>
      </Host>
    );
  }
}
