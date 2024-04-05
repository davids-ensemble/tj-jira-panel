import { Switch } from '../Switch';

describe('Switch', () => {
  it('should render the first case that returns true', () => {
    const cases = [
      { condition: false, renderComponent: () => 1 },
      { condition: true, renderComponent: () => 2 },
      { condition: true, renderComponent: () => 3 },
    ];

    // @ts-ignore-error
    const result = Switch({ cases, shouldBreak: false }, null, null);

    expect(result).toEqual([2, 3]);
  });
  it('should render the first case that returns true and break', () => {
    const cases = [
      { condition: false, renderComponent: () => 1 },
      { condition: true, renderComponent: () => 2 },
      { condition: true, renderComponent: () => 3 },
    ];

    // @ts-ignore-error
    const result = Switch({ cases, shouldBreak: true }, null, null);

    expect(result).toEqual([2]);
  });
});
