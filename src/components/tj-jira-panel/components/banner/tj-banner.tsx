import { Component, h } from '@stencil/core';

@Component({
  tag: 'tj-banner',
  styleUrl: 'tj-banner.css',
  scoped: true,
})
export class TjBanner {
  render() {
    return (
      <div class="banner gradientBorder">
        <div class="container">
          <slot name="header"></slot>
          <div class="content">
            <slot name="content"></slot>
            <slot name="buttonArea"></slot>
          </div>
        </div>
      </div>
    );
  }
}
