import { Component, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';

import { Server, User } from '@utils/tj';

import { BannerStateChangeEvent, BannerType } from '../footer/types';

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
   * Footer component uses this to track the banner state.
   */
  @Event()
  bannerStateChange: EventEmitter<BannerStateChangeEvent>;

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
      const prevWeekDate = new Date();
      prevWeekDate.setDate(prevWeekDate.getDate() - 7);
      const dom = await User.getTimesheet(prevWeekDate);
      const submitted = dom.querySelector('submitted')?.textContent === 'true';
      this.isSubmitted = submitted;
      this.bannerStateChange.emit({ type: BannerType.Unsubmitted, isActive: !submitted });
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
      <tj-banner>
        <h4 slot="header">Unsubmitted Timesheet</h4>
        <div slot="content">
          <p class="message">Your timesheet for last week is not submitted.</p>
        </div>
        <div slot="buttonArea">
          <button class="openButton" onClick={this.openTJ}>
            Open TJ
          </button>
        </div>
      </tj-banner>
    );
  }
}
