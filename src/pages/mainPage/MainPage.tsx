import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useAtom } from "jotai";
import arrow from "../../assets/images/icons/arrow-swiper.png";
import { buildingsFilterAtom } from "../../store/store";
import { usePlaces } from "../../hooks/queries/usePlaces";
import "swiper/css";
import "swiper/css/navigation";
import { IPlace } from "../../types/api.types";
import { Link } from "react-router-dom";
import star from "../../assets/images/icons/star.svg";

const MainPage: FC = () => {
  const { t } = useTranslation();
  const [buildingsFilter] = useAtom(buildingsFilterAtom);
  const [localFilter, setLocalFilter] = useState(buildingsFilter);

  const { data, refetch, isFetching } = usePlaces({
    rating: +localFilter.rating,
    price: 0,
    categories:
      localFilter.categories.length > 0
        ? localFilter.categories.map((elem) => +elem)
        : [],
  });

  useEffect(() => {
    if (buildingsFilter !== localFilter) {
      setLocalFilter(buildingsFilter);
    }
  }, [buildingsFilter]);

  const groupPlacesByCategory = (
    places: IPlace[] | undefined
  ): Record<string, IPlace[]> => {
    if (!Array.isArray(places)) return {};
    return places.reduce((acc, place) => {
      const category = place.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(place);
      return acc;
    }, {} as Record<string, IPlace[]>);
  };

  const allPlaces = data ? groupPlacesByCategory(data) : {};
  function ucFirst(str: string) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  }
  useEffect(() => {
    if (buildingsFilter !== localFilter) {
      refetch();
    }
  }, [localFilter, refetch]);

  return (
    <div className="relative pt-50 sm:pb-0 pb-28">
      <div className="container flex gap-3 sm:gap-10 absolute top-2 sm:relative sm:mt-9"></div>
      {isFetching ? (
        <div></div>
      ) : (
        Object.entries(allPlaces).map(([category, places]) => {
          if (
            buildingsFilter.categories.length > 0 &&
            buildingsFilter.categories[0] !== category
          ) {
            return null;
          }
          return (
            <div
              key={category}
              className="sm:container mt-[15px] mb-[19px] relative"
            >
              <h3 className="text-[#237B52] font-bold sm:text-[32px] text-[30px] md:text-[36px]">
                {ucFirst(category)}
              </h3>
              <Swiper
                slidesPerView="auto"
                spaceBetween={14}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[Navigation]}
                className="mt-[26px] -10"
              >
                <div className="mx-12">
                  {places.map((place) => (
                    <SwiperSlide
                      key={place.id}
                      className="min-w-32 max-w-[154px] w-full"
                    >
                      <Link
                        to={`/map/${place.latitude + "/" + place.longitude}`}
                      >
                        {" "}
                        <img
                          alt="place"
                          src={`${place.imageUrl}`}
                          className="rounded-[25px] w-full h-32 sm:h-[157px] object-cover"
                        />
                        <span className="absolute flex gap-1  ps-2 pe-1 flex-nowrap top-2 bg-white  rounded-xl left-2 text-green-bg font-semibold">
                          {place.rating}
                          <img src={star} alt="rayting star" />
                        </span>
                        <div className="justify-center flex gap-2 text-green-white">
                          {" "}
                          <span
                            className="text-sm font-semibold text-nowrap text-green-bg"
                            style={{ fontSize: "13px" }}
                          >
                            {place.name}
                          </span>{" "}
                          <span
                            className="font-medium"
                            style={{ fontSize: "13px" }}
                          >
                            {" "}
                            {category === "hotel"
                              ? `${place.price}${t("s")}/${t("nigth")}`
                              : `${place.price}${t("s")}/${t("dish")}`}
                          </span>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </div>
                <div className="swiper-button-next custom-next-button before:content-none after:content-none w-10 right-1">
                  <img src={arrow} alt="Next" />
                </div>
                <div className="swiper-button-prev custom-prev-button before:content-none after:content-none w-10 left-1">
                  <img src={arrow} alt="Next" className="rotate-180" />
                </div>
              </Swiper>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MainPage;
