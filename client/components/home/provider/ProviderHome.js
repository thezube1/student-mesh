import Navbar from "../../navbar/navbar";
import { useSelector } from "react-redux";

function ProviderHome() {
  const school = useSelector((state) => state.account.provider.school);
  return (
    <div>
      <Navbar />
      <div id="provider-wrapper">
        <div id="provider-title">
          <div className="title school-title">{school}</div>
          <div className="line school-line"></div>
        </div>
        <div className="pending-exchanges">
          <div className="title pending-exchanges-title">Pending Exchanges</div>
          <div>
            <div>Card</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderHome;
