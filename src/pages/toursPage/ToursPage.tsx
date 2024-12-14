import { FC } from "react";
import { tours } from "../../constants/term.data";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Language = "en" | "ru" | "kg";

const ToursPage: FC = () => {
  const { t } = useTranslation();

  const currentLang = (localStorage.getItem("i18nextLng") as Language) || "en";

  return (
    <div className="pt-[114px]">
      <div className="mb-30 h-[1px] bg-[#ABAAAA]"></div>
      <div className="container mt-[11px]">
        <h3 className="text-[#237B52] text-[32px] font-bold">
          {t("tour.title")}
        </h3>
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
            }) => {
              const tourName = name[currentLang] || name["en"];
              return (
                <>
                  <h2 className="font-medium">Сложность легкая </h2>
                  <div className="flex gap-3 mt-3 mb-3">
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>{" "}
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>
                  </div>
                  <h2 className="font-medium mt-3 mb-3">Сложность средняя</h2>{" "}
                  <div className="flex gap-3">
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>{" "}
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>
                  </div>
                  <h2 className="font-medium mt-3 mb-3">Сложность сложная</h2>{" "}
                  <div className="flex gap-3">
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>{" "}
                    <Link
                      to={`/tours/${id}`}
                      key={id}
                      className="flex flex-col  text-center max-w-36"
                    >
                      <img
                        src={image}
                        alt="img"
                        className="rounded-[25px] w-[150px] h-[150px] object-cover object-center"
                      />
                      <h4 className="mt-[4px] text-[13px] text-[#2C9765] font-bold self-centers">
                        Центр
                      </h4>
                    </Link>
                  </div>
                </>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default ToursPage;
