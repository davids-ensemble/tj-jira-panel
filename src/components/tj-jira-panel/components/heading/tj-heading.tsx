import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

/**
 * The heading for the TJ panel. It contains the title and a button to toggle the panel.
 */
@Component({
  tag: 'tj-heading',
  styleUrl: 'tj-heading.css',
  scoped: true,
})
export class TJHeading {
  /**
   * Whether the panel is expanded or not.
   * This is used to toggle the icon in the button.
   */
  @Prop() isExpanded: boolean;

  /**
   * Whether the panel is using jira-cloud theme or not.
   */
  @Prop() isJiraCloud: boolean;

  /**
   * Emitted when the user presses the toggle button.
   * This is used to expand or collapse the panel.
   */
  @Event() togglePanel: EventEmitter<void>;

  // TODO: Refactor this with summary/details
  render() {
    if (this.isJiraCloud) {
      return (
        <button
          aria-controls="tj-panel"
          aria-expanded={String(this.isExpanded)}
          aria-label="Toggle TJ panel"
          onClick={() => this.togglePanel.emit()}
          class="theme__jira-cloud toggle_button"
        >
          <span class="title">TJ Integration</span>
          <span class="arrow_icon" />
        </button>
      );
    } else {
      return (
        <div class="wrapper">
          <button
            aria-controls="tj-panel"
            aria-expanded={String(this.isExpanded)}
            aria-label="Toggle TJ panel"
            onClick={() => this.togglePanel.emit()}
            class="toggle_button theme__jira-server"
          />
          <h4>TJ Integration</h4>
        </div>
      );
    }
  }
}
