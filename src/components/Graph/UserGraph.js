import { PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Line, ComposedChart } from 'recharts';
import '../../assets/Style/GraphDesign/UserGraph.css';

function UserGraph() {
  const pieData = [
    { name: 'Diesel', value: 35 },
    { name: 'Gasoline', value: 25 },
    { name: 'Premium', value: 20 },
    { name: 'Bio-Diesel', value: 12 },
    { name: 'Others', value: 8 }
  ];

  const budgetData = [
    { month: 'Jan', budget: 10000, spent: 6500, remaining: 3500 },
    { month: 'Feb', budget: 10000, spent: 7200, remaining: 2800 },
    { month: 'Mar', budget: 10000, spent: 5800, remaining: 4200 },
    { month: 'Apr', budget: 10000, spent: 8100, remaining: 1900 },
    { month: 'May', budget: 10000, spent: 6900, remaining: 3100 },
    { month: 'Jun', budget: 10000, spent: 7500, remaining: 2500 },
    { month: 'Jul', budget: 10000, spent: 8200, remaining: 1800 },
    { month: 'Aug', budget: 10000, spent: 7800, remaining: 2200 },
    { month: 'Sep', budget: 10000, spent: 7100, remaining: 2900 },
    { month: 'Oct', budget: 10000, spent: 6800, remaining: 3200 },
    { month: 'Nov', budget: 10000, spent: 7400, remaining: 2600 },
    { month: 'Dec', budget: 10000, spent: 7900, remaining: 2100 }
  ];

  const fuelEfficiencyData = [
    { name: 'Vehicle A', efficiency: 12.5 },
    { name: 'Vehicle B', efficiency: 15.2 },
    { name: 'Vehicle C', efficiency: 9.8 },
    { name: 'Vehicle D', efficiency: 11.3 },
    { name: 'Vehicle E', efficiency: 14.1 }
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
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p className="label" style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{`${label}`}</p>
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
              {`${entry.name}: ${entry.value}${entry.name.includes('efficiency') ? ' km/L' : 
                entry.name.includes('budget') ? ' ₱' : 
                entry.name.includes('spent') ? ' ₱' : 
                entry.name.includes('remaining') ? ' ₱' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-container">
      {/* First Chart - Fuel Type Distribution (Pie Chart) */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Fuel Type Distribution</h3>
          <div className="chart-actions">
            <button className="chart-btn active">This Month</button>
            <button className="chart-btn">Last Month</button>
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
      
      {/* Second Chart - Budget Remaining (Composed Chart) */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Budget Remaining Overview</h3>
          <div className="budget-summary">
            <span className="budget-badge budget-total">Total: ₱120,000</span>
            <span className="budget-badge budget-spent">Spent: ₱86,400</span>
            <span className="budget-badge budget-remaining">Remaining: ₱33,600</span>
          </div>
          <div className="chart-actions">
            <button className="chart-btn active">2026</button>
            <button className="chart-btn">2027</button>
          </div>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={budgetData}>
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
                tickFormatter={(value) => `₱${value/1000}k`}
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
                dataKey="spent" 
                fill="rgba(239, 68, 68, 0.6)"
                stroke="rgba(239, 68, 68, 1)"
                strokeWidth={2}
                radius={[4, 4, 0, 0]}
                barSize={30}
                name="Spent Amount"
              />
              <Bar 
                dataKey="remaining" 
                fill="rgba(16, 185, 129, 0.6)"
                stroke="rgba(16, 185, 129, 1)"
                strokeWidth={2}
                radius={[4, 4, 0, 0]}
                barSize={30}
                name="Remaining Budget"
              />
              <Line 
                dataKey="budget" 
                stroke="rgba(59, 130, 246, 1)"
                strokeWidth={3}
                dot={{
                  fill: "rgba(59, 130, 246, 1)",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 6
                }}
                activeDot={{
                  r: 8,
                  fill: "rgba(59, 130, 246, 1)",
                  stroke: "#fff",
                  strokeWidth: 2
                }}
                name="Total Budget"
                strokeDasharray="0"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Optional Third Chart - Fuel Efficiency (Bar Chart) */}
      <div className="chart-card full-width">
        <div className="chart-header">
          <h3>Vehicle Fuel Efficiency</h3>
          <div className="chart-actions">
            <button className="chart-btn active">km/L</button>
            <button className="chart-btn">L/100km</button>
          </div>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={fuelEfficiencyData} layout="vertical">
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(0, 0, 0, 0.08)"
                horizontal={false}
              />
              <XAxis 
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 11, 
                  fill: '#6b7280' 
                }}
                domain={[0, 20]}
              />
              <YAxis 
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 11, 
                  fontWeight: '500', 
                  fill: '#374151' 
                }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="efficiency" 
                fill="rgba(139, 92, 246, 0.6)"
                stroke="rgba(139, 92, 246, 1)"
                strokeWidth={2}
                radius={[0, 4, 4, 0]}
                barSize={20}
                name="Fuel Efficiency (km/L)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default UserGraph;