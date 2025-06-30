import { Task } from '../Task';

const taskInfo = {
  id: '1',
  name: 'Test Task',
  active: 'true',
  startDate: '2023-12-01',
  recordedHours: [{ day: '2023-12-01', hours: '8' }],
};

const timesheet = new DOMParser().parseFromString(
  `<result forAction="getTimesheet">
    <tasksAndHours>
      <task id="${taskInfo.id}">
        <name>${taskInfo.name}</name>
        <active>${taskInfo.active}</active>
        <startDate>${taskInfo.startDate}</startDate>
        <workKind>DEVELOPMENT</workKind>
        <recordedHours>
          ${taskInfo.recordedHours.map(el => `<workDay day="${el.day}" hours="${el.hours}"/>`).join('')}
			  </recordedHours>
      </task>
    </tasksAndHours>
  </result>`,
  'text/html',
);
const taskElement = timesheet.querySelector('task') as Element;

describe('Task', () => {
  it('should correctly initialize from task element', () => {
    const {
      id,
      name,
      active,
      startDate,
      recordedHours: [{ day, hours }],
    } = taskInfo;

    const task = new Task(taskElement);

    expect(task.id).toEqual(id);
    expect(task.name).toEqual(name);
    expect(task.active.toString()).toEqual(active);
    expect(task.startDate).toEqual(new Date(startDate));
    expect(task.recordedHours).toEqual({ [day]: hours });
    expect(task.workKind).toEqual('DEVELOPMENT');
  });

  it('should default workKind to DEVELOPMENT when not present in XML', () => {
    const xmlWithoutWorkKind = new DOMParser().parseFromString(
      `<task id="2">
        <name>Test Task Without WorkKind</name>
        <active>true</active>
        <startDate>2023-12-01</startDate>
        <recordedHours></recordedHours>
      </task>`,
      'text/html',
    );
    const taskElement = xmlWithoutWorkKind.querySelector('task') as Element;
    const task = new Task(taskElement);

    expect(task.workKind).toEqual('DEVELOPMENT');
  });
});
