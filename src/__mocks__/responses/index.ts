import { getCurrentLoginResponse, getLoginResponse } from './login.responses';
import { getTimesheetResponse } from './timesheet.response';

export interface ResponseFunctionParameters {
  body: Document;
  headers: Headers;
}

const responses = {
  login: getLoginResponse,
  getCurrentLogin: getCurrentLoginResponse,
  getTimesheet: getTimesheetResponse,
};

export default responses;
