import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'tj-jira-panel',
  shadow: true,
})
export class TJJiraPanel {
  @Prop({ attribute: 'jira-id' }) jiraID: string;
  @Prop() jiraSummary: string;

  render() {
    return (
      <div>
        <h4>{this.jiraID}</h4>
        <p>{this.jiraSummary}</p>
      </div>
    );
  }
}
