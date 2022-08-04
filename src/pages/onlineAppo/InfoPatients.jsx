import "./appoint.css";

export const InfoPatients = ({ name, date, time, phone, reason }) => {
  return (
    <div className="listPatients">
      <div className="Patient">{name}</div>
      <div className="Patient">{date}</div>
      <div className="Patient">{time}</div>
      <div className="Patient">{phone}</div>
      <div className="Patient">{reason}</div>
    </div>
  );
};
