import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { tours } from "../../constants/term.data";
import { ITour } from "../../types/client.types";
import telIcon from "../../assets/images/icons/phone.svg";
import { useAtom } from "jotai";
import { tourOnMapAtom } from "../../store/store";

const TourPage: FC = () => {
  const { id } = useParams();
  const [_, setTourOnMapAtom] = useAtom(tourOnMapAtom);

  const {
    schedule,
    contacts: { tel },
    name,
    description,
  } = tours.find((tour) => tour.id === +(id || 0)) as unknown as ITour;

  return (
    <div className="pt-[48px]">
      <div className="container rounded-[14px] pt-[34px] pb-[38px] bg-white flex gap-[58px]">
        <div className="flex-[0_0_507px]">
          <img
            src={schedule[0].location.images[0]}
            alt="img"
            className="rounded-[12px] w-[507px] h-[290px]"
          />
          <h3 className="my-20 text-[32px] text-[#2C9765] font-bold">
            More Images
          </h3>
          <div className="flex gap-[9px]">
            {schedule.slice(1).map(
              ({
                location: {
                  images: [image],
                },
              }) => (
                <img
                  src={image}
                  alt="img"
                  className="rounded-[12px] w-[164px] h-[162px] object-cover object-center"
                />
              )
            )}
          </div>
          <h3 className="my-20 text-[32px] text-[#2C9765] font-bold">
            Contacts
          </h3>
          <div className="flex gap-[15px] items-center">
            <img src={telIcon} alt="phone" />
            <a
              href={`tel:${tel.replace(/ /g, "")}`}
              className="text-[24px] text-[#149659] font-bold"
            >
              {tel}
            </a>
          </div>
        </div>
        <div>
          <h1 className="text-[40px] text-[#237B52] font-bold">{name}</h1>
          <h2 className="text-[#237B52] text-[20px] font-bold">Описание</h2>
          <p>{description}</p>
          <h2 className="mt-20 text-[#237B52] text-[20px] font-bold">График</h2>
          {schedule.map(({ time: { start, end }, location: { name } }, key) => (
            <span key={key} className="block">
              {start} AM - {end} AM: {name}
            </span>
          ))}
          <Link
            to="/map"
            onClick={() => setTourOnMapAtom(+id!)}
            className="mt-20 px-[64px] block w-fit btn font-bold text-[20px]"
          >
            Посмотреть тур в картах
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourPage;
