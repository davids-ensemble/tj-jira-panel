import { HttpResponse } from 'msw';

import type { ResponseFunctionParameters } from '.';

export const createTimesheetResponse = () => `
<result forAction="getTimesheet">
  <tasksAndHours>
    <task id="1">
      <name>[JIRA-123] Task 1</name>
      <active>true</active>
    </task>
    <task id="2">
      <name>Task 2</name>
      <active>false</active>
    </task>
    <task id="3">
      <name>Task 3</name>
      <active>true</active>
    </task>
  </tasksAndHours>
</result>`;

export const createAddSubtaskResponse = ({ body }: ResponseFunctionParameters) => {
  const name = body.getElementsByTagName('name')[0].textContent;
  const startDate = body.getElementsByTagName('startDate')[0].textContent;
  const parentTaskId = body.getElementsByTagName('parentTaskId')[0].textContent;
  return `<result forAction="addSubTask" id="4">
  <active>true</active>
  <name>${name}</name>
  <startDate>${startDate}</startDate>
  <parentTaskId>${parentTaskId}</parentTaskId>
</result>`;
};

export const getTimesheetResponse = () => {
  return HttpResponse.xml(createTimesheetResponse());
};
