import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';

import { version } from '@root/package.json';
import { LOCAL_STORAGE_KEYS } from '@utils/tj';

import { BannerStateChangeEvent, BannerType } from '../footer/types';

type PackageMetadataResponse = {
  type: string;
  name: string;
  /** An object mapping dist-tags to version numbers. Always empty for GitHub repos. */
  tags: {
    latest: string;
    beta: string;
    [key: string]: string;
  };
  /** A list of all versions sorted in descending order. */
  versions: [
    {
      version: string;
      links: {
        /** A link to metadata for this version. */
        self: string;
        /** A link to entry point information for this version. Only for npm packages. */
        entrypoints: string;
        /** A link to stats for this version. */
        stats: string;
      };
    },
  ];
  links: {
    /** A link to stats for this package. */
    stats: string;
  };
};

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

  /**
   * Emitted after the update API resolves with the latest version.
   * Footer component uses this to track the banner state.
   */
  @Event()
  bannerStateChange: EventEmitter<BannerStateChangeEvent>;

  async componentWillLoad() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.VERSION, version);
    const isBetaVersion = version.includes('-beta');
    try {
      const response = await fetch('https://data.jsdelivr.com/v1/packages/npm/@ens-davids/tj-jira-panel');
      const data = (await response.json()) as PackageMetadataResponse;
      this.latestVersion = data.tags[isBetaVersion ? 'beta' : 'latest'] || version;
      this.bannerStateChange.emit({ type: BannerType.PanelUpdate, isActive: version !== this.latestVersion });
    } catch {
      this.bannerStateChange.emit({ type: BannerType.PanelUpdate, isActive: false });
    }
  }

  updateAndRefresh = async () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.VERSION, this.latestVersion);
    window.location.reload();
  };

  render() {
    if (!this.latestVersion) {
      return null;
    }

    return version !== this.latestVersion ? (
      <tj-banner>
        <h4 slot="header">New TJI Version Available</h4>
        <div slot="content">
          <a
            class="releaseNotesLink"
            href={`https://github.com/davids-ensemble/tj-jira-panel/releases/tag/v${this.latestVersion}`}
            target="_blank"
          >
            See release notes
          </a>
        </div>
        <div slot="buttonArea">
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
      </tj-banner>
    ) : null;
  }
}
