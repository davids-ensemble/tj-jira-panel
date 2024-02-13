import { Component, Prop, State, h } from '@stencil/core';

import { Server } from '../../../../utils/tj/Server';
import { version } from '../../../../../package.json';
import { User } from '../../../../utils/tj/User';

@Component({
  tag: 'tj-footer',
  styleUrl: 'tj-footer.css',
  shadow: true,
})
export class TJFooter {
  @Prop() isLoggedIn: boolean;

  @State() serverVersion: string;

  async componentWillLoad() {
    const config = await Server.fetchServerConfig();
    this.serverVersion = config.version;
  }

  render() {
    return (
      <footer>
        <div></div>
        <div>
          <p>
            {this.isLoggedIn
              ? `Logged in as ${User.username} (${User.userId}) @ `
              : null}
            {this.serverVersion ? 'v' + this.serverVersion : null}
          </p>
          <p>TJI v{version}</p>
        </div>
      </footer>
    );
  }
}
