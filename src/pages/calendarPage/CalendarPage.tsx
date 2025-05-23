import { FC, useEffect, useState } from "react";
import locations from "../../assets/images/icons/locations.svg";
import data from "../../assets/images/icons/data.svg";
import Calendar from "react-calendar";
import { useAtom } from "jotai";
import { eventAtom } from "../../store/store";
import eventService from "../../services/event.service";
import { IEvent } from "../../types/api.types";

interface PaginationResponse {
  events: IEvent[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

const CalendarPage: FC = () => {
  const lang = localStorage.getItem("i18nextLng");
  const [date,] = useState<Date | null>(new Date());
  const [events, setEvents] = useAtom(eventAtom);
  const [paginationInfo, setPaginationInfo] = useState<Omit<PaginationResponse, 'events'>>({
    hasNextPage: false,
    hasPrevPage: false,
    limit: 6,
    page: 1,
    total: 0,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage, setEvents]);

  const truncateText = (text:string, maxLength = 20) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const fetchEvents = async (page: number) => {
    try {
      const response = await eventService.getEvents(page+'');
      setEvents(response.data.events);
      setPaginationInfo({
        hasNextPage: response.data.hasNextPage,
        hasPrevPage: response.data.hasPrevPage,
        limit: response.data.limit,
        page: response.data.page,
        total: response.data.total,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= paginationInfo.totalPages; i++) {
      if (
        i === 1 ||
        i === paginationInfo.totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === i ? "bg-green-2 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {i}
          </button>
        );
      } else if (
        !pageNumbers[pageNumbers.length - 1]?.key?.toString().includes('dots')
      ) {
        pageNumbers.push(<span key={`dots-${i}`} className="mx-1">...</span>);
      }
    }
    return pageNumbers;
  };

  return (
    <>
      <div className="sm:container bg-gray-bg sm:pt-7 sm:pb-3 pb-24">
        <div className="flex items-start mt-8">
          <div className="max-w-[500px] w-full   min-h-[252px] max-h-[252px] relative mb-5">
            <div>
              <div className="font-semibold min-h-[50px] text-white flex justify-between  sm:text-24 text-18  px-3 py-2 bg-green-2 rounded-t-lg"></div>
              <div>
                <Calendar
                  value={date}
                  className="bg-white font-semibold text-green-2 rounded-b-lg  shadow-md px-4 pb-4 "
                  tileClassName={({ date }) => {
                    const today = new Date();
                    if (date.toDateString() === today.toDateString()) {
                      return "bg-green text-white rounded-full";
                    }
                  }}
                  tileContent={() => null}
                  locale={`${lang == "kg" || lang == "ru" ? "ru-RU" : "en-EN"}`}
                  nextLabel={false}
                  next2Label={false}
                  prevLabel={false}
                  prev2Label={false}
                  navigationLabel={({ date }) => (
                    <div className="flex justify-between w-[90%] items-center max-w-full text-white absolute top-3">
                      <span className="text-lg font-bold">
                        {date.toLocaleString(
                          lang === "kg" || lang === "ru" ? "ru-RU" : "en-EN",
                          { month: "long" }
                        )}
                      </span>
                      <span className="text-lg">{date.getFullYear()}</span>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="">
    {/* Добавить */}
          </div>
        </div>
        <h5 className="text-[#157A4B] font-bold text-4xl w-fit mx-auto ">
          SOON
        </h5>
        <div className="grid-cols-1 lg:justify-items-stretch md:justify-items-center justify-items-center sm:flex-wrap md:grid md:grid-cols-2 lg:grid-cols-3 gap-3  lg:justify-between ">
          {events &&
            events.map((event) => (
              <div
                key={event.id}
                className="flex gap-3 p-3 bg-white max-w-[400px] w-full rounded-lg mt-3 justify-center items-center"
              >
                <div className="w-full max-w-[45%] ms-1">
                  <svg
                    width="166"
                    height="167"
                    viewBox="0 0 166 167"
                    fill="none"
                    className="w-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="165.402"
                      height="166.873"
                      rx="13"
                      fill="#D2D2D2"
                    />
                  </svg>
                </div>

                <div className="flex flex-col h-full  max-w-[55%] w-full">
                  <h6 className="text-green font-semibold text-lg">
                    {event.name}
                  </h6>
                  <div className="text-green-bg font-semibold">
                    <section className="flex mt-1">
                      <img src={locations} alt="locations" className="me-1" />
                      <span>{truncateText(event.address)}</span>
                    </section>
                    <section className="flex mt-1">
                      <img src={data} alt="data" className="me-1" />
                      <p>{event.date}</p>
                    </section>
                  </div>
                  <div className="flex  gap-2 mt-auto text-white font-semibold text-nowrap text-xs">
                    <button className="bg-green-bg p-1 px-2 rounded-lg">
                      Read more
                    </button>
                    <button className="bg-green-bg p-1 px-2 rounded-lg">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
         <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!paginationInfo.hasPrevPage}
              className="mx-2 px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!paginationInfo.hasNextPage}
              className="mx-2 px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
      </div>
    </>
  );
};

export default CalendarPage;