import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import ContactList from "../ContactList";

const ModalLayout = ({ country }) => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(true);
  const [isEvenChecked, setIsEvenChecked] = useState(false);

  return (
    <Modal
      show={modalShow}
      onHide={() => navigate("/problem-2")}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Contacts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-12">
          <ul className="nav nav-pills mb-2 justify-content-center">
            <li className="nav-item">
              <NavLink
                to="/all-contacts"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#46139f" : "white",
                  };
                }}
                className={({ isActive }) =>
                  `nav-link + ${isActive ? " active" : ""}`
                }
              >
                All Contacts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/us-contacts"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#ff7f50" : "white",
                  };
                }}
                className={({ isActive }) =>
                  `nav-link + ${isActive ? " active" : ""}`
                }
              >
                US Contacts
              </NavLink>
            </li>
          </ul>
          {/* contact list */}
          <ContactList country={country} isEven={isEvenChecked} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Form>
          <Form.Check
            label="show even ids"
            value="check"
            checked={isEvenChecked}
            onChange={() => setIsEvenChecked((prev) => !prev)}
          />
        </Form>
        <Button onClick={() => navigate("/problem-2")}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalLayout;
