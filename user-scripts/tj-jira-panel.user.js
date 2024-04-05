// ==UserScript==
// @name         TJ Web Panel Injector
// @namespace    http://tampermonkey.net/
// @version      2024-04-05
// @description  Inserts a TJ web panel into Adobe's jira
// @author       You
// @match        https://jira.corp.adobe.com/*
// ==/UserScript==

const waitForElement = async selector => {
  while (document.querySelector(selector) === null) {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
};

const insertTjSection = async () => {
  const gitIssueWebpanel = await waitForElement('#git-issue-webpanel');
  jiraId = document.getElementById('key-val')?.textContent;
  jiraSummary = document.getElementById('summary-val')?.textContent;
  const tjWebComp = document.createElement('tj-jira-panel');
  tjWebComp.setAttribute('jira-id', jiraId);
  tjWebComp.setAttribute('jira-summary', jiraSummary);
  gitIssueWebpanel.insertAdjacentElement('afterend', tjWebComp);
};

const insertWebElementScript = () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@ens-davids/tj-jira-panel/dist/tj-jira-panel/tj-jira-panel.esm.js';
  script.type = 'module';
  script.onload = insertTjSection;
  document.head.appendChild(script);
};

(async () => {
  await waitForElement('head');
  // TJ
  insertWebElementScript();
  setInterval(() => {
    const jiraIssue = document.getElementById('key-val')?.textContent;
    const exists = document.querySelector('tj-jira-panel') !== null;
    if (jiraIssue && jiraIssue !== jiraId && !exists) {
      // URL changed
      jiraId = jiraIssue;
      insertTjSection();
    }
  }, 5_000);
})();
