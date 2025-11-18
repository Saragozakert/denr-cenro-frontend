import "../../assets/Style/CardDesign/AdminCards.css";

function AdminCards({ cards, onCardClick }) {
  const getTrendText = (trend, count, thisMonth) => {
    const difference = count - thisMonth;
    if (trend === "positive") return `+${difference} from last month`;
    if (trend === "negative") return `-${Math.abs(difference)} from last month`;
    return `No change from last month`;
  };

  return (
    <div className="dashboard-grid">
      {cards.map((card, index) => {
        const cardType = card.colorType;
        
        return (
          <div 
            key={index} 
            className={`dashboard-card ${cardType}`}
            onClick={() => onCardClick(card.title.toLowerCase(), card.path)}
          >
            <div className="card-header">
              <h3 className="card-title">{card.title}</h3>
              <div className="card-icon">
                {card.icon}
              </div>
            </div>

            <div className="card-content">
              <div className="card-main-value">{card.count}</div>
              <div className="card-main-label">Total Count</div>
              
              <div className="status-indicator">
                <div className={`status-dot status-${cardType}`}></div>
                <span className={`status-text status-${cardType}`}>
                  {getTrendText(card.trend, card.count, card.thisMonth)}
                </span>
              </div>
            </div>

            <div className="card-comparison">
              <div className="comparison-item">
                <span className="comparison-label">This Month</span>
                <span className="comparison-value">{card.thisMonth}</span>
              </div>
              
              <div className="comparison-item">
                <span className="comparison-label">Status</span>
                <div className={`comparison-badge badge-${cardType}`}>
                  {card.trend === "positive" ? "On Track" : 
                   card.trend === "warning" ? "Attention" : 
                   card.trend === "negative" ? "Needs Review" : "Stable"}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminCards;