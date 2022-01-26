import { useState } from "react";
import DownloadSVG from "./DownloadSVG";
import SearchSVG from "./SearchSVG";
import axios from "axios";
import fileDownload from "js-file-download";

function DownloadButtons(props) {
  const [downloading, setDownloading] = useState(undefined);

  const handleDownload = (cid) => {
    setDownloading(true);
    axios.get(`/api/request/${cid}`).then((res1) => {
      const name = res1.data[0]._name;

      axios
        .get(`https://${cid}.ipfs.dweb.link/${res1.data[0]._name}`, {
          responseType: "blob",
        })
        .then((res2) => {
          fileDownload(res2.data, name.replace("uploads_", ""));
          setDownloading(false);
        });
    });
  };
  return (
    <div className="exchange-buttons" style={{ display: "flex" }}>
      <button
        className="button"
        style={{
          marginRight: 20,
          display: "flex",
          alignItems: "center",
          padding: "10px 60px",
        }}
      >
        <div
          style={{
            position: "relative",
            right: 30,
            width: 1,
            bottom: 1,
          }}
        >
          <SearchSVG />
        </div>
        <span>View File</span>
      </button>
      <button
        className="button-primary"
        style={{ display: "flex", padding: "10px 40px" }}
        onClick={() => {
          handleDownload(props.data[0].location);
        }}
      >
        {downloading ? (
          <div id="provider-confirm-spinner"></div>
        ) : (
          <>
            <div
              style={{
                position: "relative",
                right: 18,
                width: 1,
                bottom: 2,
              }}
            >
              <DownloadSVG />
            </div>
            <span style={{ position: "relative", left: 5 }}>Download File</span>
          </>
        )}
      </button>
    </div>
  );
}

export default DownloadButtons;
