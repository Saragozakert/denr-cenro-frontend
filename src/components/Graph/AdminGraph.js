import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import '../../assets/Style/GraphDesign/AdminGraph.css';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function AdminGraph() {
  // Enhanced Pie Chart Data with real-time data simulation
  const pieData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        data: [15, 22, 18, 25, 20],
        backgroundColor: [
          'rgba(16, 185, 129, 0.9)',
          'rgba(59, 130, 246, 0.9)',
          'rgba(245, 158, 11, 0.9)',
          'rgba(239, 68, 68, 0.9)',
          'rgba(139, 92, 246, 0.9)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 3,
        hoverBorderWidth: 4,
        hoverOffset: 15,
        spacing: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            weight: '500',
          },
          color: '#374151'
        },
      },
      title: {
        display: true,
        text: 'Weekly Activity Distribution',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#111827',
        padding: {
          bottom: 25,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    cutout: '45%',
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  // Enhanced Bar Chart with gradient effects
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55, 70, 75, 82, 78, 85, 90],
        backgroundColor: (context) => {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.8)');
          return gradient;
        },
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        borderRadius: 12,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
      {
        label: 'Target',
        data: [60, 65, 75, 80, 70, 65, 75, 80, 85, 80, 85, 95],
        type: 'line',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: '500',
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Monthly Performance Overview',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#111827',
        padding: {
          bottom: 25,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6b7280',
          padding: 8,
        },
        border: {
          dash: [4, 4],
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: '500',
          },
          color: '#374151',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="charts-container">
      <div className="chart-card">
        <div className="chart-header">
          <h3>Weekly Distribution</h3>
          <div className="chart-actions">
            <button className="chart-btn active">Week</button>
            <button className="chart-btn">Month</button>
          </div>
        </div>
        <div className="chart-wrapper">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      
      <div className="chart-card">
        <div className="chart-header">
          <h3>Annual Performance</h3>
          <div className="chart-actions">
            <button className="chart-btn active">2025</button>
            <button className="chart-btn">2026</button>
          </div>
        </div>
        <div className="chart-wrapper">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default AdminGraph;