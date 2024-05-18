import { Component, State, h } from '@stencil/core';

import { version } from '@root/package.json';

@Component({
  tag: 'tj-update-banner',
  styleUrl: 'tj-update-banner.css',
  scoped: true,
})
export class TJUpdateBanner {
  @State() latestVersion: string;

  async componentWillLoad() {
    if (!localStorage.getItem('tj_version')) {
      localStorage.setItem('tj_version', version);
    }
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@ens-davids/tj-jira-panel/package.json?bypassDiskCache=${Date.now()}`,
    );
    const data = await response.json();
    this.latestVersion = data.version;
  }

  updateAndRefresh = async () => {
    localStorage.setItem('tj_version', this.latestVersion);
    window.location.reload();
  };

  render() {
    return version !== this.latestVersion ? (
      <div class="updateContainer">
        <h4 class="updateHeader">New TJI Version Available</h4>
        <div class="updateContent">
          <a
            class="releaseNotesLink"
            href={`https://github.com/davids-ensemble/tj-jira-panel/releases/tag/v2.2.0`}
            target="_blank"
          >
            See release notes
          </a>
          <button class="updateButton" onClick={this.updateAndRefresh}>
            Update and Refresh
          </button>
        </div>
      </div>
    ) : null;
  }
}
