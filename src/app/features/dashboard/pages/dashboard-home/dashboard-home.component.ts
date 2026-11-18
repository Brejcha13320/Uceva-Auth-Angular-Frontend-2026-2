import { Component, signal } from '@angular/core';

interface DashboardStat {
  title: string;
  value: string;
  description: string;
  icon: string;
  variation: string;
  positive: boolean;
}

interface RecentActivity {
  description: string;
  reference: string;
  date: string;
  amount: string;
  status: 'Completado' | 'Pendiente' | 'Cancelado';
}

interface MonthlySale {
  month: string;
  value: number;
}

@Component({
  selector: 'app-dashboard-home.component',
  imports: [],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent {
  
  userName = signal('Jesús David');

  stats = signal<DashboardStat[]>([
    {
      title: 'Ventas totales',
      value: '$24.500.000',
      description: 'Respecto al mes anterior',
      icon: 'bi-graph-up-arrow',
      variation: '+12.5%',
      positive: true
    },
    {
      title: 'Compras totales',
      value: '$12.800.000',
      description: 'Respecto al mes anterior',
      icon: 'bi-cart-check',
      variation: '+8.2%',
      positive: true
    },
    {
      title: 'Productos',
      value: '1.250',
      description: 'Productos registrados',
      icon: 'bi-box-seam',
      variation: '+5.4%',
      positive: true
    },
    {
      title: 'Clientes',
      value: '348',
      description: 'Clientes registrados',
      icon: 'bi-people',
      variation: '+3.1%',
      positive: true
    }
  ]);

  monthlySales = signal<MonthlySale[]>([
    { month: 'Ene', value: 45 },
    { month: 'Feb', value: 62 },
    { month: 'Mar', value: 55 },
    { month: 'Abr', value: 78 },
    { month: 'May', value: 65 },
    { month: 'Jun', value: 90 },
    { month: 'Jul', value: 72 },
    { month: 'Ago', value: 85 },
    { month: 'Sep', value: 68 },
    { month: 'Oct', value: 95 },
    { month: 'Nov', value: 80 },
    { month: 'Dic', value: 100 }
  ]);

  recentActivities = signal<RecentActivity[]>([
    {
      description: 'Compra de productos',
      reference: 'COM-00125',
      date: '11 Nov, 2026',
      amount: '$1.250.000',
      status: 'Completado'
    },
    {
      description: 'Venta de productos',
      reference: 'VEN-00458',
      date: '11 Nov, 2026',
      amount: '$850.000',
      status: 'Completado'
    },
    {
      description: 'Nueva compra registrada',
      reference: 'COM-00124',
      date: '10 Nov, 2026',
      amount: '$2.400.000',
      status: 'Pendiente'
    },
    {
      description: 'Venta de productos',
      reference: 'VEN-00457',
      date: '10 Nov, 2026',
      amount: '$540.000',
      status: 'Cancelado'
    }
  ]);

  getBarHeight(value: number): string {
    return `${value}%`;
  }

}
