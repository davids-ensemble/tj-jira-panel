const SCRIPT_VERSION = '2024-05-27';
let jiraId = '';
let jiraSummary = '';
let jiraDescription = '';

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
  jiraDescription = document.querySelector('#description-val .user-content-block')?.innerHTML;
  const tjWebComp = document.createElement('tj-jira-panel');
  tjWebComp.setAttribute('jira-id', jiraId);
  tjWebComp.setAttribute('jira-summary', jiraSummary);
  tjWebComp.setAttribute('jira-description', jiraDescription);
  tjWebComp.setAttribute('script-version', SCRIPT_VERSION);
  gitIssueWebpanel.insertAdjacentElement('afterend', tjWebComp);
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
