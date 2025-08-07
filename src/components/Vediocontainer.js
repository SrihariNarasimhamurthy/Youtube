import React, { useEffect, useState } from "react";
import { YOUTUBE_VEDIO_API } from "../utils/constants";
import VedioCard from "./VedioCard";
import { Link } from "react-router-dom";

const Vediocontainer = () => {
  const [vedios, setVedios] = useState([]);
  useEffect(() => {
    getVedios();
  }, []);
  const getVedios = async () => {
    const data = await fetch(YOUTUBE_VEDIO_API);
    const json = await data.json();
    setVedios(json.items);
  };

  return (
    <div className="pt-28 px-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {vedios &&
          vedios.map((vedio) => (
            <Link key={vedio.id} to={"/watch?v=" + vedio.id}>
              <VedioCard info={vedio} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Vediocontainer;
