import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'with-loading',
  styleUrl: 'with-loading.css',
  shadow: true,
})
export class WithLoading {
  @Prop() isLoading: boolean;

  render() {
    return (
      <Host>
        {this.isLoading ? (
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <slot></slot>
        )}
      </Host>
    );
  }
}
