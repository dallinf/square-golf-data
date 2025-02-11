export interface Shot {
  club: string;
  index: number;
  ballSpeed: number;
  carryDistance: number;
  totalDistance: number;
  offlineDistance: number;
  filename: string;
  place: string;
  date: Date;
  timeSinceEpoch: number;
}
