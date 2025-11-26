import { PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Line, ComposedChart } from 'recharts';
import '../../assets/Style/GraphDesign/AdminGraph.css';

function AdminGraph() {
  const pieData = [
    { name: 'Monday', value: 15 },
    { name: 'Tuesday', value: 22 },
    { name: 'Wednesday', value: 18 },
    { name: 'Thursday', value: 25 },
    { name: 'Friday', value: 20 }
  ];

  const barData = [
    { month: 'Jan', revenue: 65, target: 60 },
    { month: 'Feb', revenue: 59, target: 65 },
    { month: 'Mar', revenue: 80, target: 75 },
    { month: 'Apr', revenue: 81, target: 80 },
    { month: 'May', revenue: 56, target: 70 },
    { month: 'Jun', revenue: 55, target: 65 },
    { month: 'Jul', revenue: 70, target: 75 },
    { month: 'Aug', revenue: 75, target: 80 },
    { month: 'Sep', revenue: 82, target: 85 },
    { month: 'Oct', revenue: 78, target: 80 },
    { month: 'Nov', revenue: 85, target: 85 },
    { month: 'Dec', revenue: 90, target: 95 }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          padding: '12px',
          borderRadius: '8px',
          color: 'white',
          fontSize: '13px',
        }}>
          <p className="label" style={{ margin: '0 0 8px 0' }}>{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              color: entry.color,
              margin: '4px 0',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: entry.color,
                borderRadius: '2px',
                marginRight: '8px'
              }}></span>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius="45%"
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index]} 
                    stroke={COLORS[index].replace('0.9', '1')}
                    strokeWidth={3}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{
                  paddingLeft: '20px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#374151'
                }}
                iconType="circle"
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
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
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={barData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(0, 0, 0, 0.08)"
                vertical={false}
              />
              <XAxis 
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 11, 
                  fontWeight: '500', 
                  fill: '#374151' 
                }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 11, 
                  fill: '#6b7280' 
                }}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top"
                wrapperStyle={{
                  paddingBottom: '20px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
                iconType="circle"
                iconSize={8}
              />
              <Bar 
                dataKey="revenue" 
                fill="rgba(16, 185, 129, 0.6)"
                stroke="rgba(16, 185, 129, 1)"
                strokeWidth={2}
                radius={[4, 4, 0, 0]}
                barSize={40}
                name="Revenue"
              />
              <Line 
                dataKey="target" 
                stroke="rgba(239, 68, 68, 1)"
                strokeWidth={3}
                dot={{
                  fill: "rgba(239, 68, 68, 1)",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 6
                }}
                activeDot={{
                  r: 8,
                  fill: "rgba(239, 68, 68, 1)",
                  stroke: "#fff",
                  strokeWidth: 2
                }}
                name="Target"
                strokeDasharray="0"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminGraph;