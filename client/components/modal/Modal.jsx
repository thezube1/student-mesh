import Modal from "react-modal";

function ModalGroup(props) {
  return (
    <Modal
      isOpen={props.open}
      onRequestClose={props.close}
      contentLabel="Example Modal"
      overlayClassName={"modal-overlay"}
      className={"modal"}
    >
      <button className="modal-close" onClick={props.close}>
        <div className="modal-close-line modal-line-1"></div>
        <div className="modal-close-line modal-line-2"></div>
      </button>
      {props.children}
    </Modal>
  );
}

export default ModalGroup;
