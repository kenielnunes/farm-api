import { Dashboard } from '../../domain/entities/dashboard';

export interface IDashboardRepository {
  getDashboard(): Promise<Dashboard>;
} 