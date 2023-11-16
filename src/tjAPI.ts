const url = 'https://tj.ensemblesoftware.ro/data';

export interface AuthObject {
  userId: string;
  sessionUuid: string;
  username: string;
}

export const getServerConfig = async () => {
  const body = `<getServerConfiguration/>`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
    },
    body,
  });
  const data = await response.text();
  const dom = new DOMParser().parseFromString(data, 'text/xml');
  const result = {
    version: dom.querySelector('serverVersion')?.textContent ?? 'unknown',
    url: dom.querySelector('serverUrl')?.textContent,
    supportsGeneratedSummaries:
      dom.querySelector('supportsGeneratedSummaries')?.textContent === 'true',
  };
  return result;
};

export const login = async (username: string, password: string) => {
  const escapedPassword = password
    .replace('&', '&amp;')
    .replace('<', '&lt;')
    .replace('>', '&gt;')
    .replace('"', '&quot;')
    .replace("'", '&apos;');
  const body = `<login><userName>${username}</userName><password>${escapedPassword}</password></login>`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
    },
    body,
  });
  const data = await response.text();
  const dom = new DOMParser().parseFromString(data, 'text/xml');
  const result = {
    userId: dom.querySelector('user')?.attributes.getNamedItem('id')?.value,
    sessionUuid: dom.querySelector('sessionUuid')?.textContent,
    username,
  };
  return result;
};

export const isSessionValid = async ({ sessionUuid, username }: AuthObject) => {
  const body = `<getCurrentLogin/>`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
      Tj_session: sessionUuid,
      Tj_user: username,
    },
    body,
  });
  const data = await response.text();
  const dom = new DOMParser().parseFromString(data, 'text/xml');
  return dom.querySelector('sessionUuid')?.textContent === sessionUuid;
};

export const getTimesheet = async ({
  userId,
  username,
  sessionUuid,
}: AuthObject) => {
  const date = new Date().toISOString().split('T')[0];
  const body = `<getTimesheet><forUser>${userId}</forUser><containingDay>${date}</containingDay></getTimesheet>`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
      Tj_session: sessionUuid,
      Tj_user: username,
    },
    body,
  });
  const data = await response.text();
  const dom = new DOMParser().parseFromString(data, 'text/xml');
  return dom;
};

const parseTask = (task: Element) => ({
  id: task.attributes.getNamedItem('id')?.value,
  name: task.querySelector('name')?.textContent,
  startDate: new Date(task.querySelector('startDate')?.textContent ?? ''),
  recordedHours: Array.from(
    task.querySelectorAll('recordedHours > workDay')
  ).reduce((acc: Record<string, string>, item) => {
    const date = item.attributes.getNamedItem('day')?.value;
    const hours = item.attributes.getNamedItem('hours')?.value;
    if (date && hours) {
      acc[date] = hours;
    }
    return acc;
  }, {}),
});

export const findTaskForJiraId = async ({
  jiraId,
  ...authObject
}: AuthObject & { jiraId: string }) => {
  const timesheet = await getTimesheet(authObject);
  const xpath = `//task/name[contains(text(),"${jiraId}")]`;
  const matchingTasks = timesheet.evaluate(xpath, timesheet);
  const task = matchingTasks.iterateNext()?.parentElement;
  if (task) {
    return parseTask(task);
  }
  return null;
};

export const getAllTasks = async (options: AuthObject) => {
  const timesheet = await getTimesheet(options);
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
};

interface CreateTaskParams extends AuthObject {
  name: string;
  parentTaskId: string;
}

export const createSubTask = async ({
  name,
  parentTaskId,
  userId,
  username,
  sessionUuid,
}: CreateTaskParams) => {
  const date = new Date().toISOString().split('T')[0];
  const body = `
<addSubTask id="0" version="0">
  <id>0</id>
  <version>0</version>
  <active>true</active>
  <name>${name.replace(/</g, '[').replace(/>/g, ']')}</name>
  <descriptionHtmlText>&lt;p&gt; &lt;/p&gt;</descriptionHtmlText>
  <startDate>${date}</startDate>
  <parentTaskId>${parentTaskId}</parentTaskId>
  <kind>WORK</kind>
  <workKind>DEVELOPMENT</workKind>
  <billable>true</billable>
  <assignedUser id="${userId}" userName="${username}"/>
</addSubTask>
  `;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
      Tj_session: sessionUuid,
      Tj_user: username,
    },
    body,
  });
  const data = await response.text();
  const dom = new DOMParser().parseFromString(data, 'text/xml');
  const active = dom.querySelector('active')?.textContent === 'true';
  if (active) {
    // @ts-ignore
    return parseTask(dom.querySelector('result'));
  }
  return null;
};

interface RecordHoursParams {
  username: string;
  sessionUuid: string;
  taskId: string;
  day: string;
  hours: string;
}

export const recordHours = async ({
  username,
  sessionUuid,
  taskId,
  day,
  hours,
}: RecordHoursParams) => {
  const body = `<recordHoursForDay id="0" version="0" taskId="${taskId}" day="${day}" hours="${hours}"/>`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
      Tj_session: sessionUuid,
      Tj_user: username,
    },
    body,
  });
  const data = await response.text();
  const dom = new DOMParser().parseFromString(data, 'text/xml');
  return dom;
};
