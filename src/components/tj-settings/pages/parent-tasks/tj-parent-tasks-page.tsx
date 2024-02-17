import { Component, State, Watch, h } from '@stencil/core';
import { User } from '@utils/tj/User';

@Component({
  tag: 'tj-parent-tasks-page',
  styleUrl: 'tj-parent-tasks-page.css',
  shadow: true,
})
export class TJParentTasksPage {
  @State() isLoading = true;
  @State() selectedTasks: string[] = User.selectedTasks;

  allTasks: Record<string, string> | null = null;

  @Watch('selectedTasks')
  selectedTasksChanged() {
    User.selectedTasks = this.selectedTasks;
  }

  async componentWillLoad() {
    this.allTasks = await User.getAllTasks();
    this.isLoading = false;
    if (this.selectedTasks.length === 0) {
      this.selectedTasks = Object.keys(this.allTasks);
    }
  }

  onCheckboxChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.selectedTasks = [...this.selectedTasks, target.id];
    } else {
      this.selectedTasks = this.selectedTasks.filter(id => id !== target.id);
    }
  };

  unselectAll = () => {
    this.selectedTasks = [];
  };

  render() {
    return (
      <with-loading isLoading={this.isLoading}>
        <fieldset>
          <legend>Choose the tasks you want to see in parent tasks:</legend>
          {Object.entries(this.allTasks ?? {}).map(([id, name]) => (
            <div>
              <input
                type="checkbox"
                id={id}
                name={id}
                checked={this.selectedTasks.includes(id)}
                onChange={this.onCheckboxChange}
              />
              <label htmlFor={id}>{name}</label>
            </div>
          ))}
        </fieldset>
        <button onClick={this.unselectAll}>Unselect all</button>
      </with-loading>
    );
  }
}
