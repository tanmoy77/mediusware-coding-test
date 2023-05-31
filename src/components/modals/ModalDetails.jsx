import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalDetails = ({ contactItem, show, setShow }) => {
  const handleClose = () => {
    setShow((prev) => !prev);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          #{contactItem.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-12">
          <p>phone : {contactItem?.phone}</p>
          <p>country: {contactItem?.country?.name}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetails;
