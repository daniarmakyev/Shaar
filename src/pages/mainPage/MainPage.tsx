import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAtom } from "jotai";
import { buildingsFilterAtom } from "../../store/store";
import { usePlaces } from "../../hooks/queries/usePlaces";
//@ts-ignore
import "swiper/css";
import { IPlace } from "../../types/api.types";
import { Link } from "react-router-dom";
import star from "../../assets/images/icons/star.svg"
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
    places: IPlace[]
  ): Record<string, IPlace[]> => {
    if (!places) return {};
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
              className="sm:container mx-5 mt-[15px] mb-[19px]"
            >
              <h3 className="text-[#237B52] font-bold sm:text-[32px] text-[30px] md:text-[36px]">
                {t("category")}: {category}
              </h3>
              <Swiper
                slidesPerView="auto"
                spaceBetween={14}
                className="mt-[26px]"
              >
                {places.map((place) => (
                  <SwiperSlide
                    key={place.id}
                    className="min-w-32 max-w-[154px] w-full"
                  >
                    <Link to={`/map/${place.latitude + "/" + place.longitude}`}>
                      {" "}
                      <img
                        alt="place"
                        src={place.image_url}
                        className="rounded-[25px] w-full h-32 sm:h-[157px] object-cover"
                      />
                      <span className="absolute flex gap-1 flex-nowrap top-2 bg-white px-2 rounded-xl left-2 text-green-bg font-semibold">{place.rating}
                        <img src={star} alt="" />
                      </span>
                      <div className="justify-center flex gap-2 text-green-white">
                        {" "}
                        <span className="text-sm font-semibold text-nowrap text-green-bg">
                          {place.name}
                        </span>{" "}
                        <span className="text-sm font-medium">
                          {" "}
                          {category === "hotel"
                            ? `${place.price}/night`
                            : `${place.price}/dish`}
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MainPage;
