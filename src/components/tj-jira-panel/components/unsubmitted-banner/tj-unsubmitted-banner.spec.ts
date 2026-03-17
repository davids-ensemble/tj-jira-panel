import { TJUnsubmittedBanner } from './tj-unsubmitted-banner';
import { User } from '@utils/tj';

const makeDom = (submitted: boolean) => {
  const xml = `<result><submitted>${submitted}</submitted></result>`;
  return new DOMParser().parseFromString(xml, 'text/xml');
};

describe('TJUnsubmittedBanner', () => {
  let component: TJUnsubmittedBanner;

  beforeEach(() => {
    component = new TJUnsubmittedBanner();
    // Stub the event emitter so it doesn't throw
    component.timesheetSubmittedChange = { emit: jest.fn() } as any;
  });

  it('does not fetch when isLoggedIn is false', async () => {
    const spy = jest.spyOn(User, 'getTimesheet');
    component.isLoggedIn = false;
    await component.componentWillLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('sets isSubmitted to false when timesheet is not submitted', async () => {
    jest.spyOn(User, 'getTimesheet').mockResolvedValue(makeDom(false));
    component.isLoggedIn = true;
    await component.componentWillLoad();
    expect((component as any).isSubmitted).toBe(false);
  });

  it('sets isSubmitted to true when timesheet is submitted', async () => {
    jest.spyOn(User, 'getTimesheet').mockResolvedValue(makeDom(true));
    component.isLoggedIn = true;
    await component.componentWillLoad();
    expect((component as any).isSubmitted).toBe(true);
  });

  it('emits timesheetSubmittedChange with the submission status', async () => {
    jest.spyOn(User, 'getTimesheet').mockResolvedValue(makeDom(false));
    component.isLoggedIn = true;
    await component.componentWillLoad();
    expect(component.timesheetSubmittedChange.emit).toHaveBeenCalledWith(false);
  });

  it('leaves isSubmitted as null on fetch error (silent failure)', async () => {
    jest.spyOn(User, 'getTimesheet').mockRejectedValue(new Error('Network error'));
    component.isLoggedIn = true;
    await component.componentWillLoad();
    expect((component as any).isSubmitted).toBeNull();
  });

  it('fetches when isLoggedIn transitions from false to true', async () => {
    const spy = jest.spyOn(User, 'getTimesheet').mockResolvedValue(makeDom(false));
    component.isLoggedIn = false;
    await component.componentWillLoad();
    expect(spy).not.toHaveBeenCalled();

    component.isLoggedIn = true;
    await (component as any).onIsLoggedInChange(true);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
