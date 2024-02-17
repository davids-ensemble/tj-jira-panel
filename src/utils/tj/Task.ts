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
}
