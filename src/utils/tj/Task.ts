import { Server } from './Server';
import { User } from './User';
import { checkForError, escapeNonAlphanumericCharacters } from './utils';

export class Task {
  id: string;
  name: string;
  active: boolean;
  startDate: Date;
  recordedHours: Record<string, string>;
  parentTask?: Task;

  constructor(task: Element, timesheet?: Document) {
    this.id = task.attributes.getNamedItem('id')?.value;
    this.name = task.querySelector('name')?.textContent;
    this.active = task.querySelector('active')?.textContent === 'true';
    this.startDate = new Date(
      task.querySelector('startDate')?.textContent ?? '',
    );
    this.recordedHours = Array.from(
      task.querySelectorAll('recordedHours > workDay'),
    ).reduce((acc: Record<string, string>, item) => {
      const date = item.attributes.getNamedItem('day')?.value;
      const hours = item.attributes.getNamedItem('hours')?.value;
      if (date && hours) {
        acc[date] = hours;
      }
      return acc;
    }, {});
    if (timesheet) {
      const parentTaskID = task.querySelector('parentTaskId')?.textContent;
      if (parentTaskID) {
        const xpath = `//task[@id="${parentTaskID}"]`;
        const task = timesheet.evaluate(xpath, timesheet).iterateNext();
        if (task) {
          this.parentTask = new Task(task as Element);
        }
      }
    }
  }

  async createSubTask(name: string, date: string) {
    const body = `
<addSubTask id="0" version="0">
  <id>0</id>
  <version>0</version>
  <active>true</active>
  <name>${escapeNonAlphanumericCharacters(name)}</name>
  <descriptionHtmlText>&lt;p&gt; &lt;/p&gt;</descriptionHtmlText>
  <startDate>${date}</startDate>
  <parentTaskId>${this.id}</parentTaskId>
  <kind>WORK</kind>
  <workKind>DEVELOPMENT</workKind>
  <billable>true</billable>
  <assignedUser id="${User.userId}" userName="${User.username}"/>
</addSubTask>
  `;
    const response = await fetch(Server.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'Tj_session': User.sessionUuid,
        'Tj_user': User.username,
      },
      body,
    });
    const data = await response.text();
    const dom = new DOMParser().parseFromString(data, 'text/xml');
    checkForError(dom);
    const active = dom.querySelector('active')?.textContent === 'true';
    if (active) {
      const task = new Task(dom.querySelector('result'));
      task.parentTask = this;
      return task;
    }
    return null;
  }

  async recordHours(hours: string, day: string) {
    const body = `<recordHoursForDay id="0" version="0" taskId="${this.id}" day="${day}" hours="${hours}"/>`;
    return User.fetch(body);
  }
}
