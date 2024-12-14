import { FC } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { tours } from "../../constants/term.data";
import { ITour } from "../../types/client.types";
import telIcon from "../../assets/images/icons/phone.svg";
import { useAtom } from "jotai";
import { tourOnMapAtom } from "../../store/store";
import { useTranslation } from "react-i18next";

// Типы для доступных языков
type Language = "en" | "ru" | "kg";

const TourPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [_, setTourOnMapAtom] = useAtom(tourOnMapAtom);
  const { t } = useTranslation();

  // Получаем текущий язык из localStorage (по ключу i18nextLng)
  const currentLang = (localStorage.getItem("i18nextLng") as Language) || "en"; // "en" по умолчанию

  // Поиск тура по ID
  const tour = tours.find((tour) => tour.id === +(id || 0)) as
    | ITour
    | undefined;

  if (!tour) {
    navigate("/error");
    return null;
  }

  const {
    name,
    description,
    schedule,
    contacts: { tel },
  } = tour;

  const tourName = name[currentLang] || name["en"]; // Добавляем fallback на английский
  const tourDescription = description[currentLang] || description["en"]; // Фоллбек на английский

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
            {t("tour.moreImages")}
          </h3>
          <div className="flex gap-[9px]">
            {schedule.slice(1).map(
              (
                {
                  location: {
                    images: [image],
                  },
                },
                key
              ) => (
                <img
                  key={key}
                  src={image}
                  alt="img"
                  className="rounded-[12px] w-[164px] h-[162px] object-cover object-center"
                />
              )
            )}
          </div>
          <h3 className="my-20 text-[32px] text-[#2C9765] font-bold">
            {t("tour.contacts")}
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
          <h1 className="text-[40px] text-[#237B52] font-bold">{tourName}</h1>
          <h2 className="text-[#237B52] text-[20px] font-bold">
            {t("tour.description")}
          </h2>
          <p>{tourDescription}</p>
          <h2 className="mt-20 text-[#237B52] text-[20px] font-bold">
            {t("tour.schedule")}
          </h2>
          {schedule.map(({ time: { start, end }, location: { name } }, key) => (
            <span key={key} className="block">
          
              {start} AM - {end} AM:    {
                //@ts-ignore
              } {name[currentLang] || name["en"]}{" "}
              {/* Фоллбек на английский */}
            </span>
          ))}
          <Link
            to={`/map/:latitude?/:longitude?/${id}`}
            onClick={() => setTourOnMapAtom(+id!)}
            className="mt-20 px-[64px] block w-fit btn font-bold text-[20px]"
          >
            {t("tour.viewOnMap")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourPage;
