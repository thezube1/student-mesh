import { useState, useEffect } from "react";
import DownloadSVG from "./DownloadSVG";
import SearchSVG from "./SearchSVG";
import axios from "axios";
import fileDownload from "js-file-download";
import Modal from "../../components/modal/Modal";

function DownloadButtons(props) {
  const [downloading, setDownloading] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [fileLink, setFileLink] = useState("");
  const handleDownload = async (cid) => {
    setDownloading(true);
    const name_res = await axios.get(`/api/request/file/${cid}`);
    const name = String(name_res.data.name);
    const file = await axios.get(`https://${cid}.ipfs.dweb.link/${name}`, {
      responseType: "blob",
    });
    fileDownload(file.data, name.replace("uploads_", ""));
    setDownloading(false);
  };

  useEffect(async () => {
    const cid = props.data[0].cid;
    const name_res = await axios.get(`/api/request/file/${cid}`);
    const name = String(name_res.data.name);
    setFileLink(`https://${cid}.ipfs.dweb.link/${name}`);
  }, []);
  console.log(fileLink);
  return (
    <>
      <Modal open={open} close={() => setOpen(false)} title="File Preview">
        <iframe
          src={fileLink}
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      </Modal>
      <div className="exchange-buttons" style={{ display: "flex" }}>
        <button
          className="button"
          style={{
            marginRight: 20,
            display: "flex",
            alignItems: "center",
            padding: "10px 60px",
          }}
          onClick={() => setOpen(true)}
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
            handleDownload(props.data[0].cid);
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
              <span style={{ position: "relative", left: 5 }}>
                Download File
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
}

export default DownloadButtons;
