import { FC } from "react";
import calendar from "../../assets/images/calendar.png";
const CalendarPage: FC = () => {
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
      <div className="sm:container">
        <img src={calendar} className="max-w-[450px] w-full h-full max-h-[400px] pt-8 mx-auto" alt="" />
        <h5 className="text-[#157A4B] font-bold text-4xl w-fit mx-auto ">SOON</h5>
        <div className="sm:ms-8 flex flex-wrap gap-2 mx-auto justify-center ">

          {events.map((event) => (
            <div
              key={event.id}
              className="flex gap-3 bg-white max-w-[400px] w-full rounded-lg mt-3 justify-center items-center"
            >
              <svg
                width="166"
                height="167"
                viewBox="0 0 166 167"
                fill="none"
                className="p-3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="165.402" height="166.873" rx="13" fill="#D2D2D2" />
              </svg>

              <div className="flex flex-col items-center justify-center mt-3 max-w-[290px] w-full">
                <h6>{event.title}</h6>
                <p className="flex mt-1">
                  <svg
                    width="17"
                    height="19"
                    viewBox="0 0 17 19"
                    fill="none"
                    className="me-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="..." // Сокращённый путь для удобства
                      fill="#159559"
                    />
                  </svg>
                  {event.location}
                </p>
                <p className="flex mt-1">
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    className="me-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="..." // Сокращённый путь для удобства
                      fill="#159559"
                    />
                  </svg>
                  {event.time}
                </p>
                <div className="flex mt-7 gap-2 ">
                  <button className="bg-green-bg text-white font-bold p-1 px-2 rounded-lg text-nowrap">
                    Read more
                  </button>
                  <button className="bg-green-bg text-white font-bold p-1 px-2 rounded-lg text-nowrap">
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
