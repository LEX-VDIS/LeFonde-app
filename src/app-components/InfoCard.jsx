import "./InfoCard.css";

export default function InfoCard({ icon, label, value }) {
  return (
    <div className="infoCard">
      <div className="infoCard-icon-container">
        <span className="icon material-symbols-rounded infoCard-icon">
          {icon}
        </span>
      </div>
      <div className="infoCard-text-container">
        <label className="text-key">{label}</label>
        <label className="text-value">{value}</label>
      </div>
    </div>
  );
}
