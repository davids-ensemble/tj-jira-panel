import { checkForError, migrateV1SelectedTasks } from '../utils';

describe('checkForError', () => {
  it('should throw an error if an error element is found', () => {
    const dom = new DOMParser().parseFromString(
      '<serviceError>Test error</serviceError>',
      'application/xml',
    );
    expect(() => checkForError(dom)).toThrow('Test error');
  });

  it('should NOT throw an error if an error element is not found', () => {
    const dom = new DOMParser().parseFromString(
      '<response>Test response</response>',
      'application/xml',
    );
    expect(() => checkForError(dom)).not.toThrow();
  });

  it('should throw an error if the error element does not have content', () => {
    const dom = new DOMParser().parseFromString(
      '<serviceError></serviceError>',
      'application/xml',
    );
    expect(() => checkForError(dom)).toThrow('');
  });
});

describe('migrateV1SelectedTasks', () => {
  it('should migrate selected tasks from v1 to v2', () => {
    const selectedTasks = ['task1', 'task2', 'task3'];
    localStorage.setItem('tj_selected_tasks', selectedTasks.join(','));
    migrateV1SelectedTasks();
    expect(localStorage.getItem('tj_selected_tasks')).toBeNull();
    expect(localStorage.getItem('tj_selected_tasks_tjiv2')).toEqual(
      JSON.stringify(selectedTasks),
    );
  });

  it('should not do anything if v1 selected tasks do not exist', () => {
    migrateV1SelectedTasks();
    expect(localStorage.getItem('tj_selected_tasks')).toBeNull();
    expect(localStorage.getItem('tj_selected_tasks_tjiv2')).toBeNull();
  });
});
