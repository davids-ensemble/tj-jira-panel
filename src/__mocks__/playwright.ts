import type { Route } from '@playwright/test';
import { DOMParser } from '@xmldom/xmldom';

import '../playwright.setup';
import { playwrightResponses } from './responses';

const availableResponses = Object.keys(playwrightResponses) as Array<keyof typeof playwrightResponses>;

export const mockAPI = async (route: Route) => {
  const body = route.request().postData();
  const parsedBody = new DOMParser().parseFromString(body, 'text/xml');
  const requestType = availableResponses.find(type => parsedBody.getElementsByTagName(type).length > 0);

  if (requestType) {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: playwrightResponses[requestType]({
        body: parsedBody,
        headers: route.request().headers() as unknown as Headers,
      }),
    });
  } else {
    route.fulfill({
      status: 404,
      body: 'No handler implemented for this request.',
    });
  }
};
