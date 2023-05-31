import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import ModalDetails from "./modals/ModalDetails";

const ContactList = ({ country, isEven }) => {
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null);
  const [show, setShow] = useState(false);

  console.log(selectedContact);

  const contactsPerPage = isEven ? 20 : 10;

  const baseURL = "https://contact.mediusware.com/api";

  const query = country
    ? `${baseURL}/country-contacts/${country}/?search=${searchInput}&page=${currentPage}&page_size=${contactsPerPage}`
    : `${baseURL}/contacts/?search=${searchInput}&page=${currentPage}&page_size=${contactsPerPage}`;

  const fetchMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchInput(e.target.value);
    }
  };

  useEffect(() => {
    const getContacts = async () => {
      const { data } = await axios.get(query);
      if (currentPage === 1) {
        setContacts(data.results);
      } else {
        setContacts((prevContacts) => [...prevContacts, ...data.results]);
      }
      setTotal(data.count);
    };

    getContacts();
  }, [currentPage, searchInput, isEven]);

  useEffect(() => {
    if (total > 0) {
      const more = Math.ceil(total / contactsPerPage) > currentPage;
      setHasMore(more);
    }
  }, [total, currentPage]);

  return (
    <div className="col-12">
      {/* search */}
      <div className="text-center mb-3">
        <input
          style={{ padding: "5px" }}
          placeholder="search contacts"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <InfiniteScroll
        dataLength={contacts?.length} //This is important field to render the next data
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={window.innerHeight - 500}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more contacts</b>
          </p>
        }
      >
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Phone</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {isEven
              ? contacts
                  ?.filter((contact) => contact.id % 2 === 0)
                  .map((contactItem) => {
                    return (
                      <tr
                        key={contactItem.id}
                        onClick={() => {
                          setSelectedContact(contactItem);
                          setShow(true);
                        }}
                      >
                        <td>{contactItem.id}</td>
                        <td>{contactItem.phone}</td>
                        <td>{contactItem.country.name}</td>
                      </tr>
                    );
                  })
              : contacts?.map((contactItem) => {
                  return (
                    <tr
                      key={contactItem.id}
                      onClick={() => {
                        setSelectedContact(contactItem);
                        setShow(true);
                      }}
                    >
                      <td>{contactItem.id}</td>
                      <td>{contactItem.phone}</td>
                      <td>{contactItem.country.name}</td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </InfiniteScroll>
      {selectedContact && (
        <ModalDetails
          contactItem={selectedContact}
          show={show}
          setShow={setShow}
        />
      )}
    </div>
  );
};

export default ContactList;
