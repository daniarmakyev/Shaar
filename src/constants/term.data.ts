import doubParkImage1 from "../assets/images/term/dub-park.jpg";
import natsMusImage1 from "../assets/images/term/nats-mus.jpg";
import domPrvImage1 from "../assets/images/term/dom-prv.jpg";
import parkPanfImage1 from "../assets/images/term/park-panf.jpg";

export const categoriesData = [
  "House",
  "Hotel",
  "Sauna",
  "Restaurants",
  "Bars",
  "Clubs",
  "Schools",
  "Hospitals",
];

export const tours = [
  {
    id: 1,
    name: "Парк и горы",
    description:
      "Этот тур предлагает сочетание городской атмосферы и величия природы. Участники смогут насладиться прогулками по паркам Бишкека, полными истории и зелени, а также исследовать живописные горные пейзажи.",
    contacts: { tel: "+996 701 180 507", whatsapp: "+996 501 180 507" },
    schedule: [
      {
        time: { start: "08:00", end: "10:00" },
        location: {
          name: "Дубовый парк (Оградка)",
          images: [doubParkImage1],
          description:
            "Старейший парк Бишкека, основанный в 1890 году. Это зелёное сердце города с дубами, возраст которых превышает 100 лет. Парк идеально подходит для спокойных прогулок.",
          coordinates: {
            x: 42.878608,
            y: 74.607634,
          },
        },
      },
      {
        time: { start: "10:00", end: "12:00" },
        location: {
          name: "Национальный музей истории Кыргызстана",
          images: [natsMusImage1],
          description:
            "Музей расположен прямо на площади Ала-Тоо и является крупнейшим историческим музеем страны. Он рассказывает о жизни кыргызов с древних времён до современности.",
          coordinates: {
            x: 42.877718,
            y: 74.603886,
          },
        },
      },
      {
        time: { start: "12:00", end: "14:00" },
        location: {
          name: "Дом Правительства",
          images: [domPrvImage1],
          description:
            "Монументальное здание, расположенное на площади Ала-Тоо, является ярким примером советской архитектуры. Сегодня здесь находится правительство Кыргызстана.",
          coordinates: {
            x: 42.880015,
            y: 74.604014,
          },
        },
      },
      {
        time: { start: "14:00", end: "16:00" },
        location: {
          name: "Парк имени Панфилова",
          images: [parkPanfImage1],
          description:
            "Этот парк посвящён героям-панфиловцам, участвовавшим в Великой Отечественной войне. Он окружён зеленью и является популярным местом отдыха горожан.",
          coordinates: {
            x: 42.879664,
            y: 74.600252,
          },
        },
      },
    ],
  },
];
