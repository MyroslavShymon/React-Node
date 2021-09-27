import React from "react";

const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>
        Your link:
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          &nbsp; {link.to}
        </a>
      </p>
      <p>
        Link from:
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          &nbsp; {link.from}
        </a>
      </p>
      <p>
        Count of clicks to the link: &nbsp; <strong>{link.clicks}</strong>
      </p>
      <p>
        Date of creation: &nbsp;
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};

export default LinkCard;
