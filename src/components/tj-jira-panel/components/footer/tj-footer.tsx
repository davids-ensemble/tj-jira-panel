import { Component, Listen, Prop, State, h } from '@stencil/core';

import { version } from '@root/package.json';
import { Server, User } from '@utils/tj';

import { BannerStateChangeEvent, BannerType } from './types';

const BANNER_PRIORITY = [BannerType.Unsubmitted, BannerType.PanelUpdate];

/**
 * The footer of the panel.
 * Displays the version of the server and the extension and provides a button to open/close the settings.
 */
@Component({
  tag: 'tj-footer',
  styleUrl: 'tj-footer.css',
  scoped: true,
})
export class TJFooter {
  /**
   * Whether the user is logged in. Certain information is only available when logged in.
   */
  @Prop() isLoggedIn: boolean;
  /**
   * The version of the script used to inject the panel.
   */
  @Prop() scriptVersion: string | undefined;
  /**
   * Whether the panel is using jira-cloud theme or not.
   */
  @Prop() isJiraCloud: boolean;

  @State() serverVersion: string;
  @State() serverCountry: string;
  @State() activeBanners: Set<BannerType> = new Set();

  get visibleBanner() {
    return BANNER_PRIORITY.find(banner => this.activeBanners.has(banner));
  }

  async componentWillLoad() {
    const config = await Server.fetchServerConfig();
    this.serverVersion = config.version;
    this.serverCountry = config.country;
  }

  @Listen('bannerStateChange')
  handleBannerStateChange(event: CustomEvent<BannerStateChangeEvent>) {
    const next = new Set(this.activeBanners);
    if (event.detail.isActive) {
      next.add(event.detail.type);
    } else {
      next.delete(event.detail.type);
    }
    this.activeBanners = next;
  }

  getBannerStyle(bannerType: BannerType) {
    return { display: this.visibleBanner === bannerType ? 'block' : 'none' };
  }

  render() {
    return (
      <footer>
        {!this.isJiraCloud && (
          <div>
            <settings-button></settings-button>
          </div>
        )}
        <tj-unsubmitted-banner
          isLoggedIn={this.isLoggedIn}
          style={this.getBannerStyle(BannerType.Unsubmitted)}
        ></tj-unsubmitted-banner>
        <tj-update-banner
          scriptVersion={this.scriptVersion}
          style={this.getBannerStyle(BannerType.PanelUpdate)}
        ></tj-update-banner>
        <div>
          <p>
            {this.isLoggedIn ? `Logged in as ${User.username} (${User.userId}) @ ` : null}
            {this.serverVersion ? 'TJ v' + this.serverVersion : null}
            {this.serverCountry ? ` (${this.serverCountry})` : null}
          </p>
          <a href={`https://github.com/davids-ensemble/tj-jira-panel/releases/tag/v${version}`} target="_blank">
            TJI v{version}
          </a>
        </div>
      </footer>
    );
  }
}
