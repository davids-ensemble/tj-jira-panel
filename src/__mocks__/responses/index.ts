import { createLoginResponse, getCurrentLoginResponse, getLoginResponse } from './login.responses';
import { createServerConfigResponse, getServerConfigurationResponse } from './server.responses';
import { createAddSubtaskResponse, createTimesheetResponse, getTimesheetResponse } from './timesheet.response';

export interface ResponseFunctionParameters {
  body: Document;
  headers: Headers;
}

const responses = {
  login: getLoginResponse,
  getCurrentLogin: getCurrentLoginResponse,
  getTimesheet: getTimesheetResponse,
  getServerConfiguration: getServerConfigurationResponse,
};

export const playwrightResponses = {
  login: createLoginResponse,
  getTimesheet: createTimesheetResponse,
  addSubTask: createAddSubtaskResponse,
  getServerConfiguration: createServerConfigResponse,
};

export default responses;
