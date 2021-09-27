import React from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import LinkCard from "../LinkCard";
import Loader from "../Loader";

const DetailPage = () => {
  const { token } = React.useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = React.useState(null);
  const linkId = useParams().id;

  const getLink = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched);
    } catch (error) {}
  }, [token, linkId, request]);

  React.useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};

export default DetailPage;
