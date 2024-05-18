import { Component, Host, Prop, State, h } from '@stencil/core';

import { autoPlacement, computePosition, offset } from '@floating-ui/dom';

import { Icon } from './Icons';

export type Variant = 'info' | 'help';

const VARIANT_LABELS: Record<Variant, string> = {
  info: 'Information',
  help: 'Help',
};

/**
 * Component providing a button that triggers a popover with contextual help content.
 * @slot heading - The heading of the popover. Styled to be more prominent than the content.
 * @slot content - The content of the popover.
 * @slot footer - The footer of the popover.
 */
@Component({
  tag: 'contextual-help',
  styleUrl: 'contextual-help.css',
  shadow: true,
})
export class ContextualHelp {
  /**
   * Controls the icon shown in the button.
   */
  @Prop() variant!: Variant;

  @State() isOpen = false;

  id = [this.variant, Math.random().toString(36).substring(7)].join('_');
  invoker!: HTMLButtonElement;
  popover!: HTMLDivElement;

  handlePopoverToggle = async (e: ToggleEvent) => {
    console.log(e);
    const popover = e.target as HTMLDivElement;
    this.isOpen = e.newState === 'open';
    if (e.newState === 'open') {
      const { x, y } = await computePosition(this.invoker, popover, {
        middleware: [
          autoPlacement({
            alignment: 'start',
            allowedPlacements: ['top-start', 'bottom-start', 'top', 'bottom', 'bottom-start', 'bottom-end'],
          }),
          offset(6),
        ],
      });
      Object.assign(popover.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    }
  };

  render() {
    return (
      <Host>
        <span class="wrapper">
          <button
            popoverTarget={this.id}
            aria-label={VARIANT_LABELS[this.variant]}
            aria-expanded={String(this.isOpen)}
            aria-controls={this.id}
            type="button"
            ref={el => (this.invoker = el)}
          >
            <Icon type={this.variant} />
          </button>
          {/* @ts-expect-error - onToggle is not defined for div element in types */}
          <div id={this.id} popover="" ref={el => (this.popover = el)} onToggle={this.handlePopoverToggle}>
            <slot name="heading" />
            <slot name="content" />
            <slot name="footer" />
          </div>
        </span>
      </Host>
    );
  }
}
