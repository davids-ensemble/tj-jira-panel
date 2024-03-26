import type { Route } from '@playwright/test';

import '../playwright.setup';
import { playwrightResponses } from './responses';

const availableResponses = Object.keys(playwrightResponses) as Array<
  keyof typeof playwrightResponses
>;

export const mockAPI = async (route: Route) => {
  const body = route.request().postData();
  const requestType = availableResponses.find(type => body.includes(type));

  if (requestType) {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: playwrightResponses[requestType],
    });
  } else {
    route.fulfill({
      status: 404,
      body: 'No handler implemented for this request.',
    });
  }
};
