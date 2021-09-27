import React from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

const CreatePage = () => {
  const history = useHistory();
  const auth = React.useContext(AuthContext);
  const [link, setLink] = React.useState("");
  const { request } = useHttp();

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      console.log(`Bearer ${auth.token}`);
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        history.push(`/detail/${data.link._id}`);
        console.log("data", data);
      } catch (error) {}
    }
  };

  React.useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Paste link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Enter link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
