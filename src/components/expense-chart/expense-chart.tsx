import { Component, h, Prop, Watch, Element } from '@stencil/core';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { ExpenseData } from '../../types';
// import { expenseStore } from '../../store/expense-store';

@Component({
  tag: 'expense-chart',
  styleUrl: 'expense-chart.css',
  shadow: true,
})
export class ExpenseChart {
  @Element() el: HTMLElement;
  @Prop() expenses : ExpenseData[];
 
  private chart: Chart;

  


  connectedCallback() {
    
    const canvasObserver = new MutationObserver(() => {
      const canvas = this.el.shadowRoot.querySelector('canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          this.renderChart(ctx);
          canvasObserver.disconnect();
        } else {
          console.error('Failed to get 2D context for canvas');
        }
      }
    });
  
    const shadowRoot = this.el.shadowRoot;
    if (shadowRoot) {
      canvasObserver.observe(shadowRoot, { childList: true, subtree: true });
      canvasObserver.observe(this.el, { childList: true, subtree: true });
    } else {
      console.error('Shadow root not found');
    }
  }
  

  @Watch('expenses')
expensesChanged() {
  if (this.chart) {
    this.chart.destroy();
  }
  const canvas = this.el.shadowRoot.querySelector('canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    this.renderChart(ctx);
  } else {
    console.error('Canvas element not found');
  }
}


  renderChart(ctx: CanvasRenderingContext2D) {

    const aggregatedData = this.expensesByMonth();
    const labels = Object.keys(aggregatedData).sort((a, b) => {
      const aDate = new Date(a);
      const bDate = new Date(b);
      return aDate.getTime() - bDate.getTime();
    });

    const datasets = this.createDatasets(aggregatedData);

    Chart.register(CategoryScale, LinearScale, BarController, BarElement);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: context => {
                const dataset = context.dataset;
                const value = dataset.data[context.dataIndex] as number;
                return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
              },
            },
          },
        },
      },
    });
  }

  expensesByMonth() {
    const aggregatedData: { [month: string]: { date: string; amount: number }[] } = {};

    for (const expense of this.expenses) {
      const [year, month] = expense.date.split('-');
      const formattedDate = `${year}-${month}`;

      if (!aggregatedData[formattedDate]) {
        aggregatedData[formattedDate] = [];
      }

      aggregatedData[formattedDate].push({ date: expense.date, amount: expense.amount });
    }

    return aggregatedData;
  }

  createDatasets(aggregatedData: { [month: string]: { date: string; amount: number }[] }) {
    const datasets = [];

    for (const month in aggregatedData) {
      const expenses = aggregatedData[month];
      const backgroundColors = this.getRandomColors(expenses.length);

      if (expenses.length > 0) {
        // Only create datasets for months with expenses
        for (let i = 0; i < expenses.length; i++) {
          const value = expenses[i].amount;

          const dataset = {
            label: `${month}-${i + 1}`,
            data: [{ x: month, y: value }],
            backgroundColor: backgroundColors[i],
          };

          datasets.push(dataset);
        }
      }
    }

    return datasets;
  }

  getRandomColors(count: number) {
    const colors = [];
    const letters = '0123456789ABCDEF';

    for (let i = 0; i < count; i++) {
      let color = '#';

      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      colors.push(color);
    }

    return colors;
  }

  render() {
    if (this.expenses.length > 0)
      return (
        <div>
          <h2>Stacked Bar of Monthly Expenses</h2>
          <div class="chart-container">
          <canvas ></canvas>
          </div>
          
        </div>
      );
  }
}
