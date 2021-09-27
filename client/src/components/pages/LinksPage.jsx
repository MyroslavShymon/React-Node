import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import LinksList from "../LinksList";
import Loader from "../Loader";

const LinksPage = () => {
  const [links, setLinks] = React.useState([]);
  const { loading, request } = useHttp();
  const { token } = React.useContext(AuthContext);

  const fetchLinks = React.useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer: ${token}`,
      });
      setLinks(fetched);
      console.log("links", links);
    } catch (error) {}
  }, [token, request]);

  React.useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) return <Loader />;

  return <>{!loading && <LinksList links={links} />}</>;
};

export default LinksPage;
