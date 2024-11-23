import { FC, useEffect } from "react";
import weatherImage from "../../assets/images/weather.png";
import airQualityImage from "../../assets/images/air-quality.png";
import { IPlace } from "../../types/api.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePlaces } from "../../hooks/queries/usePlaces";
// @ts-ignore
import "swiper/css";
import { useAtom } from "jotai";
import { buildingsFilterAtom } from "../../store/store";

const MainPage: FC = () => {
  // const { data: airInfo } = useQuery({
  //   queryKey: [queryKeys.AirQuality],
  //   queryFn: () => aiQualityService.getInfo(),
  //   select: ({ data }) => data,
  // });

  const [buildingsFilter] = useAtom(buildingsFilterAtom);

  const { data, refetch } = usePlaces({
    rating: +buildingsFilter.rating,
    min_price: buildingsFilter.price[0] + "",
    max_price: buildingsFilter.price[1] + "",
    category: buildingsFilter.categories.map((elem) => +elem),
  });

  useEffect(() => {
    console.log(buildingsFilter);
    refetch();
  }, [buildingsFilter]);

  const groupPlacesByCategory = (
    places: IPlace[]
  ): Record<string, IPlace[]> => {
    return places?.reduce((acc, place) => {
      place.categories.forEach((category) => {
        if (!acc[category.name]) {
          acc[category.name] = [];
        }
        acc[category.name].push(place);
      });
      return acc;
    }, {} as Record<string, IPlace[]>);
  };

  const allPlaces = groupPlacesByCategory(data!);

  return (
    <div className="relative pt-50">
      <div className="container flex gap-3 sm:gap-10 absolute top-2 sm:relative sm:mt-9">
        <div className="flex h-16 relative w-36 sm:w-44 shadow-md rounded-r-2xl">
          <h3
            className="bg-[#55B0FF] text-white py-4 px-2 text-2xl sm:text-3xl font-bold rounded-s-xl rounded-r-[150px] z-[2] text-gray-800"
            style={{
              textShadow:
                "0px 1px 2px 0px #0000001A, 2px 4px 4px 0px #00000017",
            }}
          >
            °03
          </h3>
          <div
            className="absolute h-16 right-0 w-[80%] rounded-r-2xl"
            style={{
              background:
                "linear-gradient(89.83deg, #1A90F7 0.14%, #1572C3 71.56%, #0F5491 99.86%)",
            }}
          >
            <span>
              <img src={weatherImage} alt="weather" className="-mt-2 -ms-4" />
            </span>
          </div>
        </div>
        <div className="flex h-16 relative w-36 sm:w-44 shadow-md rounded-r-2xl">

          <h3 className=" bg-[#33BC7C] py-4 px-3 text-2xl sm:text-3xl font-bold rounded-s-xl w-[73px] rounded-r-[150px] z-10 text-white [text-shadow:_10px_10px_50px_#000]">
            69
          </h3>
          <div
            className="absolute h-16 right-0 w-[80%] rounded-r-2xl"
            style={{
              background:
                "linear-gradient(89.99deg, #43BB83 0.01%, #3CA976 17.41%, #2E825A 88.89%, #1E553C 99.99%)",
            }}
          >
            <span>
              {" "}
              <img
                src={airQualityImage}
                alt="weater icon"
                className="-mt-3 ms-4 sm:-mt-9 sm:ms-6"
              />
            </span>
          </div>
        </div>
      </div>
      {allPlaces &&
        Object.entries(allPlaces).map(([ctg, places]) => (
          <div key={ctg} className="sm:container mx-5 mt-[15px] mb-[19px]">
            <h3 className="text-[#237B52] font-bold sm:text-[32px] text-[30px] md:text-[36px]">{ctg}</h3>
            <Swiper
              slidesPerView="auto"
              spaceBetween={14}
              className="mt-[26px]"
            >
              {places.map((place) => (
                <SwiperSlide className="max-w-32 sm:max-w-[154px] w-full ">
                  <img
                    alt="place"
                    src={place.images?.[0].image}
                    className="rounded-[25px] h-32 sm:h-[157px] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
    </div>
  );
};

export default MainPage;
