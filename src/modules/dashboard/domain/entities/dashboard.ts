export class Dashboard {
  constructor(
    public readonly totalFarms: number,
    public readonly totalHectares: number,
    public readonly byState: StateDistribution[],
    public readonly byCulture: CultureDistribution[],
    public readonly byLandUse: LandUseDistribution[],
  ) { }
}

export class StateDistribution {
  constructor(
    public readonly state: string,
    public readonly count: number,
  ) { }
}

export class CultureDistribution {
  constructor(
    public readonly culture: string,
    public readonly area: number,
  ) { }
}

export class LandUseDistribution {
  constructor(
    public readonly type: string,
    public readonly area: number,
  ) { }
} 