import { HttpResponse } from 'msw';

import { Server } from '@utils/tj';

export const createServerConfigResponse = () => `
    <response>
      <serverVersion>1.0.0</serverVersion>
      <serverUrl>${Server.url}</serverUrl>
      <supportsGeneratedSummaries>true</supportsGeneratedSummaries>
    </response>
  `;

export const getServerConfigurationResponse = () => {
  return HttpResponse.xml(createServerConfigResponse());
};
