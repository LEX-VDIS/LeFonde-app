import "./InfoLinkCard.css";

export default function InfoLinkCard({ icon, label, value, }) {
  return (
    <div className="InfoLinkCard">
      <div className="InfoLinkCard-icon-container">
        <span className="icon material-symbols-rounded InfoLinkCard-icon">
          {icon}
        </span>
      </div>
      <div className="InfoLinkCard-text-container">
        <label className="InfoLinkCard-text-key">{label}</label>
        <label className="InfoLinkCard-text-value">{value}</label>
      </div>
    </div>
  );
}
