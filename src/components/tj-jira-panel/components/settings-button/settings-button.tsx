import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';

import { Icon } from './Icons';

@Component({
  tag: 'settings-button',
  styleUrl: 'settings-button.css',
  shadow: true,
})
export class SettingsButton {
  /**
   * Emitted when the user presses the settings button.
   */
  @Event() showSettings: EventEmitter<void>;
  /**
   * Emitted when the user presses the close settings button.
   */
  @Event() hideSettings: EventEmitter<void>;

  /**
   * The size of the icon.
   */
  @Prop() size = 24;

  @State() isSettingsOpen = false;

  render() {
    return (
      <Icon
        type={this.isSettingsOpen ? 'settings-x' : 'settings'}
        size={this.size}
        role="button"
        aria-label={this.isSettingsOpen ? 'Close settings' : 'Open settings'}
        tabindex={0}
        onClick={() => {
          this.isSettingsOpen ? this.hideSettings.emit() : this.showSettings.emit();
          this.isSettingsOpen = !this.isSettingsOpen;
        }}
      />
    );
  }
}
