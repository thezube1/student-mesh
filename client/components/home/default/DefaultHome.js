import Navbar from "../../navbar/navbar";
import WaveSVG from "./WaveSVG";
import Wave2SVG from "./Wave2SVG";
import DistributedSVG from "./DistributedSVG";
import Link from "next/link";
import { useEffect } from "react";
import * as Scroll from "react-scroll";

function DefaultHome() {
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
            <div className="title title-white">
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
            <Scroll.Link to="home-wrapper-2" smooth={true}>
              <button className="button home-button-secondary">
                How It Works
              </button>
            </Scroll.Link>
          </div>
        </div>
      </div>
      <div id="home-wrapper-2">
        <div
          style={{
            display: "flex",
            gap: 100,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "grid", justifyItems: "center" }}>
            <div
              className="title title-white home2-header"
              style={{ fontSize: 35 }}
            >
              Transcripts are recorded to the Ethereum blockchain, meaning:
            </div>
            <div className="title title-white  home2-header">
              Transcripts are <span className="primary-text">immutable</span>{" "}
            </div>
            <div className="title  title-white home2-header">
              They are publicly <span className="primary-text">verifiable</span>{" "}
            </div>
            <div className="title title-white  home2-header">
              Each transcript is{" "}
              <span className="primary-text">user-controlled</span>{" "}
            </div>{" "}
          </div>
          <div style={{ maxWidth: 400, width: "90%", marginBottom: 50 }}>
            <DistributedSVG />
          </div>
        </div>
        {/* <div>
          <div className="title home2-sub-header">
            Students choose who gets to see their transcripts, and what happens
            to them
          </div>
          <div className="title home2-sub-header">
            Schools are no longer required to store transcripts and retreive
            them on request
          </div>
        </div>*/}

        <div
          style={{
            position: "absolute",
            zIndex: -1,
            transform: "translateY(-50%)",

            top: "80%",
            width: "100%",
          }}
        >
          <Wave2SVG />
        </div>
      </div>
    </div>
  );
}

export default DefaultHome;
