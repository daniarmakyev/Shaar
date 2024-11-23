import { FC } from "react";
import { tours } from "../../constants/term.data";
import { Link } from "react-router-dom";

const ToursPage: FC = () => {
  return (
    <>
      <div className="pt-[114px]">
        <div className="mb-30 h-[1px] bg-[#ABAAAA]"></div>
        <div className="container mt-[11px]">
          <h3 className="text-[#237B52] text-[32px] font-bold">City Tours</h3>
          <div>
            {tours.map(
              ({
                id,
                name,
                schedule: [
                  {
                    location: {
                      images: [image],
                    },
                  },
                ],
              }) => (
                <Link to={`/tours/${id}`}>
                  <img
                    src={image}
                    alt="img"
                    className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                  />
                  <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold">
                    {name}
                  </h4>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToursPage;
