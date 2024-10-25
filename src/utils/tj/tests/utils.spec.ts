import { checkForError, getWeekDays, migrateV1SelectedTasks } from '../utils';

describe('checkForError', () => {
  it('should throw an error if an error element is found', () => {
    const dom = new DOMParser().parseFromString('<serviceError>Test error</serviceError>', 'application/xml');
    expect(() => checkForError(dom)).toThrow('Test error');
  });

  it('should NOT throw an error if an error element is not found', () => {
    const dom = new DOMParser().parseFromString('<response>Test response</response>', 'application/xml');
    expect(() => checkForError(dom)).not.toThrow();
  });

  it('should throw an error if the error element does not have content', () => {
    const dom = new DOMParser().parseFromString('<serviceError></serviceError>', 'application/xml');
    expect(() => checkForError(dom)).toThrow('');
  });
});

describe('migrateV1SelectedTasks', () => {
  it('should migrate selected tasks from v1 to v2', () => {
    const selectedTasks = ['task1', 'task2', 'task3'];
    localStorage.setItem('tj_selected_tasks', selectedTasks.join(','));
    migrateV1SelectedTasks();
    expect(localStorage.getItem('tj_selected_tasks')).toBeNull();
    expect(localStorage.getItem('tj_selected_tasks_tjiv2')).toEqual(JSON.stringify(selectedTasks));
  });

  it('should not do anything if v1 selected tasks do not exist', () => {
    migrateV1SelectedTasks();
    expect(localStorage.getItem('tj_selected_tasks')).toBeNull();
    expect(localStorage.getItem('tj_selected_tasks_tjiv2')).toBeNull();
  });
});

describe('getWeekDays', () => {
  it('should return an array of 7 days', () => {
    const days = getWeekDays(new Date('2023-10-04')); // Wednesday
    expect(days).toHaveLength(7);
  });

  it('should start the week on Monday', () => {
    const days = getWeekDays(new Date('2023-10-04')); // Wednesday
    expect(days[0].label).toBe('Mon');
  });

  it('should correctly calculate the ISO date strings', () => {
    const days = getWeekDays(new Date('2023-10-04')); // Wednesday
    expect(days[0].iso).toBe('2023-10-02'); // Monday
    expect(days[6].iso).toBe('2023-10-08'); // Sunday
  });

  it('should correctly label the days of the week', () => {
    const days = getWeekDays(new Date('2023-10-04')); // Wednesday
    const labels = days.map(day => day.label);
    expect(labels).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  });

  it('should handle weeks that span across months', () => {
    const days = getWeekDays(new Date('2023-10-01')); // Sunday
    expect(days[0].iso).toBe('2023-09-25'); // Monday of the previous month
    expect(days[6].iso).toBe('2023-10-01'); // Sunday
  });

  it('should handle weeks that span across years', () => {
    const days = getWeekDays(new Date('2023-01-01')); // Sunday
    expect(days[0].iso).toBe('2022-12-26'); // Monday of the previous year
    expect(days[6].iso).toBe('2023-01-01'); // Sunday
  });
});
