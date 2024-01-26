import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'tj-heading',
  styleUrl: 'tj-heading.css',
  shadow: true,
})
export class TJHeading {
  @Prop() isExpanded: boolean;

  @Event() togglePanel: EventEmitter<void>;

  render() {
    return (
      <div>
        <button
          aria-controls="tj-panel"
          aria-expanded={String(this.isExpanded)}
          onClick={() => this.togglePanel.emit()}
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
