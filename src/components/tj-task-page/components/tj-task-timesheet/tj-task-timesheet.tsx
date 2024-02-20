import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

import { Task } from '@utils/tj';

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

@Component({
  tag: 'tj-task-timesheet',
  styleUrl: 'tj-task-timesheet.css',
  scoped: true,
})
export class TJNewTaskForm {
  @Event() notification: EventEmitter<Notification>;

  @Prop() task: Task;

  days: Day[] = [];

  componentWillLoad() {
    this.days = this.getWeekDays(new Date());
  }

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

  render() {
    return (
      <Host>
        {this.task.parentTask && (
          <span class="parent">{this.task.parentTask.name}</span>
        )}
        <p data-active={this.task.active}>{this.task.name}</p>
        <table>
          <thead>
            <tr>
              {this.days.map(day => (
                <th>
                  <div
                    class={[
                      day.date.getDate() === new Date().getDate() &&
                        'currentDay',
                      (this.task?.startDate ?? new Date()) > day.date &&
                        'disabled',
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
                  <input
                    type="text"
                    aria-label={`Hours recorded on ${longWeekdayFormatter.format(day.date)}`}
                    disabled={(this.task?.startDate ?? new Date()) > day.date}
                    value={this.task.recordedHours[day.iso]}
                    onFocus={(e: FocusEvent) => {
                      (e.target as HTMLInputElement).select();
                    }}
                    onKeyPress={(e: KeyboardEvent) => {
                      e.stopImmediatePropagation();
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        this.saveHours(
                          (e.target as HTMLInputElement).value,
                          day.iso,
                        );
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Host>
    );
  }
}
