import { Server } from './Server';
import { Task } from './Task';
import { checkForError, escapeNonAlphanumericCharacters } from './utils';

export interface LoginParams {
  username: string;
  password: string;
}

interface AuthObject {
  userId: string;
  sessionUuid: string;
  username: string;
}

export class User {
  private static authObject: AuthObject = JSON.parse(localStorage.getItem('tj_user') ?? '{}');

  public static get username(): string {
    return User.authObject.username;
  }
  public static get userId(): string {
    return User.authObject.userId;
  }
  public static get sessionUuid(): string {
    return User.authObject.sessionUuid;
  }

  public static get selectedTasks() {
    return JSON.parse(localStorage.getItem('tj_selected_tasks_tjiv2') ?? '[]');
  }

  public static set selectedTasks(value: string[]) {
    localStorage.setItem('tj_selected_tasks_tjiv2', JSON.stringify(value));
  }

  public static async login({ username, password }: LoginParams) {
    const escapedPassword = escapeNonAlphanumericCharacters(password);
    const body = `<login><userName>${username}</userName><password>${escapedPassword}</password></login>`;
    const response = await fetch(Server.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
      },
      body,
    });
    const data = await response.text();
    const dom = new DOMParser().parseFromString(data, 'text/xml');
    checkForError(dom);
    const result = {
      userId: dom.querySelector('user')?.attributes.getNamedItem('id')?.value,
      sessionUuid: dom.querySelector('sessionUuid')?.textContent,
      username,
    };
    User.authObject = result;
    localStorage.setItem('tj_user', JSON.stringify(result));
    return result;
  }

  public static async isSessionValid() {
    const { sessionUuid, username } = this.authObject;
    const body = `<getCurrentLogin/>`;
    const response = await fetch(Server.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'Tj_session': sessionUuid,
        'Tj_user': username,
      },
      body,
    });
    const data = await response.text();
    const dom = new DOMParser().parseFromString(data, 'text/xml');
    return dom.querySelector('sessionUuid')?.textContent === sessionUuid;
  }

  public static async getTimesheet(date = new Date()) {
    const dateString = date.toISOString().split('T')[0];
    const body = `<getTimesheet><forUser>${this.userId}</forUser><containingDay>${dateString}</containingDay></getTimesheet>`;
    const response = await fetch(Server.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'Tj_session': this.sessionUuid,
        'Tj_user': this.username,
      },
      body,
    });
    const data = await response.text();
    const dom = new DOMParser().parseFromString(data, 'text/xml');
    checkForError(dom);
    return dom;
  }

  public static async getAllTasks() {
    const timesheet = await this.getTimesheet();
    const tasks = timesheet.querySelectorAll('task');
    const result: Record<string, string> = {};
    tasks.forEach(task => {
      const id = task.attributes.getNamedItem('id')?.value;
      const name = task.querySelector('name')?.textContent;
      const active = task.querySelector('active')?.textContent === 'true';
      if (id && name && active) {
        result[id] = name;
      }
    });
    return result;
  }

  public static async findTaskForJiraID(jiraID: string): Promise<Task | null> {
    const timesheet = await this.getTimesheet();
    const xpath = `//task/name[contains(text(),"${jiraID}")]`;
    const matchingTasks = timesheet.evaluate(xpath, timesheet);
    let foundTask: Element | null;
    for (
      let task = matchingTasks.iterateNext()?.parentElement;
      task;
      task = matchingTasks.iterateNext()?.parentElement
    ) {
      foundTask = task;
      if (task.querySelector('active')?.textContent === 'true') {
        break;
      }
    }
    if (foundTask) {
      return new Task(foundTask, timesheet);
    }
    return null;
  }

  public static async getTaskById(id: string, timesheetDate?: Date) {
    const timesheet = await this.getTimesheet(timesheetDate);
    const xpath = `//task[@id="${id}"]`;
    const task = timesheet.evaluate(xpath, timesheet).iterateNext();
    if (task) {
      return new Task(task as Element, timesheet);
    }
    return null;
  }

  public static async fetch(body: string) {
    const response = await fetch(Server.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'Tj_session': this.sessionUuid,
        'Tj_user': this.username,
      },
      body,
    });
    const data = await response.text();
    const dom = new DOMParser().parseFromString(data, 'text/xml');
    checkForError(dom);
    return dom;
  }
}
