import { User } from '../User';

const login = () => User.login({ username: 'testuser', password: 'testpassword' });

describe('User', () => {
  it('should correctly set selectedTasks', () => {
    const tasks = ['task1', 'task2', 'task3'];
    User.selectedTasks = tasks;
    expect(localStorage.getItem('tj_selected_tasks_tjiv2')).toEqual(JSON.stringify(tasks));
  });

  it('should correctly get selectedTasks', () => {
    const tasks = ['task1', 'task2', 'task3'];
    localStorage.setItem('tj_selected_tasks_tjiv2', JSON.stringify(tasks));
    expect(User.selectedTasks).toEqual(tasks);
  });

  it('should correctly login', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const result = {
      userId: 'fake-user-id',
      sessionUuid: 'fake-session-id',
      username,
    };

    await User.login({ username, password });

    expect(User.username).toEqual(username);
    expect(User.userId).toEqual(result.userId);
    expect(User.sessionUuid).toEqual(result.sessionUuid);
    expect(localStorage.getItem('tj_user')).toEqual(JSON.stringify(result));
  });

  it('should correctly check if session is valid', async () => {
    await login();
    const isValid = await User.isSessionValid();
    expect(isValid).toBe(true);
  });

  it('should correctly get timesheet', async () => {
    await login();
    const timesheet = await User.getTimesheet();

    expect(timesheet.querySelector('tasksAndHours')).not.toBeNull();
  });

  it('should correctly get all active tasks', async () => {
    await login();

    const tasks = await User.getAllTasks();

    expect(tasks).toEqual({ '1': '[JIRA-123] Task 1', '3': 'Task 3', '333': '[JIRA-333] doing 333 tests' });
  });

  it('should add sessionId and userId to fetch', async () => {
    await login();
    const fetchMock = jest.fn().mockResolvedValue({
      text: jest.fn().mockResolvedValue('<response></response>'),
    });
    global.fetch = fetchMock;

    await User.fetch('<requestData></requestData>');

    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'Tj_session': 'fake-session-id',
        'Tj_user': 'testuser',
      },
      body: expect.any(String),
    });
  });
});
