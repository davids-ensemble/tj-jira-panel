import { Component, State, Watch, h } from '@stencil/core';

import { User } from '@utils/tj';

/**
 * @internal
 */
@Component({
  tag: 'tj-work-kind-page',
  styleUrl: 'tj-work-kind-page.css',
  scoped: true,
})
export class TJWorkKindPage {
  @State() selectedWorkKind: string = User.defaultWorkKind;

  workKindOptions = [
    { value: 'DEVELOPMENT', label: 'Development' },
    { value: 'QA', label: 'QA' },
  ];

  @Watch('selectedWorkKind')
  selectedWorkKindChanged() {
    User.defaultWorkKind = this.selectedWorkKind;
  }

  onRadioChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.selectedWorkKind = target.value;
  };

  render() {
    return (
      <fieldset>
        <legend>Choose your default work kind:</legend>
        <p>This will be pre-selected when creating new tasks.</p>
        {this.workKindOptions.map(option => (
          <div>
            <input
              type="radio"
              id={option.value}
              name="workKind"
              value={option.value}
              checked={this.selectedWorkKind === option.value}
              onChange={this.onRadioChange}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </fieldset>
    );
  }
}
