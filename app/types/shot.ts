export interface Shot {
  club: string;
  index: number;
  ballSpeed: number;
  launchAngle: number;
  launchDir: number;
  spinRate: number | null;
  spinAxis: number | null;
  backSpin: number | null;
  sideSpin: number | null;
  carryDistance: number;
  totalDistance: number;
  offlineDistance: number;
  clubPath?: number | null;
  faceAngle?: number | null;
  attackAngle?: number | null;
  dynamicLoft?: number | null;
  filename: string;
  place: string;
  date: Date;
  timeSinceEpoch: number;
}
