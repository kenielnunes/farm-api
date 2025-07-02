import { CultureDistribution, Dashboard, LandUseDistribution, StateDistribution } from 'src/modules/dashboard/domain/entities/dashboard';

describe('Entidade Dashboard', () => {
  it('deve criar um dashboard válido', () => {
    const byState = [new StateDistribution('SP', 10)];
    const byCulture = [new CultureDistribution('Soja', 1000)];
    const byLandUse = [new LandUseDistribution('Arable', 2000)];
    const dashboard = new Dashboard(5, 3000, byState, byCulture, byLandUse);
    expect(dashboard).toBeInstanceOf(Dashboard);
    expect(dashboard.totalFarms).toBe(5);
    expect(dashboard.totalHectares).toBe(3000);
    expect(dashboard.byState).toEqual(byState);
    expect(dashboard.byCulture).toEqual(byCulture);
    expect(dashboard.byLandUse).toEqual(byLandUse);
  });
});

describe('StateDistribution', () => {
  it('deve criar uma distribuição de estado válida', () => {
    const stateDist = new StateDistribution('MG', 7);
    expect(stateDist.state).toBe('MG');
    expect(stateDist.count).toBe(7);
  });
});

describe('CultureDistribution', () => {
  it('deve criar uma distribuição de cultura válida', () => {
    const cultureDist = new CultureDistribution('Milho', 500);
    expect(cultureDist.culture).toBe('Milho');
    expect(cultureDist.area).toBe(500);
  });
});

describe('LandUseDistribution', () => {
  it('deve criar uma distribuição de uso da terra válida', () => {
    const landUseDist = new LandUseDistribution('Vegetation', 1500);
    expect(landUseDist.type).toBe('Vegetation');
    expect(landUseDist.area).toBe(1500);
  });
}); 