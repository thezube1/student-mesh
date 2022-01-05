import Navbar from "../../navbar/navbar";
import Link from "next/link";

function DefaultHome() {
  return (
    <div>
      <Navbar />
      <div id="wrapper">
        <div id="content">
          <div className="title">Student-Mesh</div>
          <div className="header">
            A distributed computing solution to storing student data
          </div>
          <Link href="/connect">
            <div className="button">Connect to Metamask</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DefaultHome;
