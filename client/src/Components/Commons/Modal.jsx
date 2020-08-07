import React from "react";

const Modal = ({modalTitle, modalBodyContents, modalFooter,closeModal,confirmAction }) => {
  return (
    <>
      <section className="modal-container">
        <section className="modal">
          <div className="modal-header">
            <h1>{modalTitle}</h1>
            <h1 onClick={closeModal} className="close-modal">x</h1>
          </div>
          <div className="modal-body">
            <p>
              {modalBodyContents}
            </p>
          </div>
          <div className="modal-footer">
              <button onClick={confirmAction}>Yes</button>
              <button onClick={closeModal}>No</button>
          </div>
        </section>
      </section>
    </>
  );
};
export default Modal;
