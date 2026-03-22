import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';

import { Server, User } from '@utils/tj';

/**
 * A banner that warns the user when their previous week's timesheet has not been submitted.
 * Only renders when the user is logged in and the timesheet is confirmed unsubmitted.
 * Emits `timesheetSubmittedChange` so parent components can react to the submission state.
 */
@Component({
  tag: 'tj-unsubmitted-banner',
  styleUrl: 'tj-unsubmitted-banner.css',
  scoped: true,
})
export class TJUnsubmittedBanner {
  /**
   * Whether the user is currently logged in. The timesheet check is skipped when false.
   */
  @Prop() isLoggedIn: boolean;

  /**
   * null = loading or error (do not show banner)
   * false = previous week not submitted (show banner)
   * true = previous week submitted (do not show banner)
   */
  @State() isSubmitted: boolean | null = null;

  /**
   * Emitted after the timesheet API resolves with the submission status.
   * Consumers can use this to suppress other banners.
   */
  @Event({ bubbles: true, composed: false })
  timesheetSubmittedChange: EventEmitter<boolean>;

  async componentWillLoad() {
    if (this.isLoggedIn) {
      await this.checkSubmission();
    }
  }

  @Watch('isLoggedIn')
  protected async onIsLoggedInChange(newValue: boolean) {
    if (newValue) {
      await this.checkSubmission();
    }
  }

  private async checkSubmission() {
    this.isSubmitted = null;
    try {
      const prevWeekDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const dom = await User.getTimesheet(prevWeekDate);
      const submitted = dom.querySelector('submitted')?.textContent === 'true';
      this.isSubmitted = submitted;
      this.timesheetSubmittedChange.emit(submitted);
    } catch {
      // Silent failure: leave isSubmitted as null so the banner stays hidden
    }
  }

  private openTJ = () => {
    window.open(Server.baseUrl, '_blank');
  };

  render() {
    if (!this.isLoggedIn || this.isSubmitted !== false) {
      return null;
    }

    return (
      <div class="unsubmittedBanner gradientBorder">
        <div class="unsubmittedContainer">
          <h4 class="unsubmittedHeader">Unsubmitted Timesheet</h4>
          <div class="unsubmittedContent">
            <span class="message">Your timesheet for last week is not submitted.</span>
            <button class="openButton" onClick={this.openTJ}>
              Open TJ
            </button>
          </div>
        </div>
      </div>
    );
  }
}
