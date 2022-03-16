import Navbar from "../components/navbar/navbar";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div id="about-wrapper">
        <div id="about-content">
          <div className="title">
            Why{" "}
            <span className="home-title-purple" style={{ fontSize: 100 }}>
              blockchain?
            </span>
          </div>
          <div className="text">
            Blockchain technology is only beginning to be properly harnessed by
            all aspects of the internet.
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
