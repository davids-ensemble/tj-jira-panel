import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ionic-styles-provider',
  styleUrl: 'ionic-styles-provider.css',
})
export class IonicStylesProvider {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
