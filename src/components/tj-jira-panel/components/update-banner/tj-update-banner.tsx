import { Component, Prop, State, h } from '@stencil/core';

import { version } from '@root/package.json';

/**
 * A banner that displays when a new version of the component is available.
 */
@Component({
  tag: 'tj-update-banner',
  styleUrl: 'tj-update-banner.css',
  scoped: true,
})
export class TJUpdateBanner {
  /**
   * The version of the script used to inject the panel.
   */
  @Prop() scriptVersion: string | undefined = null;

  @State() latestVersion: string;
  isButtonDisabled = !this.scriptVersion || new Date(this.scriptVersion) < new Date('2024-05-18');

  async componentWillLoad() {
    console.log('scriptVersion', this.scriptVersion);
    console.log(this.isButtonDisabled);
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
            href={`https://github.com/davids-ensemble/tj-jira-panel/releases/tag/${this.latestVersion}`}
            target="_blank"
          >
            See release notes
          </a>
          <div class="updateButtonContainer">
            <button class="updateButton" onClick={this.updateAndRefresh} disabled={this.isButtonDisabled}>
              Update and Refresh
            </button>
            {this.isButtonDisabled && (
              <contextual-help variant="help">
                <h6 slot="heading">Outdated script version</h6>
                <p slot="content">
                  In order to use this feature you need to update to at least user-script version 2024-05-18.
                </p>
              </contextual-help>
            )}
          </div>
        </div>
      </div>
    ) : null;
  }
}
