import { HttpResponse } from 'msw';

import type { ResponseFunctionParameters } from '.';

export const getTimesheetResponse = ({ body }: ResponseFunctionParameters) => {
  return HttpResponse.xml(`
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
    </result>
  `);
};
