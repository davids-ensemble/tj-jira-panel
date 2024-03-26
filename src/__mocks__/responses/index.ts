import { getCurrentLoginResponse, getLoginResponse } from './login.responses';
import {
  getServerConfigurationResponse,
  serverConfigResponse,
} from './server.responses';
import { getTimesheetResponse } from './timesheet.response';

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
  getServerConfiguration: serverConfigResponse,
};

export default responses;
