import Navbar from "../../navbar/navbar";
import WaveSVG from "../default/WaveSVG";
import Link from "next/link";
import { useEffect } from "react";

function DefaultHome() {
  useEffect(() => {
    document.body.style.backgroundColor = "#151515";
  }, []);
  useEffect(() => () => (document.body.style.backgroundColor = "white"), []);
  return (
    <div>
      <Navbar />
      <div id="wrapper">
        <div
          style={{
            position: "absolute",
            width: "100%",
            zIndex: -1,
            top: "30%",
            transform: "translateY(-50%)",
          }}
        >
          <WaveSVG />
        </div>
        <div id="content">
          <div className="home-center-content">
            <div className="title">
              <div className="home-title">Student</div>
              <div className="home-title-purple">Mesh</div>
            </div>
            <div className="vertical-line"></div>
            <div className="home-header">
              <div>A blockchain based student transcript sharing platform.</div>
              <div style={{ marginTop: 30 }}>
                <span className="primary-text">Secure</span>,{" "}
                <span className="primary-text">verifiable</span>, and{" "}
                <span className="primary-text">self-owned</span> student data.
              </div>
            </div>
          </div>

          <div className="home-button-wrapper">
            <Link href="/connect">
              <button className="button home-button">Connect Account</button>
            </Link>

            <button className="button home-button-secondary">
              How It Works
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultHome;
