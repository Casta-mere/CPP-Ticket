export type Event = {
  id: number;
  eventId: number;
  positionStatus: number;
  ticketStatus: number;
  name: string;
  type: string;
  tag: string;
  enabled: number;
  logoPicUrl: string;
  appLogoPicUrl: string;
  priority: number;
  isExclusive: number;
  timeLeft: number;
  enterTime: number;
  endTime: number;
  wannaGoCount: number;
  circleCount: number;
  doujinshiCount: number;
  provName: string;
  cityName: string;
  areaName: string;
  enterAddress: string;
  ended: boolean;
  isOnline: number;
};
