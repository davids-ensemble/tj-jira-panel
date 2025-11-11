// ==UserScript==
// @name         TJ Web Panel Injector
// @namespace    https://github.com/davids-ensemble
// @version      2025-07-21
// @description  Inserts a TJ web panel into Jira Cloud and Data Center/Server
// @author       davids-ensemble
// @match        https://jira.corp.adobe.com/*
// @match        https://*.atlassian.net/browse/*
// @match        https://*.atlassian.net/jira/*
// @run-at       document-start
// @grant        none
// @updateURL    https://cdn.jsdelivr.net/npm/@ens-davids/tj-jira-panel/user-scripts/tj-jira-panel.user.js
// @downloadURL  https://cdn.jsdelivr.net/npm/@ens-davids/tj-jira-panel/user-scripts/tj-jira-panel.user.js
// ==/UserScript==

const SCRIPT_VERSION = '2025-07-21';
let jiraId = '';
let jiraSummary = '';
let jiraDescription = '';
let isJiraCloud = false;

const waitForElement = async selector => {
  while (document.querySelector(selector) === null) {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
};

const getJiraIssueId = () => {
  if (isJiraCloud) {
    return document.querySelector('[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]')
      ?.textContent;
  } else {
    return document.getElementById('key-val')?.textContent;
  }
};

const getJiraSummary = () => {
  if (isJiraCloud) {
    return document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]')?.textContent;
  } else {
    return document.getElementById('summary-val')?.textContent;
  }
};

const getJiraDescription = () => {
  if (isJiraCloud) {
    return (
      document.querySelector('[data-testid="issue.views.field.rich-text.description"] .ak-renderer-document')
        ?.innerHTML || ''
    );
  } else {
    return document.querySelector('#description-val .user-content-block')?.innerHTML || '';
  }
};

const getInsertLocation = async () => {
  if (isJiraCloud) {
    return Promise.any([
      waitForElement('[data-testid="issue.views.issue-details.issue-layout.sections.footnote"]'),
      waitForElement('[data-testid="issue.views.issue-details.issue-layout.footnote"]'),
    ]);
  } else {
    return waitForElement('#viewissuesidebar');
  }
};

const insertTjSection = async () => {
  const issueSidebar = await getInsertLocation();
  jiraId = getJiraIssueId();
  jiraSummary = getJiraSummary();
  jiraDescription = getJiraDescription();
  const tjWebComp = document.createElement('tj-jira-panel');
  tjWebComp.setAttribute('jira-id', jiraId);
  tjWebComp.setAttribute('jira-summary', jiraSummary);
  tjWebComp.setAttribute('jira-description', jiraDescription);
  tjWebComp.setAttribute('script-version', SCRIPT_VERSION);
  if (isJiraCloud) {
    tjWebComp.setAttribute('theme', 'jira-cloud');
    issueSidebar.before(tjWebComp);
  } else {
    tjWebComp.setAttribute('theme', 'jira-server');
    issueSidebar.appendChild(tjWebComp);
  }
};

const insertWebElementScript = () => {
  const script = document.createElement('script');
  const version = localStorage.getItem('tj_version');
  let url = 'https://cdn.jsdelivr.net/npm/@ens-davids/tj-jira-panel/dist/tj-jira-panel/tj-jira-panel.esm.js';
  if (version) {
    url += `?v=${version}`;
  }
  script.src = url;
  script.type = 'module';
  script.onload = insertTjSection;
  document.head.appendChild(script);
};

(async () => {
  await waitForElement('head');
  isJiraCloud = window.location.href.includes('atlassian.net');
  insertWebElementScript();
  setInterval(() => {
    const jiraIssue = getJiraIssueId();
    const exists = document.querySelector('tj-jira-panel') !== null;
    if ((jiraIssue && jiraIssue !== jiraId && !exists) || (jiraIssue && !exists)) {
      // URL changed
      jiraId = jiraIssue;
      insertTjSection();
    }
  }, 5_000);
})();
