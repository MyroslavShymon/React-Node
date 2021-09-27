import React from "react";
import { Link, LInk } from "react-router-dom";

const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="center">There is no links</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Original link</th>
          <th>Abbreviated link</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <button>
                <Link to={`/detail/${link._id}`}>Open</Link>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinksList;
