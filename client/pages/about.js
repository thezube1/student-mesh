import Navbar from "../components/navbar/navbar";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div id="about-wrapper">
        <div id="about-content">
          <div className="title about-title">
            Why{" "}
            <span className="home-title-purple about-title">blockchain?</span>
          </div>
          <div className="text about-text">
            Blockchain technology is only beginning to be properly harnessed in
            all aspects of the internet. When it comes to storing student
            transcript data, being able to quickly and easily share data while
            maintaining authenticity is crucial.
          </div>

          <div className="text about-text">
            Student Mesh utilizes blockchain technology because of the
            advantages it provides. Firstly, on the blockchain recorded
            information cannot be alterred, meaning that no malicious user can
            change an already existing transcript.
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
