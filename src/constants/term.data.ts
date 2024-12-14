import doubParkImage1 from "../assets/images/term/dub-park.jpg";
import natsMusImage1 from "../assets/images/term/nats-mus.jpg";
import domPrvImage1 from "../assets/images/term/dom-prv.jpg";
import parkPanfImage1 from "../assets/images/term/park-panf.jpg";

export const tours = [
  {
    id: 1,
    name: {
      en: "Park and Mountains",
      ru: "Парк и горы",
      kg: "Парк жана тоолор"
    },
    description: {
      en: "This tour offers a combination of urban atmosphere and the grandeur of nature. Participants will enjoy walking through Bishkek parks full of history and greenery, as well as explore picturesque mountain landscapes.",
      ru: "Этот тур предлагает сочетание городской атмосферы и величия природы. Участники смогут насладиться прогулками по паркам Бишкека, полными истории и зелени, а также исследовать живописные горные пейзажи.",
      kg: "Бул тур шаардык атмосфера менен табияттын улуулугунун айкалышын сунуштайт. Катышуучулар Бишкектин тарыхка жана жашылчалыкка толгон парктарында сейилдөөнү, ошондой эле кооз тоолордун көрүнүштөрүн изилдөөнү ырахат алышат."
    },
    contacts: {
      tel: "+996 777 777 777",
      whatsapp: "+996 777 777 777"
    },
    schedule: [
      {
        time: { start: "08:00", end: "10:00" },
        location: {
          name: {
            en: "Oak Park (Ogradka)",
            ru: "Дубовый парк (Оградка)",
            kg: "Дуб аллеясы (Оградка)"
          },
          description: {
            en: "The oldest park in Bishkek, founded in 1890. This green heart of the city is filled with oaks over 100 years old. It is perfect for calm walks.",
            ru: "Старейший парк Бишкека, основанный в 1890 году. Это зелёное сердце города с дубами, возраст которых превышает 100 лет. Парк идеально подходит для спокойных прогулок.",
            kg: "Бишкектин эӊ эски паркы, 1890-жылы негизделген. Бул шаардык жашыл жүрөк 100 жылдан ашкан дубдар менен толгон. Парк тынч сейилдеш үчүн эң сонун."
          },
          coordinates: { x: 42.878608, y: 74.607634 },
          images: [doubParkImage1]
        }
      },
      {
        time: { start: "10:00", end: "12:00" },
        location: {
          name: {
            en: "National Museum of History of kyrgyzstan",
            ru: "Национальный музей истории Кыргызстана",
            kg: "Кыргызстандын тарыхы боюнча Улуттук музей"
          },
          description: {
            en: "Located right on Ala-Too Square, this is the largest historical museum in the country. It tells about the life of kyrgyz people from ancient times to modernity.",
            ru: "Музей расположен прямо на площади Ала-Тоо и является крупнейшим историческим музеем страны. Он рассказывает о жизни кыргызов с древних времён до современности.",
            kg: "Ала-Тоо аянтында жайгашкан, бул өлкөнүн эң чоң тарыхый музейи. Ал кыргыз элинин байыркы мезгилдерден бүгүнкү күнгө чейин болгон турмушун баяндайт."
          },
          coordinates: { x: 42.877718, y: 74.603886 },
          images: [natsMusImage1]
        }
      },
      {
        time: { start: "12:00", end: "14:00" },
        location: {
          name: {
            en: "Government House",
            ru: "Дом Правительства",
            kg: "Өкмөт Үйү"
          },
          description: {
            en: "A monumental building located on Ala-Too Square, it is a striking example of Soviet architecture. Today, it houses the government of kyrgyzstan.",
            ru: "Монументальное здание, расположенное на площади Ала-Тоо, является ярким примером советской архитектуры. Сегодня здесь находится правительство Кыргызстана.",
            kg: "Ала-Тоо аянтында жайгашкан монументалдуу имарат, Советтер Союзунун архитектурасынын таң калыштуу үлгүсү. Бүгүнкү күндө Кыргызстан өкмөтү бул имаратта жайгашкан."
          },
          coordinates: { x: 42.880015, y: 74.604014 },
          images: [domPrvImage1]
        }
      },
      {
        time: { start: "14:00", end: "16:00" },
        location: {
          name: {
            en: "Panfilov Park",
            ru: "Парк имени Панфилова",
            kg: "Панфилов атындагы парк"
          },
          description: {
            en: "This park is dedicated to the Panfilov heroes who fought in World War II. Surrounded by greenery, it is a popular place for city dwellers to relax.",
            ru: "Этот парк посвящён героям-панфиловцам, участвовавшим в Великой Отечественной войне. Он окружён зеленью и является популярным местом отдыха горожан.",
            kg: "Бул парк Улуу Ата Мекендик согушка катышкан Панфилов баатырларына арналган. Ал жашылчалыктан курчалып, шаар тургундары үчүн популярдуу эс алуу жайы болуп саналат."
          },
          coordinates: { x: 42.879664, y: 74.600252 },
          images: [parkPanfImage1]
        }
      }
    ]
  }
];
