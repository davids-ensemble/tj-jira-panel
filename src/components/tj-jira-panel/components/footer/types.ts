export enum BannerType {
  Unsubmitted = 'unsubmitted',
  PanelUpdate = 'panel-update',
}

export interface BannerStateChangeEvent {
  type: BannerType;
  isActive: boolean;
}
