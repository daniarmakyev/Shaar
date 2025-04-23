import { FC, useCallback, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import filterIcon from "../../assets/images/icons/filter.svg";
import starIcon from "../../assets/images/icons/star.svg";
import arrow from "../../assets/images/icons/arrow-green.svg";
import clsx from "clsx";
import { useAtom } from "jotai";
import { buildingsFilterAtom } from "../../store/store";
import { RatingsType } from "../../types/client.types";
import Slider from "@mui/material/Slider";
import { debounce } from "@mui/material";
import { useClickAway } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/api";
import placesService from "../../services/places.service";
import { useTranslation } from "react-i18next";

const RATINGS: RatingsType[] = [5.0, 4.5, 4.0, 3.5, 3.0];

const Filter: FC = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [buildingFilter, setBuildingFilter] = useAtom(buildingsFilterAtom);
  const [pricesLocal, setPricesLocal] = useState([0, 0]);
  const [radiusLocal, setRadiusLocal] = useState([0, 0]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const { categories } = buildingFilter;

  const { data: categoriesData = [] } = useQuery({
    queryKey: [queryKeys.Categories],
    queryFn: () => placesService.getCategories(),
    select: ({ data }) => data,
  });

  const ref = useClickAway<HTMLDivElement>((event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
      return;
    }
    setIsFilterOpen(false);
  });

  const changeCategory = useCallback((category: string) => {
    if (!category) {
      return;
    }
    setBuildingFilter((prevFilter) => ({
      ...prevFilter,
      categories: [category],
    }));
  }, [setBuildingFilter]);

  const changePrice = useMemo(
    () => 
      debounce((value: [number, number]) => {
        const minPrice = value[0];
        setBuildingFilter((prevFilter) => ({
          ...prevFilter,
          price: minPrice,
        }));
      }, 250),
    [setBuildingFilter]
  );

  const onChangePrices = useCallback((newValue: [number, number]) => {
    setPricesLocal(newValue);
    changePrice(newValue);
  }, [changePrice]);

  const onChangeRadius = useCallback((newValue: [number, number]) => {
    setRadiusLocal(newValue);
  }, []);

  const handleButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFilterOpen((prev) => !prev);
  }, []);

  const resetCategories = useCallback(() => {
    setBuildingFilter(prev => ({
      ...prev,
      categories: [],
    }));
  }, [setBuildingFilter]);

  const selectRating = useCallback((rating: RatingsType) => {
    setBuildingFilter(prev => ({ 
      ...prev, 
      rating 
    }));
  }, [setBuildingFilter]);

  const getIconClass = useMemo(() => (isOpen: boolean, isDesktop: boolean) => {
    return clsx(
      "w-[17px] h-[17px] bg-white animate-def",
      { 
        "!bg-green-3": isOpen,
        "block sm:hidden": !isDesktop,
        "hidden sm:block": isDesktop 
      }
    );
  }, []);

  return (
    <>
      <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
      <div className="sm:container flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row justify-between items-center ">
        <ul className="pt-4 sm:flex-wrap lg:flex-nowrap max-w-[95vw] m-0 p-0 gap-[12px] flex overflow-x-auto sm:overflow-hidden">
          <li>
            <Link
              to="/"
              onClick={resetCategories}
              className={clsx(
                "rounded-[11px] px-[15px] h-[46px] flex items-center bg-[#E7E7E7] font-bold text-[14px] text-green-2 btn shadow-hidden animate-def hover:translate-y-[-5px]",
                { "!bg-green-2 !text-white": !categories.length }
              )}
            >
              {t("all")}
            </Link>
          </li>
          {Array.isArray(categoriesData) &&
            categoriesData.map((category) => (
              <li key={category}>
                <Link
                  to="/"
                  onClick={() => changeCategory(category)}
                  className={clsx(
                    "rounded-[11px] px-[15px] h-[46px] flex items-center bg-[#E7E7E7] font-bold text-[14px] text-green-2 btn shadow-hidden animate-def hover:translate-y-[-10px]",
                    {
                      "!bg-green-2 !text-white": buildingFilter.categories.includes(category),
                    }
                  )}
                >
                  {t(`${category}`)}
                </Link>
              </li>
            ))}
        </ul>
        <div className="sm:relative pe-7 sm:mt-0 mt-5 ms-auto">
          {isFilterOpen && (
            <h3 className="z-20 absolute top-[-40px] left-1/2 transform -translate-x-1/2 sm:hidden text-[#149659] font-bold text-2xl">
              {t("filter")}
            </h3>
          )}

          <button
            ref={buttonRef}
            onClick={handleButtonClick}
            className={clsx(
              "flex justify-center btn bg-green-3 rounded-[11px] px-[20px] py-[14px] shadow-hidden gap-[16px] items-center text-[14px] font-bold !shadow-[1px_1px_20px_rgba(0,0,0,0.5)] hover:!shadow-[1px_1px_20px_rgba(0,0,0,0.5)]",
              {
                "relative sm:relative": !isFilterOpen,
                "absolute top-[-50px] sm:top-0 sm:left-0 left-6 z-20 sm:relative": isFilterOpen,
                "!bg-white text-green-3": isFilterOpen,
              }
            )}
          >
            <div
              className={getIconClass(isFilterOpen, false)}
              style={{
                maskImage: `url(${isFilterOpen ? arrow : filterIcon})`,
                maskPosition: "center",
                maskSize: "cover",
                maskRepeat: "no-repeat",
              }}
            ></div>

            <div
              className={getIconClass(isFilterOpen, true)}
              style={{
                maskImage: `url(${filterIcon})`,
                maskPosition: "center",
                maskSize: "cover",
                maskRepeat: "no-repeat",
              }}
            ></div>
            <span className="sm:block hidden">{t("filter")}</span>
          </button>

          <div
            ref={ref}
            className={clsx(
              "absolute z-[10] top-[-80px] sm:h-auto h-[100vh] sm:top-[-15px] right-0 rounded-[15px] pt-24 sm:pt-[114px] pb-[34px] pl-[15px] pr-[17px] sm:max-w-[455px] w-screen bg-white sm:bg-green-white shadow-[1px_1px_30px_rgba(0,0,0,0.5)] opacity-0 pointer-events-none max-h-[0px] animate-def",
              { "max-h-screen opacity-100 pointer-events-auto": isFilterOpen }
            )}
          >
            <div className="rounded-[25px] pt-10 pb-20 pl-20 sm:pl-40 pr-50 bg-white shadow-[1px_1px_30px_rgba(0,0,0,0.5)]">
              <h3 className="text-[20px] text-green-3 font-bold">
                {t("rating")}
              </h3>
              <div className="mt-[6px] flex gap-[10px] flex-wrap">
                {RATINGS.map((rating) => (
                  <button
                    key={rating}
                    onClick={() => selectRating(rating)}
                    className={clsx(
                      "btn border-2 rounded-[8px] py-[4px] pl-[7px] pr-[4px] shadow-hidden flex gap-[2px] text-[16px] font-bold hover:!shadow-[1px_1px_10px_rgba(0,0,0,0.5)] text-green-white bg-white",
                      {
                        "border-2 !bg-green-white !text-white":
                          buildingFilter.rating === rating,
                      }
                    )}
                  >
                    <span className="max-w-6">{rating}+</span>
                    <img src={starIcon} alt="star" />
                  </button>
                ))}
              </div>
            </div>
            <div className="my-30 rounded-[25px] pt-10 pb-20 pl-40 pr-50 bg-white shadow-[1px_1px_30px_rgba(0,0,0,0.5)]">
              <h3 className="text-[20px] text-green-3 font-bold">
                {t("price")}
              </h3>
              <Slider
                value={pricesLocal}
                onChange={(_, newValue) =>
                  onChangePrices(newValue as [number, number])
                }
                valueLabelDisplay="auto"
                sx={{ color: "#237B52" }}
                valueLabelFormat={(value: number) => `${value} сом`}
              />
            </div>
            <div className="my-30 rounded-[25px] pt-10 pb-20 pl-40 pr-50 bg-white shadow-[1px_1px_30px_rgba(0,0,0,0.5)]">
              <h3 className="text-[20px] text-green-3 font-bold">
                {t("radius")}
              </h3>
              <Slider
                value={radiusLocal}
                onChange={(_, newValue) =>
                  onChangeRadius(newValue as [number, number])
                }
                valueLabelDisplay="auto"
                sx={{ color: "#237B52" }}
                valueLabelFormat={(value: number) => `${value} км`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;