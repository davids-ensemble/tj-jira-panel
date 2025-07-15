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
          <span class="arrow_icon">
            <svg fill="none" viewBox="-8 -8 32 32" role="presentation">
              <path
                fill="currentcolor"
                d="m14.53 6.03-6 6a.75.75 0 0 1-1.004.052l-.056-.052-6-6 1.06-1.06L8 10.44l5.47-5.47z"
              ></path>
            </svg>
          </span>
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
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
              <g fill="none" fill-rule="evenodd">
                <path
                  d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z"
                  fill="#344563"
                ></path>
              </g>
            </svg>
          </button>
          <h4>TJ Integration</h4>
        </div>
      );
    }
  }
}
