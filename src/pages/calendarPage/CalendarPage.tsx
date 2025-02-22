import { FC, useState } from "react";
import locations from "../../assets/images/icons/locations.svg";
import data from "../../assets/images/icons/data.svg";
import Calendar from "react-calendar";
const CalendarPage: FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const lang = localStorage.getItem("i18nextLng");

  const events = [
    {
      id: 1,
      title: "New Year's Concert",
      location: "Philharmonic",
      time: "18:00 31 Dec., 2024",
    },
    {
      id: 2,
      title: "Spring Festival",
      location: "Central Park",
      time: "10:00 20 Mar., 2024",
    },
    {
      id: 3,
      title: "Art Exhibition",
      location: "City Museum",
      time: "14:00 15 Apr., 2024",
    },
    {
      id: 4,
      title: "Tech Conference",
      location: "Tech Hub",
      time: "09:00 5 Jun., 2024",
    },
    {
      id: 5,
      title: "Food Festival",
      location: "Downtown",
      time: "12:00 10 Jul., 2024",
    },
    {
      id: 6,
      title: "Charity Run",
      location: "Sports Arena",
      time: "08:00 25 Aug., 2024",
    },
  ];
  return (
    <>
      <div className="sm:container bg-gray-bg sm:pt-7">
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
            <h4>Your </h4>
          </div>
        </div>
        <h5 className="text-[#157A4B] font-bold text-4xl w-fit mx-auto ">
          SOON
        </h5>
        <div className="grid-cols-1 lg:justify-items-stretch md:justify-items-center justify-items-center sm:flex-wrap md:grid md:grid-cols-2 lg:grid-cols-3 gap-3  lg:justify-between ">
          {events.map((event) => (
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
                  {event.title}
                </h6>
                <div className="text-green-bg font-semibold">
                  <section className="flex mt-1">
                    <img src={locations} alt="locations" className="me-1" />
                    <span>{event.location}</span>
                  </section>
                  <section className="flex mt-1">
                    <img src={data} alt="data" className="me-1" />
                    <p>{event.time}</p>
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
      </div>
    </>
  );
};

export default CalendarPage;
