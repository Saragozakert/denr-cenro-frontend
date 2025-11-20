import "../../assets/Style/CardDesign/UserCards.css";

function UserCards({ cards, onCardClick }) {
  const getTrendText = (trend, count, thisMonth) => {
    const difference = count - thisMonth;
    if (trend === "positive") return `+${difference} from last month`;
    if (trend === "negative") return `-${Math.abs(difference)} from last month`;
    return `No change from last month`;
  };

  return (
    <div className="user-dashboard-grid">
      {cards.map((card, index) => {
        const cardType = card.colorType;
        
        return (
          <div 
            key={index} 
            className={`user-dashboard-card ${cardType}`}
            onClick={() => onCardClick(card.title.toLowerCase(), card.path)}
          >
            <div className="user-card-header">
              <h3 className="user-card-title">{card.title}</h3>
              <div className="user-card-icon">
                {card.icon}
              </div>
            </div>

            <div className="user-card-content">
              <div className="user-card-main-value">{card.count}</div>
              <div className="user-card-main-label">Total Count</div>
              
              <div className="user-status-indicator">
                <div className={`user-status-dot user-status-${cardType}`}></div>
                <span className={`user-status-text user-status-${cardType}`}>
                  {getTrendText(card.trend, card.count, card.thisMonth)}
                </span>
              </div>
            </div>

            <div className="user-card-comparison">
              <div className="user-comparison-item">
                <span className="user-comparison-label">This Month</span>
                <span className="user-comparison-value">{card.thisMonth}</span>
              </div>
              
              <div className="user-comparison-item">
                <span className="user-comparison-label">Status</span>
                <div className={`user-comparison-badge user-badge-${cardType}`}>
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

export default UserCards;