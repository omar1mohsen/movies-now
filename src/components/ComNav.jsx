import React from "react";
import { Link } from "react-router-dom";

const ComNav = () => {
  return (
    <>
      <header>
        <div className="flex items-center space-x-2 md:space-x-10 ">
          <Link to="/">
            <img
              src="https://vignette.wikia.nocookie.net/logopedia/images/e/e3/Movies_Now.png/revision/latest?cb=20110930233017"
              alt="website logo"
              width={100}
              height={100}
              className="cursor-pointer object-contain"
            />
          </Link>
        </div>
      </header>
    </>
  );
};

export default ComNav;
