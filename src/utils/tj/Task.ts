import { User } from './User';
import { escapeNonAlphanumericCharacters } from './utils';

export interface UpdateTaskPayload extends Pick<Task, 'name' | 'active' | 'description'> {
  parentId: string;
  date: string;
}

export class Task {
  id: string;
  version: string;
  name: string;
  active: boolean;
  startDate: Date;
  recordedHours: Record<string, string>;
  parentTask?: Task;
  description: string;

  constructor(task: Element, timesheet?: Document) {
    this.id = task.attributes.getNamedItem('id')?.value;
    this.version = task.attributes.getNamedItem('version')?.value;
    this.name = task.querySelector('name')?.textContent;
    this.active = task.querySelector('active')?.textContent === 'true';
    this.startDate = new Date(task.querySelector('startDate')?.textContent ?? '');
    this.description = task.querySelector('descriptionHtml')?.textContent ?? '';
    this.recordedHours = Array.from(task.querySelectorAll('recordedHours > workDay')).reduce(
      (acc: Record<string, string>, item) => {
        const date = item.attributes.getNamedItem('day')?.value;
        const hours = item.attributes.getNamedItem('hours')?.value;
        if (date && hours) {
          acc[date] = hours;
        }
        return acc;
      },
      {},
    );
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

  async createSubTask(name: string, date: string, description = '<p> </p>') {
    const body = `
<addSubTask id="0" version="0">
  <id>0</id>
  <version>0</version>
  <active>true</active>
  <name>${escapeNonAlphanumericCharacters(name)}</name>
  <descriptionHtmlText>${escapeNonAlphanumericCharacters(description)}</descriptionHtmlText>
  <startDate>${date}</startDate>
  <parentTaskId>${this.id}</parentTaskId>
  <kind>WORK</kind>
  <workKind>DEVELOPMENT</workKind>
  <billable>true</billable>
  <assignedUser id="${User.userId}" userName="${User.username}"/>
</addSubTask>
  `;
    const dom = await User.fetch(body);
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

  async update(payload: UpdateTaskPayload) {
    const { name, description, date } = payload;

    if (this.active === false && payload.active === true) {
      await this.updateTaskStatus(payload.active);
    }

    if (
      name !== this.name ||
      description !== this.description ||
      new Date(date).getTime() !== this.startDate.getTime()
    ) {
      await this.updateTaskMetadata(payload);
    }

    if (payload.parentId !== this.parentTask?.id) {
      await this.moveTask(payload.parentId);
    }

    if (this.active === true && payload.active === false) {
      await this.updateTaskStatus(payload.active);
    }
  }

  private async updateTaskMetadata(payload: UpdateTaskPayload) {
    const { name, description, date } = payload;
    const body = `
<updateTask id="${this.id}" version="${this.version}">
  <id>${this.id}</id>
  <version>${this.version}</version>
  <name>${escapeNonAlphanumericCharacters(name)}</name>
  <descriptionHtmlText>${escapeNonAlphanumericCharacters(description)}</descriptionHtmlText>
  <startDate>${date}</startDate>
  <kind>WORK</kind>
  <workKind>DEVELOPMENT</workKind>
  <billable>true</billable>
  <assignedUser id="${User.userId}" userName="${User.username}"/>
</updateTask>
  `;
    const dom = await User.fetch(body);
    this.version = dom.querySelector('result').attributes.getNamedItem('version')?.value;
    this.name = dom.querySelector('name')?.textContent;
    this.description = dom.querySelector('descriptionHtml')?.textContent ?? '';
    this.startDate = new Date(dom.querySelector('startDate')?.textContent ?? '');
  }

  private async moveTask(parentId: string) {
    const body = `
<moveWorkItem itemId="${this.id}" itemTag="task" newParentId="${parentId}" newParentTag="task"/>
`;
    const dom = await User.fetch(body);
    this.version = dom.querySelector('movedItem').attributes.getNamedItem('version')?.value;
    this.parentTask = new Task(dom.querySelector('newParent'));
  }

  private async updateTaskStatus(active: boolean) {
    let body = '';
    if (active === false) {
      body = `<closeTask id="${this.id}" tag="task"/>`;
    } else {
      body = `<activateTask id="${this.id}" tag="task"/>`;
    }
    await User.fetch(body);
    this.active = active;
  }
}
