import {
  Boxes,
  Factory,
  Gauge,
  HardHat,
  Recycle,
  RotateCcw,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import type { Localized } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";

// TODO (prototype): address and e-mail are placeholders — confirm with the client.
export const company = {
  name: "EXPERT MACHINERY",
  legalName: "OOO «EXPERT MACHINERY»",
  address: {
    ru: "г. Ташкент, Узбекистан",
    kk: "Ташкент қ., Өзбекстан",
    en: "Tashkent, Uzbekistan",
  } satisfies Localized,
  phone: "+998 99 198 51 98",
  phoneHref: "tel:+998991985198",
  telegramHref: "https://t.me/+998991985198",
  email: "info@expertmachinery.uz",
};

export const navItems: { href: string; key: TranslationKey }[] = [
  { href: "/catalog", key: "nav.catalog" },
  { href: "/industries", key: "nav.industries" },
  { href: "/service", key: "nav.service" },
  { href: "/about", key: "nav.about" },
  { href: "/contacts", key: "nav.contacts" },
];

export const categoryKeys = [
  "all",
  "shaft",
  "helical",
  "worm",
  "planetary",
  "industrial",
  "pumps",
  "couplings",
] as const;

export type CategoryKey = (typeof categoryKeys)[number];

export const categoryLabels: Record<CategoryKey, Localized> = {
  all: { ru: "Все", kk: "Барлығы", en: "All" },
  shaft: { ru: "Вальные", kk: "Білікке орнатылатын", en: "Shaft-mounted" },
  helical: { ru: "Цилиндрические", kk: "Цилиндрлік", en: "Helical" },
  worm: { ru: "Червячные", kk: "Червякты", en: "Worm" },
  planetary: { ru: "Планетарные", kk: "Планетарлық", en: "Planetary" },
  industrial: { ru: "Промышленные", kk: "Өнеркәсіптік", en: "Industrial" },
  pumps: { ru: "Насосы", kk: "Сорғылар", en: "Pumps" },
  couplings: { ru: "Муфты", kk: "Муфталар", en: "Couplings" },
};

/** Short pitch + a representative photo for the category tiles on the home page. */
export const categoryMeta: Record<Exclude<CategoryKey, "all">, { image: string; text: Localized }> = {
  shaft: {
    image: "https://www.aokman-gearbox.com/d/pic/shaft-mounted-gearbox/ata-shaft-mounted-gearbox.jpg",
    text: {
      ru: "Насадные редукторы для конвейеров: полый вал, обратный стопор, быстрая замена на линии.",
      kk: "Конвейерлерге арналған білікті редукторлар: қуыс білік, кері тіреу, желіде жылдам ауыстыру.",
      en: "Shaft-mounted units for conveyors: hollow shaft, backstop, fast in-line replacement.",
    },
  },
  helical: {
    image: "https://www.aokman-gearbox.com/d/pic/standard-gearbox/r-series-helical-gearbox.png",
    text: {
      ru: "Соосные и коническо-цилиндрические мотор-редукторы R и K для непрерывных линий.",
      kk: "Үздіксіз желілерге арналған R және K сериялы мотор-редукторлар.",
      en: "Coaxial and helical-bevel R and K gear motors for continuous lines.",
    },
  },
  worm: {
    image: "https://www.aokman-gearbox.com/d/pic/worm-gearbox/rv.png",
    text: {
      ru: "Компактные червячные редукторы NMRV для дозаторов, упаковки и малых приводов.",
      kk: "Дозаторлар мен қаптамаға арналған ықшам NMRV червякты редукторлар.",
      en: "Compact NMRV worm gearboxes for dosing, packaging and small drives.",
    },
  },
  planetary: {
    image: "https://www.aokman-gearbox.com/d/pic/planetary-gear-units/p-series-planetary-gearbox.png",
    text: {
      ru: "Планетарные серии для высоких моментов при ограниченных габаритах.",
      kk: "Шектеулі габаритте жоғары момент беретін планетарлық сериялар.",
      en: "Planetary series for high torque within a limited footprint.",
    },
  },
  industrial: {
    image: "https://www.aokman-gearbox.com/d/pic/industrial-gear-units/hb-series-industrial-gearbox.png",
    text: {
      ru: "Тяжёлые промышленные редукторы H/B и MC для мельниц, дробилок и элеваторов.",
      kk: "Диірмендер мен ұсатқыштарға арналған ауыр H/B және MC редукторлары.",
      en: "Heavy-duty H/B and MC industrial gear units for mills, crushers and elevators.",
    },
  },
  pumps: {
    image: "https://product.standartpompa.com/AppRepo/Image/List/20240628082757-1415.png",
    text: {
      ru: "Насосы для водоснабжения, отопления, пожаротушения и технологических линий.",
      kk: "Сумен жабдықтау, жылыту, өрт сөндіру және технологиялық желілерге арналған сорғылар.",
      en: "Pumps for water supply, heating, fire-fighting and process lines.",
    },
  },
  couplings: {
    image: "https://www.aokman-gearbox.com/d/pic/gearbox-accessories/yoxd-fluid-coupling-1.jpg",
    text: {
      ru: "Гидромуфты YOX для мягкого пуска и защиты привода от перегрузки.",
      kk: "Жұмсақ іске қосу және жетекті қорғауға арналған YOX гидромуфталары.",
      en: "YOX fluid couplings for soft start and drive overload protection.",
    },
  },
};

export const categories: CategoryKey[] = [...categoryKeys];

type Spec = { label: Localized; value: Localized };

export type Product = {
  slug: string;
  code: string;
  title: Localized;
  category: CategoryKey;
  image: string;
  specs: Spec[];
  usage: Localized;
  summary: Localized;
  highlights: Localized[];
};

const L = {
  ratio: { ru: "Передаточное число", kk: "Беріліс саны", en: "Ratio" } satisfies Localized,
  torque: { ru: "Момент", kk: "Момент", en: "Torque" } satisfies Localized,
  power: { ru: "Мощность", kk: "Қуаты", en: "Power" } satisfies Localized,
  capacity: { ru: "Производительность", kk: "Өнімділігі", en: "Capacity" } satisfies Localized,
  head: { ru: "Напор", kk: "Арыны", en: "Head" } satisfies Localized,
  pressure: { ru: "Давление корпуса", kk: "Корпус қысымы", en: "Casing pressure" } satisfies Localized,
  temp: {
    ru: "Рабочая температура",
    kk: "Жұмыс температурасы",
    en: "Operating temperature",
  } satisfies Localized,
  flange: {
    ru: "Напорный патрубок",
    kk: "Арынды келте құбыр",
    en: "Discharge flange",
  } satisfies Localized,
  speed: { ru: "Частота вращения", kk: "Айналу жиілігі", en: "Speed" } satisfies Localized,
  connection: { ru: "Присоединение", kk: "Жалғауы", en: "Connection" } satisfies Localized,
  voltage: { ru: "Напряжение", kk: "Кернеуі", en: "Voltage" } satisfies Localized,
};

// Gearboxes, gear motors, industrial gear units and couplings (AOKMAN range).
const gearboxProducts: Product[] = [
  {
    slug: "ata-shaft-mounted-gearbox",
    code: "ATA",
    title: { ru: "ATA Shaft Mounted Gearbox", en: "ATA Shaft Mounted Gearbox" },
    category: "shaft",
    image:
      "https://www.aokman-gearbox.com/d/pic/shaft-mounted-gearbox/ata-shaft-mounted-gearbox.jpg",
    specs: [
      { label: L.ratio, value: { ru: "i 5-31", en: "i 5-31" } },
      { label: L.torque, value: { ru: "до 16 кНм", en: "up to 16 kNm" } },
      { label: L.power, value: { ru: "1.1-193 кВт", en: "1.1-193 kW" } },
    ],
    usage: { ru: "конвейеры, дробилки, транспортеры", en: "conveyors, crushers, transporters" },
    summary: {
      ru: "Вальный редуктор для приводов конвейеров и тяжелых линий, где важны компактный монтаж и быстрый сервис.",
      en: "A shaft-mounted gearbox for conveyor drives and heavy-duty lines where compact mounting and fast servicing matter.",
    },
    highlights: [
      { ru: "Полый выходной вал", en: "Hollow output shaft" },
      { ru: "Обратный стопор", en: "Backstop device" },
      { ru: "Ременная передача", en: "Belt drive input" },
      { ru: "Простая замена на линии", en: "Easy in-line replacement" },
    ],
  },
  {
    slug: "r-series-helical-gear-motor",
    code: "R Series",
    title: { ru: "Coaxial Helical Gear Motor", en: "Coaxial Helical Gear Motor" },
    category: "helical",
    image:
      "https://www.aokman-gearbox.com/d/pic/standard-gearbox/r-series-helical-gearbox.png",
    specs: [
      { label: L.ratio, value: { ru: "i 1.3-289", en: "i 1.3-289" } },
      { label: L.torque, value: { ru: "до 18 кНм", en: "up to 18 kNm" } },
      { label: L.power, value: { ru: "0.12-160 кВт", en: "0.12-160 kW" } },
    ],
    usage: { ru: "насосы, мешалки, упаковочные линии", en: "pumps, mixers, packaging lines" },
    summary: {
      ru: "Соосный цилиндрический мотор-редуктор для точной, тихой и энергоэффективной передачи момента.",
      en: "A coaxial helical gear motor for precise, quiet and energy-efficient torque transmission.",
    },
    highlights: [
      { ru: "Высокий КПД", en: "High efficiency" },
      { ru: "Модульный мотор", en: "Modular motor" },
      { ru: "Фланцевое исполнение", en: "Flange mounting" },
      { ru: "Компактная компоновка", en: "Compact footprint" },
    ],
  },
  {
    slug: "k-series-helical-bevel-gear-motor",
    code: "K Series",
    title: { ru: "Helical-Bevel Gear Motor", en: "Helical-Bevel Gear Motor" },
    category: "helical",
    image:
      "https://www.aokman-gearbox.com/d/pic/standard-gearbox/k-series-helical-bevel-gearbox.png",
    specs: [
      { label: L.ratio, value: { ru: "i 5-14 500", en: "i 5-14,500" } },
      { label: L.torque, value: { ru: "до 50 кНм", en: "up to 50 kNm" } },
      { label: L.power, value: { ru: "0.12-200 кВт", en: "0.12-200 kW" } },
    ],
    usage: { ru: "элеваторы, металлургия, смесители", en: "elevators, metallurgy, mixers" },
    summary: {
      ru: "Коническо-цилиндрический привод для угловой передачи, тяжелых пусков и непрерывной работы.",
      en: "A helical-bevel drive for right-angle transmission, heavy starts and continuous duty.",
    },
    highlights: [
      { ru: "Угловой выход", en: "Right-angle output" },
      { ru: "Высокий запас момента", en: "High torque reserve" },
      { ru: "IEC моторы", en: "IEC motors" },
      { ru: "Разные положения монтажа", en: "Multiple mounting positions" },
    ],
  },
  {
    slug: "rv-nmrv-worm-gearbox",
    code: "RV / NMRV",
    title: { ru: "Worm Gearbox", en: "Worm Gearbox" },
    category: "worm",
    image: "https://www.aokman-gearbox.com/d/pic/worm-gearbox/rv.png",
    specs: [
      { label: L.ratio, value: { ru: "i 7.5-100", en: "i 7.5-100" } },
      { label: L.torque, value: { ru: "до 1 550 Нм", en: "up to 1,550 Nm" } },
      { label: L.power, value: { ru: "0.06-15 кВт", en: "0.06-15 kW" } },
    ],
    usage: { ru: "дозаторы, ворота, легкие линии", en: "dosing systems, gates, light-duty lines" },
    summary: {
      ru: "Червячный редуктор для компактных механизмов, где нужны большое передаточное число и спокойный ход.",
      en: "A worm gearbox for compact mechanisms needing a high ratio and quiet running.",
    },
    highlights: [
      { ru: "Алюминиевый корпус", en: "Aluminium housing" },
      { ru: "Самоторможение", en: "Self-locking" },
      { ru: "Низкий шум", en: "Low noise" },
      { ru: "Широкий ряд типоразмеров", en: "Wide size range" },
    ],
  },
  {
    slug: "p-series-planetary-gearbox",
    code: "P Series",
    title: { ru: "Planetary Gearbox", en: "Planetary Gearbox" },
    category: "planetary",
    image:
      "https://www.aokman-gearbox.com/d/pic/planetary-gear-units/p-series-planetary-gearbox.png",
    specs: [
      { label: L.ratio, value: { ru: "i до 4000", en: "i up to 4000" } },
      { label: L.torque, value: { ru: "до 2600 кНм", en: "up to 2600 kNm" } },
      { label: L.power, value: { ru: "тяжелый режим", en: "heavy duty" } },
    ],
    usage: { ru: "цемент, горная техника, краны", en: "cement, mining equipment, cranes" },
    summary: {
      ru: "Планетарный редуктор для максимальной плотности момента, ударных нагрузок и тяжелого режима.",
      en: "A planetary gearbox for maximum torque density, shock loads and heavy duty.",
    },
    highlights: [
      { ru: "Высокая плотность момента", en: "High torque density" },
      { ru: "Модульная сборка", en: "Modular assembly" },
      { ru: "Тяжелые подшипники", en: "Heavy-duty bearings" },
      { ru: "Низкая масса узла", en: "Low unit weight" },
    ],
  },
  {
    slug: "hb-industrial-gear-unit",
    code: "H/B",
    title: { ru: "Industrial Gear Unit", en: "Industrial Gear Unit" },
    category: "industrial",
    image:
      "https://www.aokman-gearbox.com/d/pic/industrial-gear-units/hb-series-industrial-gearbox.png",
    specs: [
      { label: L.ratio, value: { ru: "i 1.25-450", en: "i 1.25-450" } },
      { label: L.torque, value: { ru: "до 900 кНм", en: "up to 900 kNm" } },
      { label: L.power, value: { ru: "до 4700 кВт", en: "up to 4700 kW" } },
    ],
    usage: { ru: "мельницы, карьеры, энергетика", en: "mills, quarries, power generation" },
    summary: {
      ru: "Промышленный редуктор H/B для крупных агрегатов с длительной работой и высокой нагрузкой.",
      en: "An industrial H/B gear unit for large units with continuous operation and high loads.",
    },
    highlights: [
      { ru: "Горизонтальный или вертикальный монтаж", en: "Horizontal or vertical mounting" },
      { ru: "Система охлаждения", en: "Cooling system" },
      { ru: "Маслостанция", en: "Oil station" },
      { ru: "Датчики контроля", en: "Monitoring sensors" },
    ],
  },
  {
    slug: "mc-modular-industrial-gearbox",
    code: "MC",
    title: { ru: "Modular Industrial Gearbox", en: "Modular Industrial Gearbox" },
    category: "industrial",
    image:
      "https://www.aokman-gearbox.com/d/pic/industrial-gear-units/mc-series-industrial-gearbox.jpg",
    specs: [
      { label: L.ratio, value: { ru: "i 7.1-112", en: "i 7.1-112" } },
      { label: L.torque, value: { ru: "до 65 кНм", en: "up to 65 kNm" } },
      { label: L.power, value: { ru: "до 1500 кВт", en: "up to 1500 kW" } },
    ],
    usage: { ru: "экструдеры, подъемники, конвейеры", en: "extruders, hoists, conveyors" },
    summary: {
      ru: "Модульный промышленный редуктор для замены импортных узлов и сборки под заданную компоновку.",
      en: "A modular industrial gearbox for replacing imported units and building the exact configuration needed.",
    },
    highlights: [
      { ru: "Модульная платформа", en: "Modular platform" },
      { ru: "Быстрый подбор аналога", en: "Fast analog matching" },
      { ru: "Разные выходные валы", en: "Multiple output shaft options" },
      { ru: "Сервисные опции", en: "Service options" },
    ],
  },
  {
    slug: "yox-fluid-coupling",
    code: "YOX",
    title: { ru: "Fluid Coupling", en: "Fluid Coupling" },
    category: "couplings",
    image:
      "https://www.aokman-gearbox.com/d/pic/gearbox-accessories/yoxd-fluid-coupling-1.jpg",
    specs: [
      { label: L.ratio, value: { ru: "плавный пуск", en: "soft start" } },
      { label: L.torque, value: { ru: "защита привода", en: "drive protection" } },
      { label: L.power, value: { ru: "до 2000 кВт", en: "up to 2000 kW" } },
    ],
    usage: { ru: "насосы, вентиляторы, дробилки", en: "pumps, fans, crushers" },
    summary: {
      ru: "Гидромуфта для мягкого пуска, защиты двигателя и снижения ударных нагрузок на механизм.",
      en: "A fluid coupling for smooth starts, motor protection and reduced shock loads on the mechanism.",
    },
    highlights: [
      { ru: "Плавный разгон", en: "Smooth acceleration" },
      { ru: "Защита от перегрузки", en: "Overload protection" },
      { ru: "Меньше ударов", en: "Reduced shock loads" },
      { ru: "Для тяжелого пуска", en: "For heavy starting duty" },
    ],
  },
];

// Pumps range (Standart Pompa), added alongside the existing gearbox catalog.
const pumpProducts: Product[] = [
  {
    slug: "pump-eco-snt",
    code: "ECO SNT",
    title: { ru: "ECO SNT", en: "ECO SNT" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20240628082757-1415.png",
    specs: [
      { label: L.flange, value: { ru: "DN 32…DN 250 мм", en: "DN 32…DN 250 mm" } },
      { label: L.capacity, value: { ru: "до 1200 м³/ч", en: "up to 1200 m³/h" } },
      { label: L.head, value: { ru: "до 160 м", en: "up to 160 m" } },
      { label: L.temp, value: { ru: "-10…+140 °C", en: "-10…+140 °C" } },
    ],
    usage: { ru: "водоснабжение, орошение, пожаротушение", en: "water supply, irrigation, fire fighting" },
    summary: {
      ru: "Консольный насос по стандарту EN 733 для чистых и слабозагрязнённых жидкостей: водоснабжение, орошение, пожаротушение и технологические линии.",
      en: "An EN 733 end suction pump for clean or slightly contaminated liquids: water supply, irrigation, fire fighting and process lines.",
    },
    highlights: [
      { ru: "Корпус по EN 733", en: "EN 733 casing" },
      { ru: "Одноступенчатая консольная схема", en: "Single-stage end suction" },
      { ru: "29 типоразмеров + 17 доп.", en: "29 base + 17 extra sizes" },
      { ru: "Соответствие EU 547/2012", en: "EU 547/2012 compliant" },
    ],
  },
  {
    slug: "pump-eco-snm",
    code: "ECO SNM / SNM-V",
    title: { ru: "ECO SNM - ECO SNM-V", en: "ECO SNM - ECO SNM-V" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20190531172507-4769.jpg",
    specs: [
      { label: L.flange, value: { ru: "DN 32…DN 200 мм", en: "DN 32…DN 200 mm" } },
      { label: L.capacity, value: { ru: "до 900 м³/ч", en: "up to 900 m³/h" } },
      { label: L.head, value: { ru: "до 100 м", en: "up to 100 m" } },
      { label: L.pressure, value: { ru: "10 бар (16 бар)", en: "10 bar (16 bar)" } },
    ],
    usage: { ru: "водоснабжение, отопление и вентиляция", en: "water supply, heating and ventilation" },
    summary: {
      ru: "Жёстко соединённый с электродвигателем центробежный насос горизонтального или вертикального исполнения для чистых жидкостей.",
      en: "A rigidly coupled centrifugal pump in horizontal or vertical design for clean liquids.",
    },
    highlights: [
      { ru: "Горизонтальное/вертикальное исполнение", en: "Horizontal/vertical design" },
      { ru: "Электродвигатели IE3-IE4", en: "IE3-IE4 motors" },
      { ru: "Фланцы EN 1092-2 PN16", en: "EN 1092-2 PN16 flanges" },
      { ru: "Компактная close-coupled сборка", en: "Close-coupled design" },
    ],
  },
  {
    slug: "pump-eco-snl",
    code: "ECO SNL",
    title: { ru: "ECO SNL", en: "ECO SNL" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20190607181533-3572.jpg",
    specs: [
      { label: L.flange, value: { ru: "DN 40…DN 200 мм", en: "DN 40…DN 200 mm" } },
      { label: L.capacity, value: { ru: "до 850 м³/ч", en: "up to 850 m³/h" } },
      { label: L.head, value: { ru: "до 100 м", en: "up to 100 m" } },
      { label: L.pressure, value: { ru: "10 бар (16 бар)", en: "10 bar (16 bar)" } },
    ],
    usage: { ru: "встройка в трубопровод, ОВК", en: "in-line piping, HVAC" },
    summary: {
      ru: "Насос типа in-line с моноблочной сборкой для встраивания прямо в трубопровод — экономит место в машинном зале.",
      en: "An in-line, close-coupled pump built directly into the pipeline to save machine-room space.",
    },
    highlights: [
      { ru: "In-line монтаж", en: "In-line mounting" },
      { ru: "Балансировка по ISO 1940", en: "ISO 1940 balancing" },
      { ru: "Кольцо износа опционально", en: "Optional wear ring" },
      { ru: "Жёсткая муфта с электродвигателем", en: "Rigid coupling to motor" },
    ],
  },
  {
    slug: "pump-eco-snlv-h",
    code: "ECO SNLV-H",
    title: { ru: "ECO SNLV-H", en: "ECO SNLV-H" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20240628083643-2505.png",
    specs: [
      { label: L.flange, value: { ru: "DN 40…DN 250 мм", en: "DN 40…DN 250 mm" } },
      { label: L.capacity, value: { ru: "до 800 м³/ч", en: "up to 800 m³/h" } },
      { label: L.head, value: { ru: "до 95 м", en: "up to 95 m" } },
      { label: L.speed, value: { ru: "до 2900 об/мин", en: "up to 2900 rpm" } },
    ],
    usage: { ru: "ОВК, промышленное водоснабжение", en: "HVAC, industrial water supply" },
    summary: {
      ru: "Вертикальный in-line насос с отдельным опорным кронштейном подшипников для повышенных нагрузок и стабильной работы.",
      en: "A vertical in-line pump with its own bearing bracket for higher loads and stable operation.",
    },
    highlights: [
      { ru: "Собственный подшипниковый узел", en: "Own bearing bracket" },
      { ru: "Вертикальная in-line компоновка", en: "Vertical in-line layout" },
      { ru: "Фланцы EN 1092-2 PN16", en: "EN 1092-2 PN16 flanges" },
      { ru: "До 2900 об/мин", en: "Up to 2900 rpm" },
    ],
  },
  {
    slug: "pump-eco-snmv-h",
    code: "ECO SNMV-H",
    title: { ru: "ECO SNMV-H", en: "ECO SNMV-H" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20240628084116-8721.png",
    specs: [
      { label: L.flange, value: { ru: "DN 32…DN 250 мм", en: "DN 32…DN 250 mm" } },
      { label: L.capacity, value: { ru: "до 1200 м³/ч", en: "up to 1200 m³/h" } },
      { label: L.head, value: { ru: "до 160 м", en: "up to 160 m" } },
      { label: L.speed, value: { ru: "до 3600 об/мин", en: "up to 3600 rpm" } },
    ],
    usage: { ru: "промышленное водоснабжение", en: "industrial water supply" },
    summary: {
      ru: "Вертикальный консольный насос с back-pull-out конструкцией для быстрого обслуживания без демонтажа трубопровода.",
      en: "A vertical end suction pump with back-pull-out design for fast servicing without dismantling the pipework.",
    },
    highlights: [
      { ru: "Back-pull-out конструкция", en: "Back-pull-out design" },
      { ru: "Балансировка ISO 1940 кл. 6.3", en: "ISO 1940 gr. 6.3 balance" },
      { ru: "Подшипники со смазкой на весь срок", en: "Life-lubricated bearings" },
      { ru: "До 3600 об/мин", en: "Up to 3600 rpm" },
    ],
  },
  {
    slug: "pump-sds",
    code: "SDS / SDS-V",
    title: { ru: "SDS / SDS-V", en: "SDS / SDS-V" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/Detail/20190607185740-9588.jpg",
    specs: [
      { label: L.flange, value: { ru: "DN 65…DN 600 мм", en: "DN 65…DN 600 mm" } },
      { label: L.capacity, value: { ru: "до 6000 м³/ч", en: "up to 6000 m³/h" } },
      { label: L.head, value: { ru: "до 180 м", en: "up to 180 m" } },
      { label: L.pressure, value: { ru: "16-25 бар", en: "16-25 bar" } },
    ],
    usage: { ru: "крупные системы водоснабжения, ирригация", en: "large water supply systems, irrigation" },
    summary: {
      ru: "Насос с двусторонним всасыванием и осевым разъёмом корпуса для больших расходов и лёгкого сервиса без нарушения центровки.",
      en: "A double suction, axially split casing pump for high flows and easy servicing without disturbing alignment.",
    },
    highlights: [
      { ru: "Осевой разъём корпуса", en: "Axially split casing" },
      { ru: "Двустороннее всасывание", en: "Double suction" },
      { ru: "До 6000 м³/ч", en: "Up to 6000 m³/h" },
      { ru: "Горизонтальное/вертикальное исполнение", en: "Horizontal or vertical" },
    ],
  },
  {
    slug: "pump-scp",
    code: "SCP",
    title: { ru: "SCP", en: "SCP" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20240701151753-3280.png",
    specs: [
      { label: L.flange, value: { ru: "DN 32…DN 250 мм", en: "DN 32…DN 250 mm" } },
      { label: L.capacity, value: { ru: "до 1500 м³/ч", en: "up to 1500 m³/h" } },
      { label: L.head, value: { ru: "до 160 м", en: "up to 160 m" } },
      { label: L.temp, value: { ru: "-10…+175 °C", en: "-10…+175 °C" } },
    ],
    usage: { ru: "химия, нефтепереработка, металлургия, горная промышленность", en: "chemical, oil, metallurgy, mining industries" },
    summary: {
      ru: "Консольный насос по ISO 2858 с сухим валом, не соприкасающимся со средой — для химии, нефтепереработки и металлургии.",
      en: "An ISO 2858 end suction pump with a dry shaft not in contact with the medium — for chemical, oil and metallurgy duties.",
    },
    highlights: [
      { ru: "Корпус по ISO 2858", en: "ISO 2858 casing" },
      { ru: "Сухой вал", en: "Dry shaft design" },
      { ru: "38 типоразмеров", en: "38 sizes" },
      { ru: "До +175 °C", en: "Up to +175 °C" },
    ],
  },
  {
    slug: "pump-ssp-h",
    code: "SSP-H",
    title: { ru: "SSP-H", en: "SSP-H" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/Gallery/20201127143102-7325.jpg",
    specs: [
      { label: L.flange, value: { ru: "DN 25…DN 350 мм", en: "DN 25…DN 350 mm" } },
      { label: L.capacity, value: { ru: "до 3500 м³/ч", en: "up to 3500 m³/h" } },
      { label: L.head, value: { ru: "до 100 м", en: "up to 100 m" } },
      { label: L.temp, value: { ru: "-10…+110 °C", en: "-10…+110 °C" } },
    ],
    usage: { ru: "горная промышленность, металлургия, энергетика", en: "mining, metallurgy, energy" },
    summary: {
      ru: "Горизонтальный шламовый насос повышенной прочности для абразивных и сильнозагрязнённых сред.",
      en: "An extra heavy duty horizontal slurry pump for abrasive and heavily contaminated media.",
    },
    highlights: [
      { ru: "Усиленная конструкция", en: "Extra heavy duty build" },
      { ru: "Полуоткрытое/вихревое колесо", en: "Semi-open or vortex impeller" },
      { ru: "До 3500 м³/ч", en: "Up to 3500 m³/h" },
      { ru: "Для абразивных сред", en: "For abrasive media" },
    ],
  },
  {
    slug: "pump-ssp-v",
    code: "SSP-V",
    title: { ru: "SSP-V", en: "SSP-V" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20201127144558-1965.jpg",
    specs: [
      { label: L.flange, value: { ru: "DN 50…DN 250 мм", en: "DN 50…DN 250 mm" } },
      { label: L.capacity, value: { ru: "до 1000 м³/ч", en: "up to 1000 m³/h" } },
      { label: L.head, value: { ru: "до 40 м", en: "up to 40 m" } },
      { label: L.temp, value: { ru: "-10…+110 °C", en: "-10…+110 °C" } },
    ],
    usage: { ru: "горная промышленность, обогащение", en: "mining, ore processing" },
    summary: {
      ru: "Вертикальный шламовый насос для вязких, абразивных и коррозионных жидкостей с твёрдыми частицами.",
      en: "A vertical slurry pump for viscous, abrasive and corrosive liquids with solid particles.",
    },
    highlights: [
      { ru: "Для вязких и абразивных сред", en: "For viscous, abrasive media" },
      { ru: "Оптимизированная гидравлика", en: "Optimised hydraulics" },
      { ru: "Износостойкая конструкция", en: "Wear-resistant design" },
      { ru: "До 1000 м³/ч", en: "Up to 1000 m³/h" },
    ],
  },
  {
    slug: "pump-scp-ht",
    code: "SCP-HT",
    title: { ru: "SCP-HT", en: "SCP-HT" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20190610143201-5958.jpg",
    specs: [
      { label: L.flange, value: { ru: "DN 32…DN 250 мм", en: "DN 32…DN 250 mm" } },
      { label: L.capacity, value: { ru: "до 1500 м³/ч", en: "up to 1500 m³/h" } },
      { label: L.head, value: { ru: "до 160 м", en: "up to 160 m" } },
      { label: L.temp, value: { ru: "до +230 °C", en: "up to +230 °C" } },
    ],
    usage: { ru: "геотермальные системы, теплоснабжение", en: "geothermal systems, heat supply" },
    summary: {
      ru: "Консольный насос для горячей и геотермальной воды с центровым креплением корпуса, компенсирующим тепловое расширение.",
      en: "An end suction pump for hot and geothermal water with centerline mounting to absorb thermal expansion.",
    },
    highlights: [
      { ru: "Для горячей/геотермальной воды", en: "Hot/geothermal water" },
      { ru: "Центровое крепление", en: "Centerline mounting" },
      { ru: "До +230 °C", en: "Up to +230 °C" },
      { ru: "Фланцы PN 25", en: "PN 25 flanges" },
    ],
  },
  {
    slug: "pump-eco-sky",
    code: "ECO SKY",
    title: { ru: "ECO SKY", en: "ECO SKY" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20240628093631-8216.png",
    specs: [
      { label: L.flange, value: { ru: "DN 32…DN 150 мм", en: "DN 32…DN 150 mm" } },
      { label: L.capacity, value: { ru: "до 550 м³/ч", en: "up to 550 m³/h" } },
      { label: L.head, value: { ru: "до 105 м", en: "up to 105 m" } },
      { label: L.temp, value: { ru: "до +350 °C", en: "up to +350 °C" } },
    ],
    usage: { ru: "химическая промышленность, термомасляные контуры", en: "chemical industry, thermal oil circuits" },
    summary: {
      ru: "Насос с воздушным охлаждением для термомасла и маловязких промышленных масел при высокой температуре.",
      en: "An air-cooled pump for thermal oil and low-viscosity industrial oils at high temperature.",
    },
    highlights: [
      { ru: "Воздушное охлаждение", en: "Air-cooled" },
      { ru: "До +350 °C", en: "Up to +350 °C" },
      { ru: "Back-pull-out конструкция", en: "Back-pull-out design" },
      { ru: "Корпус по EN 733", en: "EN 733 dimensions" },
    ],
  },
  {
    slug: "pump-spo",
    code: "SPO",
    title: { ru: "SPO", en: "SPO" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20240628094159-7202.png",
    specs: [
      { label: L.flange, value: { ru: "NPS 1”…NPS 10”", en: "NPS 1”…NPS 10”" } },
      { label: L.capacity, value: { ru: "до 1000 м³/ч", en: "up to 1000 m³/h" } },
      { label: L.head, value: { ru: "до 350 м", en: "up to 350 m" } },
      { label: L.pressure, value: { ru: "до 51 бар", en: "up to 51 bar" } },
    ],
    usage: { ru: "нефтепереработка, энергетика, химия", en: "oil refining, energy, chemical" },
    summary: {
      ru: "Насос по API 610 (ISO 13709) для нефтепереработки, энергетики и химии — топливо, бензин, СУГ, смазочные материалы.",
      en: "An API 610 (ISO 13709) process pump for oil refining, power and chemical duties — fuel oil, gasoline, LPG, lubricants.",
    },
    highlights: [
      { ru: "API 610 / ISO 13709", en: "API 610 / ISO 13709" },
      { ru: "Тип исполнения OH2", en: "OH2 design type" },
      { ru: "До 51 бар", en: "Up to 51 bar" },
      { ru: "До +350 °C", en: "Up to +350 °C" },
    ],
  },
  {
    slug: "pump-skm-multistage",
    code: "SKM MULTISTAGE",
    title: { ru: "SKM Multistage", en: "SKM Multistage" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/Gallery/20201120080012-9227.png",
    specs: [
      { label: L.flange, value: { ru: "DN 32…DN 250 мм", en: "DN 32…DN 250 mm" } },
      { label: L.capacity, value: { ru: "до 1000 м³/ч", en: "up to 1000 m³/h" } },
      { label: L.head, value: { ru: "до 550 м", en: "up to 550 m" } },
      { label: L.pressure, value: { ru: "30 бар (63 бар)", en: "30 bar (63 bar)" } },
    ],
    usage: { ru: "водоснабжение, пожаротушение, промышленность", en: "water supply, fire fighting, industry" },
    summary: {
      ru: "Горизонтальный многоступенчатый насос кольцевой секции для высокого напора в системах водоснабжения и пожаротушения.",
      en: "A horizontal ring-section multistage pump for high head in water supply and fire fighting systems.",
    },
    highlights: [
      { ru: "10 моделей", en: "10 models" },
      { ru: "Напор до 550 м", en: "Head up to 550 m" },
      { ru: "PN 40 (63)", en: "PN 40 (63)" },
      { ru: "До 2900 об/мин", en: "Up to 2900 rpm" },
    ],
  },
  {
    slug: "pump-skm-e",
    code: "SKM-E",
    title: { ru: "SKM-E", en: "SKM-E" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20240628095910-7069.png",
    specs: [
      { label: L.flange, value: { ru: "DN 40…DN 150 мм", en: "DN 40…DN 150 mm" } },
      { label: L.capacity, value: { ru: "до 400 м³/ч", en: "up to 400 m³/h" } },
      { label: L.head, value: { ru: "до 450 м", en: "up to 450 m" } },
      { label: L.pressure, value: { ru: "30 бар (63 бар)", en: "30 bar (63 bar)" } },
    ],
    usage: { ru: "водоснабжение, промышленность", en: "water supply, industry" },
    summary: {
      ru: "Многоступенчатый насос кольцевой секции в консольном исполнении для высокого напора при умеренном расходе.",
      en: "A ring-section multistage pump in end suction design for high head at moderate flow.",
    },
    highlights: [
      { ru: "7 моделей", en: "7 models" },
      { ru: "Напор до 450 м", en: "Head up to 450 m" },
      { ru: "Консольное исполнение", en: "End suction design" },
      { ru: "До 2900 об/мин", en: "Up to 2900 rpm" },
    ],
  },
  {
    slug: "pump-skmv-h",
    code: "SKMV-H",
    title: { ru: "SKMV-H", en: "SKMV-H" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20201119135503-6073.png",
    specs: [
      { label: L.flange, value: { ru: "DN 32…DN 150 мм", en: "DN 32…DN 150 mm" } },
      { label: L.capacity, value: { ru: "до 400 м³/ч", en: "up to 400 m³/h" } },
      { label: L.head, value: { ru: "до 450 м", en: "up to 450 m" } },
      { label: L.pressure, value: { ru: "30 бар (63 бар)", en: "30 bar (63 bar)" } },
    ],
    usage: { ru: "водоснабжение, промышленность", en: "water supply, industry" },
    summary: {
      ru: "Вертикальный многоступенчатый насос кольцевой секции для компактной установки при высоком напоре.",
      en: "A vertical ring-section multistage pump for a compact footprint at high head.",
    },
    highlights: [
      { ru: "8 моделей", en: "8 models" },
      { ru: "Вертикальная компоновка", en: "Vertical layout" },
      { ru: "Напор до 450 м", en: "Head up to 450 m" },
      { ru: "PN 40 (63)", en: "PN 40 (63)" },
    ],
  },
  {
    slug: "pump-c",
    code: "C",
    title: { ru: "C", en: "C" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20190610163116-5449.jpg",
    specs: [
      { label: L.flange, value: { ru: "DN 50…DN 300 мм", en: "DN 50…DN 300 mm" } },
      { label: L.capacity, value: { ru: "до 1600 м³/ч", en: "up to 1600 m³/h" } },
      { label: L.head, value: { ru: "до 95 м", en: "up to 95 m" } },
      { label: L.pressure, value: { ru: "10 бар", en: "10 bar" } },
    ],
    usage: { ru: "канализация, очистные сооружения", en: "sewage, wastewater treatment" },
    summary: {
      ru: "Погружной канализационный насос для бытовых и промышленных стоков с волокнистыми и твёрдыми включениями, IP68.",
      en: "An IP68 submersible sewage pump for domestic and industrial wastewater with fibrous and solid particles.",
    },
    highlights: [
      { ru: "Погружное исполнение IP68", en: "Submersible IP68" },
      { ru: "20 типоразмеров", en: "20 sizes" },
      { ru: "Открытое/вихревое колесо", en: "Open or vortex impeller" },
      { ru: "До 1600 м³/ч", en: "Up to 1600 m³/h" },
    ],
  },
  {
    slug: "pump-pc",
    code: "PC / PC-VM",
    title: { ru: "PC / PC-VM", en: "PC / PC-VM" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20240628101750-6631.png",
    specs: [
      { label: L.flange, value: { ru: "DN 40…DN 300 мм", en: "DN 40…DN 300 mm" } },
      { label: L.capacity, value: { ru: "до 1600 м³/ч", en: "up to 1600 m³/h" } },
      { label: L.head, value: { ru: "до 95 м", en: "up to 95 m" } },
      { label: L.pressure, value: { ru: "10 бар (16 бар)", en: "10 bar (16 bar)" } },
    ],
    usage: { ru: "сточные воды, химия, металлургия", en: "wastewater, chemical, metallurgy" },
    summary: {
      ru: "Горизонтальный или вертикальный насос для сточных вод и технологических сред с волокнистыми и твёрдыми включениями.",
      en: "A horizontal or vertical pump for wastewater and process media with fibrous and solid particles.",
    },
    highlights: [
      { ru: "18 типоразмеров", en: "18 sizes" },
      { ru: "Гориз./верт. исполнение", en: "Horizontal/vertical" },
      { ru: "Открытое/вихревое колесо", en: "Open or vortex impeller" },
      { ru: "До 1600 м³/ч", en: "Up to 1600 m³/h" },
    ],
  },
  {
    slug: "pump-pc-v",
    code: "PC-V",
    title: { ru: "PC-V", en: "PC-V" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20190610164743-3279.jpg",
    specs: [
      { label: L.flange, value: { ru: "DN 40…DN 300 мм", en: "DN 40…DN 300 mm" } },
      { label: L.capacity, value: { ru: "до 1600 м³/ч", en: "up to 1600 m³/h" } },
      { label: L.head, value: { ru: "до 95 м", en: "up to 95 m" } },
      { label: L.temp, value: { ru: "до +95 °C", en: "up to +95 °C" } },
    ],
    usage: { ru: "приямки, сточные воды", en: "sump pits, wastewater" },
    summary: {
      ru: "Вертикальный насос для приямков сточных вод с удлинённой колонной до 4 м для удобного монтажа.",
      en: "A vertical sump-design wastewater pump with a column up to 4 m for convenient installation.",
    },
    highlights: [
      { ru: "Колонна до 4 м", en: "Column up to 4 m" },
      { ru: "Патрубок выведен на плиту", en: "Discharge to base plate" },
      { ru: "Открытое/вихревое колесо", en: "Open or vortex impeller" },
      { ru: "Фланцы PN 10", en: "PN 10 flanges" },
    ],
  },
  {
    slug: "pump-eco-snv",
    code: "ECO SNV",
    title: { ru: "ECO SNV", en: "ECO SNV" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/Detail/20240628103332-1289.png",
    specs: [
      { label: L.flange, value: { ru: "DN 32…DN 200 мм", en: "DN 32…DN 200 mm" } },
      { label: L.capacity, value: { ru: "до 900 м³/ч", en: "up to 900 m³/h" } },
      { label: L.head, value: { ru: "до 60 м", en: "up to 60 m" } },
      { label: L.temp, value: { ru: "до +95 °C", en: "up to +95 °C" } },
    ],
    usage: { ru: "технологические приямки", en: "process sump pits" },
    summary: {
      ru: "Вертикальный погружной в приямок насос для чистых и слабозагрязнённых технологических жидкостей.",
      en: "A vertical sump-design pump for clean or slightly contaminated process liquids.",
    },
    highlights: [
      { ru: "Колонна до 4 м", en: "Column up to 4 m" },
      { ru: "Балансировка ISO 1940 кл. 6.3", en: "ISO 1940 gr. 6.3 balance" },
      { ru: "Фланцы EN 1092-2 PN16", en: "EN 1092-2 PN16" },
      { ru: "До 1500 об/мин", en: "Up to 1500 rpm" },
    ],
  },
  {
    slug: "pump-skm-evk",
    code: "SKM-EVK",
    title: { ru: "SKM-EVK", en: "SKM-EVK" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/Gallery/20190610152226-5765.jpg",
    specs: [
      { label: L.flange, value: { ru: "DN 32…DN 150 мм", en: "DN 32…DN 150 mm" } },
      { label: L.capacity, value: { ru: "до 400 м³/ч", en: "up to 400 m³/h" } },
      { label: L.head, value: { ru: "до 220 м", en: "up to 220 m" } },
      { label: L.pressure, value: { ru: "30 бар", en: "30 bar" } },
    ],
    usage: { ru: "технологические приямки, высокий напор", en: "process sump pits, high head" },
    summary: {
      ru: "Вертикальный многоступенчатый насос кольцевой секции для приямков с высоким напором.",
      en: "A vertical ring-section multistage sump pump for high-head applications.",
    },
    highlights: [
      { ru: "Колонна до 4 м", en: "Column up to 4 m" },
      { ru: "Напор до 220 м", en: "Head up to 220 m" },
      { ru: "PN 40 (63)", en: "PN 40 (63)" },
      { ru: "Балансировка ISO 1940", en: "ISO 1940 balance" },
    ],
  },
  {
    slug: "pump-nmtd-plus",
    code: "NMT(D) PLUS",
    title: { ru: "NMT(D) PLUS", en: "NMT(D) PLUS" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20190610164406-3099.png",
    specs: [
      { label: L.connection, value: { ru: "резьбовое", en: "screwed" } },
      { label: L.head, value: { ru: "до 8 м", en: "up to 8 m" } },
      { label: L.power, value: { ru: "55 Вт", en: "55 W" } },
      { label: L.voltage, value: { ru: "1×230 В", en: "1×230 V" } },
    ],
    usage: { ru: "системы отопления", en: "heating systems" },
    summary: {
      ru: "Циркуляционный насос с мокрым ротором малой мощности для систем отопления частных и коммерческих объектов.",
      en: "A low-power wet rotor circulation pump for residential and commercial heating systems.",
    },
    highlights: [
      { ru: "Резьбовое соединение", en: "Screwed connection" },
      { ru: "До 8 м напора", en: "Head up to 8 m" },
      { ru: "220-230 В однофазный", en: "1×230 V single phase" },
      { ru: "До 5 м³/ч", en: "Up to 5 m³/h" },
    ],
  },
  {
    slug: "pump-nmtd-lan-f",
    code: "NMT(D) LAN F",
    title: { ru: "NMT(D) LAN F", en: "NMT(D) LAN F" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20190610161114-6862.png",
    specs: [
      { label: L.connection, value: { ru: "фланцевое", en: "flanged" } },
      { label: L.head, value: { ru: "до 18 м", en: "up to 18 m" } },
      { label: L.power, value: { ru: "1600 Вт", en: "1600 W" } },
      { label: L.capacity, value: { ru: "до 78 м³/ч", en: "up to 78 m³/h" } },
    ],
    usage: { ru: "системы отопления, ОВК", en: "heating systems, HVAC" },
    summary: {
      ru: "Фланцевый циркуляционный насос с мокрым ротором для систем отопления средней и большой мощности.",
      en: "A flanged wet rotor circulation pump for medium and large heating systems.",
    },
    highlights: [
      { ru: "Фланцевое соединение", en: "Flanged connection" },
      { ru: "До 18 м напора", en: "Head up to 18 m" },
      { ru: "До 78 м³/ч", en: "Up to 78 m³/h" },
      { ru: "PN 6/10", en: "PN 6/10" },
    ],
  },
  {
    slug: "pump-nmtd-smart-f",
    code: "NMT(D) SMART F",
    title: { ru: "NMT(D) SMART (F)", en: "NMT(D) SMART (F)" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/Gallery/20190610151314-3360.png",
    specs: [
      { label: L.connection, value: { ru: "фланцевое", en: "flanged" } },
      { label: L.head, value: { ru: "до 10 м", en: "up to 10 m" } },
      { label: L.power, value: { ru: "180 Вт", en: "180 W" } },
      { label: L.capacity, value: { ru: "до 11 м³/ч", en: "up to 11 m³/h" } },
    ],
    usage: { ru: "системы отопления", en: "heating systems" },
    summary: {
      ru: "Компактный фланцевый циркуляционный насос для систем отопления малой и средней мощности.",
      en: "A compact flanged circulation pump for small and medium heating systems.",
    },
    highlights: [
      { ru: "Фланцевое соединение", en: "Flanged connection" },
      { ru: "До 10 м напора", en: "Head up to 10 m" },
      { ru: "До 11 м³/ч", en: "Up to 11 m³/h" },
      { ru: "PN 10", en: "PN 10" },
    ],
  },
  {
    slug: "pump-nmtd-max-f",
    code: "NMT(D) MAX F",
    title: { ru: "NMT(D) MAX F", en: "NMT(D) MAX F" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/List/20190610153034-7497.png",
    specs: [
      { label: L.connection, value: { ru: "фланцевое", en: "flanged" } },
      { label: L.head, value: { ru: "до 12 м", en: "up to 12 m" } },
      { label: L.power, value: { ru: "560 Вт", en: "560 W" } },
      { label: L.capacity, value: { ru: "до 37.5 м³/ч", en: "up to 37.5 m³/h" } },
    ],
    usage: { ru: "системы отопления", en: "heating systems" },
    summary: {
      ru: "Фланцевый циркуляционный насос повышенной мощности для систем отопления.",
      en: "A higher-power flanged circulation pump for heating systems.",
    },
    highlights: [
      { ru: "Фланцевое соединение", en: "Flanged connection" },
      { ru: "До 12 м напора", en: "Head up to 12 m" },
      { ru: "До 37.5 м³/ч", en: "Up to 37.5 m³/h" },
      { ru: "PN 6/10", en: "PN 6/10" },
    ],
  },
  {
    slug: "pump-smv",
    code: "SMV",
    title: { ru: "SMV", en: "SMV" },
    category: "pumps",
    image: "https://product.standartpompa.com/AppRepo/Image/Thumbnail/20240628140437-9365.png",
    specs: [
      { label: L.flange, value: { ru: "DN 250…DN 1000 мм", en: "DN 250…DN 1000 mm" } },
      { label: L.capacity, value: { ru: "до 8000 м³/ч", en: "up to 8000 m³/h" } },
      { label: L.head, value: { ru: "до 250 м", en: "up to 250 m" } },
      { label: L.speed, value: { ru: "до 1800 об/мин", en: "up to 1800 rpm" } },
    ],
    usage: { ru: "водоснабжение крупных объектов, ирригация", en: "large-scale water supply, irrigation" },
    summary: {
      ru: "Одно- или многоступенчатый турбинный насос смешанного потока большой производительности для вертикального монтажа.",
      en: "A single or multistage mixed-flow turbine pump of high capacity for vertical mounting.",
    },
    highlights: [
      { ru: "До 8000 м³/ч", en: "Up to 8000 m³/h" },
      { ru: "Напор до 250 м", en: "Head up to 250 m" },
      { ru: "Вертикальный монтаж", en: "Vertical mounting" },
      { ru: "Без проблем вентиляции при пуске", en: "No venting issues at start" },
    ],
  },
];

export const products: Product[] = [...gearboxProducts, ...pumpProducts];

export const industries = [
  {
    slug: "mining",
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?w=1200&q=70",
    title: {
      ru: "Горнодобывающая промышленность",
      kk: "Тау-кен өнеркәсібі",
      en: "Mining industry",
    },
    text: {
      ru: "Редукторы для дробилок, питателей, ленточных конвейеров и тяжелых подъемных механизмов.",
      kk: "Ұсатқыштарға, қоректендіргіштерге, таспалы конвейерлерге және ауыр көтергіш механизмдерге арналған редукторлар.",
      en: "Gearboxes for crushers, feeders, belt conveyors and heavy-duty lifting mechanisms.",
    },
  },
  {
    slug: "cement",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=1200&q=70",
    title: {
      ru: "Цемент и стройматериалы",
      kk: "Цемент және құрылыс материалдары",
      en: "Cement and building materials",
    },
    text: {
      ru: "Приводы мельниц, элеваторов, транспортеров, смесителей и технологических линий.",
      kk: "Диірмендердің, элеваторлардың, транспортерлердің, араластырғыштардың жетектері.",
      en: "Drives for mills, elevators, conveyors, mixers and process lines.",
    },
  },
  {
    slug: "food",
    icon: Recycle,
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=70",
    title: { ru: "Пищевая переработка", kk: "Тамақ өнеркәсібі", en: "Food processing" },
    text: {
      ru: "Компактные мотор-редукторы для дозирования, упаковки, мешалок и моечных линий.",
      kk: "Дозалауға, қаптамаға, араластырғыштар мен жуу желілеріне арналған ықшам мотор-редукторлар.",
      en: "Compact gear motors for dosing, packaging, mixers and washing lines.",
    },
  },
  {
    slug: "logistics",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1200&q=70",
    title: {
      ru: "Логистика и конвейеры",
      kk: "Логистика және конвейерлер",
      en: "Logistics and conveyors",
    },
    text: {
      ru: "Вальные и цилиндрические приводы для распределительных центров и складских конвейеров.",
      kk: "Тарату орталықтары мен қойма конвейерлеріне арналған білікті және цилиндрлік жетектер.",
      en: "Shaft-mounted and helical drives for distribution centers and warehouse conveyors.",
    },
  },
  {
    slug: "energy",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1487875961445-47a00398c267?w=1200&q=70",
    title: { ru: "Энергетика", kk: "Энергетика", en: "Energy" },
    text: {
      ru: "Приводные решения для вентиляторов, насосов, топливоподачи и вспомогательного оборудования.",
      kk: "Желдеткіштерге, сорғыларға, отын беруге және қосалқы жабдыққа арналған жетек шешімдері.",
      en: "Drive solutions for fans, pumps, fuel supply and auxiliary equipment.",
    },
  },
  {
    slug: "water",
    icon: Gauge,
    image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=1200&q=70",
    title: {
      ru: "Водоканал и насосные станции",
      kk: "Су шаруашылығы және сорғы станциялары",
      en: "Water utilities and pumping stations",
    },
    text: {
      ru: "Редукторы, муфты, насосы и двигатели для насосных групп, задвижек и систем очистки.",
      kk: "Сорғы топтарына, ысырмаларға және тазарту жүйелеріне арналған редукторлар мен сорғылар.",
      en: "Gearboxes, couplings, pumps and motors for pump sets, valves and treatment systems.",
    },
  },
];

export const services = [
  {
    icon: Gauge,
    title: { ru: "Инженерный подбор", kk: "Инженерлік таңдау", en: "Engineering selection" },
    text: {
      ru: "Расчет по моменту, мощности, режиму S1-S6, коэффициенту сервиса, температуре и циклам пуска.",
      kk: "Момент, қуат, S1-S6 режимі, сервис коэффициенті, температура және іске қосу циклдері бойынша есеп.",
      en: "Sizing by torque, power, S1-S6 duty, service factor, temperature and starting cycles.",
    },
  },
  {
    icon: RotateCcw,
    title: {
      ru: "Замена импортных аналогов",
      kk: "Импорттық аналогтарды ауыстыру",
      en: "Imported analog replacement",
    },
    text: {
      ru: "Подбор по шильдику, чертежу, посадочным размерам или модели Flender, SEW, Nord, Bonfiglioli.",
      kk: "Тақтайша, сызба, отырғызу өлшемдері немесе Flender, SEW, Nord, Bonfiglioli моделі бойынша таңдау.",
      en: "Selection by nameplate, drawing, mounting dimensions or a Flender, SEW, Nord, Bonfiglioli model.",
    },
  },
  {
    icon: Boxes,
    title: {
      ru: "Комплектация приводного узла",
      kk: "Жетек торабын жинақтау",
      en: "Drive unit configuration",
    },
    text: {
      ru: "Редуктор, электродвигатель, муфта, тормоз, датчики, рама, защита и аксессуары.",
      kk: "Редуктор, электр қозғалтқыш, муфта, тежегіш, датчиктер, рама, қорғаныс және керек-жарақ.",
      en: "Gearbox, electric motor, coupling, brake, sensors, frame, guard and accessories.",
    },
  },
  {
    icon: Wrench,
    title: { ru: "Сервис и диагностика", kk: "Сервис және диагностика", en: "Service and diagnostics" },
    text: {
      ru: "Помощь с дефектовкой, рекомендациями по маслу, охлаждению, монтажу и регламенту обслуживания.",
      kk: "Ақауды анықтау, май, салқындату, орнату және қызмет көрсету регламенті бойынша көмек.",
      en: "Help with fault diagnosis, oil recommendations, cooling, mounting and maintenance schedule.",
    },
  },
  {
    icon: ShieldCheck,
    title: { ru: "Контроль поставки", kk: "Жеткізуді бақылау", en: "Delivery control" },
    text: {
      ru: "Проверка спецификации, фото-отчеты, маркировка, упаковка и подготовка документов.",
      kk: "Спецификацияны тексеру, фотоесеп, таңбалау, қаптама және құжаттарды дайындау.",
      en: "Specification check, photo reports, marking, packaging and document preparation.",
    },
  },
  {
    icon: Factory,
    title: { ru: "Проектные поставки", kk: "Жобалық жеткізілім", en: "Project supply" },
    text: {
      ru: "Сборные заявки для заводов, строительных объектов и производственных модернизаций.",
      kk: "Зауыттарға, құрылыс нысандарына және өндірісті жаңғыртуға арналған жиынтық өтінімдер.",
      en: "Bundled orders for plants, construction sites and production upgrades.",
    },
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

/** Photography used across marketing sections (industrial stock shots). */
export const siteImages = {
  heroPlant: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=1600&q=70",
  welding: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=70",
  drawings: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=70",
  texture: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=60",
  meeting: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=70",
  line: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1600&q=70",
};

/** Series shown in the "most requested" block on the home page. */
export const popularSlugs = [
  "r-series-helical-gear-motor",
  "k-series-helical-bevel-gear-motor",
  "ata-shaft-mounted-gearbox",
  "rv-nmrv-worm-gearbox",
  "hb-industrial-gear-unit",
  "pump-eco-snt",
  "p-series-planetary-gearbox",
  "yox-fluid-coupling",
];

export const popularProducts = popularSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is Product => Boolean(product));

export function countByCategory(category: CategoryKey) {
  if (category === "all") return products.length;
  return products.filter((product) => product.category === category).length;
}

export function relatedProducts(current: Product, limit = 4) {
  const sameCategory = products.filter(
    (product) => product.category === current.category && product.slug !== current.slug,
  );
  const rest = products.filter(
    (product) => product.category !== current.category && product.slug !== current.slug,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}
