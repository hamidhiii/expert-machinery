"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const locales = ["ru", "kk", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  ru: "RU",
  kk: "KZ",
  en: "EN",
};

/**
 * Catalogue copy is authored in RU/EN; `kk` is optional and falls back to RU so
 * the product texts can be translated gradually without breaking the UI.
 */
export type Localized = { ru: string; en: string; kk?: string };

export function pick(locale: Locale, value: Localized): string {
  return value[locale] ?? value.ru;
}

const STORAGE_KEY = "expert-machinery-locale";

const dictionary = {
  ru: {
    "nav.catalog": "Каталог",
    "nav.industries": "Отрасли",
    "nav.service": "Сервис",
    "nav.about": "О компании",
    "nav.contacts": "Контакты",

    "header.tagline": "Промышленные приводы",
    "header.menu": "Меню",
    "header.close": "Закрыть",
    "header.lang": "Язык",
    "header.cta": "Получить подбор",

    "common.more": "Подробнее",
    "common.all": "Все",
    "common.request": "Оставить заявку",
    "common.catalog": "Открыть каталог",
    "common.call": "Позвонить",
    "common.telegram": "Написать в Telegram",
    "common.viewAll": "Смотреть все",
    "common.viewCatalog": "Смотреть каталог",
    "common.home": "Главная",

    "home.slide1.title": "Промышленные приводы для надёжного производства",
    "home.slide1.text":
      "Подбираем и поставляем редукторы, мотор-редукторы, насосы и муфты под фактический режим работы вашей линии.",
    "home.slide2.title": "Насосы для воды, тепла и технологических линий",
    "home.slide2.text":
      "25 серий центробежных, вертикальных, многоступенчатых и циркуляционных насосов под давление, напор и температуру объекта.",
    "home.slide3.title": "Замена импортных редукторов без простоя линии",
    "home.slide3.text":
      "Подбираем аналоги SEW, Flender, Nord и Bonfiglioli по посадочным размерам, моменту и типу монтажа.",

    "home.why.eyebrow": "Почему мы",
    "home.why.title": "Почему выбирают нас",
    "home.why.display": "Инженерия, которой доверяют производства",

    "form.modalTitle": "Оставить заявку",
    "form.modalText": "Оставьте контакты — вернёмся с точным предложением.",
    "form.company": "Компания",
    "form.email": "E-mail",
    "form.message": "Сообщение",
    "form.messagePlaceholder": "Опишите вашу задачу",

    "catalog.filters": "Фильтры",
    "catalog.filter.type": "Тип оборудования",
    "catalog.filter.brand": "Производитель",
    "catalog.sort": "Сортировка",
    "catalog.sort.default": "По умолчанию",
    "catalog.sort.az": "Название: А–Я",
    "catalog.sort.za": "Название: Я–А",
    "catalog.results": "оборудования",

    "home.hero.badge": "Редукторы · Насосы · Мотор-редукторы · Муфты",
    "home.hero.title": "Промышленные приводы",
    "home.hero.titleAccent": "под вашу нагрузку",
    "home.hero.text":
      "EXPERT MACHINERY поставляет редукторы, мотор-редукторы, насосы, муфты и электродвигатели для заводов Узбекистана. Подбираем по фактическому режиму работы, а не по картинке из каталога.",
    "home.hero.point1": "Подбор по шильдику и чертежу",
    "home.hero.point2": "Замена SEW, Flender, Nord, Bonfiglioli",
    "home.hero.point3": "Ответ по заявке в течение 24 часов",

    "home.stats.items": "позиций в каталоге",
    "home.stats.series": "серий редукторов и насосов",
    "home.stats.industries": "отраслей производства",
    "home.stats.response": "первичный ответ инженера",

    "home.categories.eyebrow": "Каталог",
    "home.categories.title": "Оборудование по типам",
    "home.categories.text":
      "Каждая категория собрана вокруг реальной задачи: передать момент, поднять давление, соединить вал и защитить привод от перегрузки.",
    "home.categories.count": "поз.",

    "home.popular.eyebrow": "Популярные серии",
    "home.popular.title": "Чаще всего запрашивают",
    "home.popular.text":
      "Позиции, которые закрывают большинство задач конвейеров, мельниц и насосных групп.",

    "home.industries.eyebrow": "Отрасли",
    "home.industries.title": "Знаем условия вашего цеха",
    "home.industries.text":
      "Пуски под нагрузкой, пыль, температура, ограниченный доступ для сервиса — всё это меняет выбор серии и запас по моменту.",

    "home.process.eyebrow": "Как мы работаем",
    "home.process.title": "От задачи до спецификации",
    "home.process.step1.title": "Заявка",
    "home.process.step1.text":
      "Мощность, обороты, режим работы или просто фото шильдика старого узла.",
    "home.process.step2.title": "Инженерный подбор",
    "home.process.step2.text":
      "Серия, передаточное число, момент, тип монтажа и коэффициент сервиса.",
    "home.process.step3.title": "Спецификация",
    "home.process.step3.text": "Комплектация узла, цена, сроки поставки и документы.",
    "home.process.step4.title": "Поставка и сервис",
    "home.process.step4.text":
      "Отгрузка, рекомендации по монтажу, маслу и регламенту обслуживания.",

    "home.cta.title": "Пришлите параметры — вернём подбор и цену",
    "home.cta.text":
      "Фото шильдика, мощность двигателя, обороты и описание нагрузки — этого достаточно, чтобы предложить рабочее решение.",

    "catalog.meta.title": "Каталог редукторов и насосов | EXPERT MACHINERY",
    "catalog.hero.eyebrow": "Каталог",
    "catalog.hero.title": "Редукторы, мотор-редукторы, насосы и муфты",
    "catalog.hero.text":
      "Каталог построен вокруг задач производства: передача момента, монтаж, режим работы, замена импортных аналогов и комплектация приводного узла.",
    "catalog.search": "Серия, момент, отрасль или тип монтажа",
    "catalog.found": "Найдено",
    "catalog.items": "позиций",
    "catalog.empty.title": "Ничего не найдено",
    "catalog.empty.text": "Измените запрос или отправьте фото шильдика — подберём вручную.",
    "catalog.reset": "Сбросить фильтры",

    "product.back": "Назад в каталог",
    "product.requestPrice": "Запросить цену",
    "product.specs": "Технические параметры",
    "product.advantages": "Преимущества",
    "product.usage": "Применение",
    "product.description": "Описание",
    "product.related": "Похожие позиции",
    "product.whatToSend.title": "Что прислать для точного подбора",
    "product.whatToSend.text":
      "Мощность двигателя, входные и выходные обороты, режим работы, тип монтажа, коэффициент нагрузки и фото шильдика существующего узла.",

    "industries.meta.title": "Отрасли | EXPERT MACHINERY",
    "industries.hero.eyebrow": "Отрасли",
    "industries.hero.title": "Приводы под реальные нагрузки производства",
    "industries.hero.text":
      "Для каждой отрасли отличаются пусковые циклы, запылённость, температура и доступ для обслуживания. Мы учитываем эти условия при подборе.",
    "industries.pick": "Подбор: мощность, момент, режим работы, температура, монтаж и ресурс.",

    "service.meta.title": "Сервис и подбор | EXPERT MACHINERY",
    "service.hero.eyebrow": "Сервис",
    "service.hero.title": "Инженерная поддержка от запроса до поставки",
    "service.hero.text":
      "Мы помогаем собрать рабочую спецификацию под ваши размеры, нагрузки и ограничения по монтажу, а не просто выбрать серию из каталога.",

    "about.meta.title": "О компании | EXPERT MACHINERY",
    "about.hero.eyebrow": "О компании",
    "about.hero.title": "Промышленный партнёр по приводным решениям",
    "about.hero.text":
      "EXPERT MACHINERY работает с производственными предприятиями, проектными командами и ремонтными службами, которым нужны понятные сроки, корректная спецификация и техническая поддержка.",
    "about.values.title": "Что получает заказчик",
    "about.card1.title": "Инженерный подход",
    "about.card1.text": "Уточняем режим работы, монтаж и запас прочности до того, как назвать цену.",
    "about.card2.title": "Проверенные производители",
    "about.card2.text":
      "Редукторы, мотор-редукторы, муфты, насосы и аксессуары от заводов с историей поставок.",
    "about.card3.title": "Замена аналогов",
    "about.card3.text":
      "Подбираем решения вместо импортных узлов по посадочным размерам и параметрам.",
    "about.card4.title": "Сопровождение",
    "about.card4.text": "Помогаем со спецификацией, документами и сервисными рекомендациями.",

    "contacts.meta.title": "Контакты | EXPERT MACHINERY",
    "contacts.hero.eyebrow": "Контакты",
    "contacts.hero.title": "Свяжитесь с EXPERT MACHINERY",
    "contacts.hero.text":
      "Для точного ответа приложите фото шильдика, мощность двигателя, обороты, тип монтажа и описание нагрузки.",
    "contacts.phone": "Телефон",
    "contacts.address": "Адрес",
    "contacts.hours": "График работы",
    "contacts.hoursValue": "Пн–Сб, 09:00 – 18:00",
    "contacts.email": "E-mail",

    "form.title": "Заявка на подбор",
    "form.text": "Заполните форму — инженер вернётся с вариантами и ценой.",
    "form.name": "Ваше имя",
    "form.phone": "Телефон или Telegram",
    "form.type": "Тип оборудования",
    "form.typePlaceholder": "Например: цилиндрический редуктор",
    "form.details": "Мощность, обороты, передаточное число, модель аналога",
    "form.submit": "Отправить заявку",
    "form.success": "Заявка принята. Инженер свяжется с вами в ближайшее время.",
    "form.note": "Прототип: форма пока не отправляет данные на сервер.",

    "footer.about":
      "Поставка промышленных редукторов, мотор-редукторов, насосов, муфт и приводных решений для предприятий Узбекистана и Центральной Азии.",
    "footer.sections": "Разделы",
    "footer.contacts": "Контакты",
    "footer.rights": "Все права защищены.",
  },
  kk: {
    "nav.catalog": "Каталог",
    "nav.industries": "Салалар",
    "nav.service": "Сервис",
    "nav.about": "Компания туралы",
    "nav.contacts": "Байланыс",

    "header.tagline": "Өнеркәсіптік жетектер",
    "header.menu": "Мәзір",
    "header.close": "Жабу",
    "header.lang": "Тіл",
    "header.cta": "Таңдап беруді сұрау",

    "common.more": "Толығырақ",
    "common.all": "Барлығы",
    "common.request": "Өтінім қалдыру",
    "common.catalog": "Каталогты ашу",
    "common.call": "Қоңырау шалу",
    "common.telegram": "Telegram-ға жазу",
    "common.viewAll": "Барлығын көру",
    "common.viewCatalog": "Каталогты көру",
    "common.home": "Басты бет",

    "home.slide1.title": "Сенімді өндіріске арналған өнеркәсіптік жетектер",
    "home.slide1.text":
      "Редукторларды, мотор-редукторларды, сорғылар мен муфталарды желіңіздің нақты жұмыс режиміне қарап таңдап, жеткіземіз.",
    "home.slide2.title": "Су, жылу және технологиялық желілерге арналған сорғылар",
    "home.slide2.text":
      "Нысанның қысымына, арынына және температурасына сай ортадан тепкіш, тік, көп сатылы және циркуляциялық сорғылардың 25 сериясы.",
    "home.slide3.title": "Импорттық редукторларды желіні тоқтатпай ауыстыру",
    "home.slide3.text":
      "SEW, Flender, Nord және Bonfiglioli аналогтарын отырғызу өлшемдері, моменті және орнату түрі бойынша таңдаймыз.",

    "home.why.eyebrow": "Неге біз",
    "home.why.title": "Неліктен бізді таңдайды",
    "home.why.display": "Өндірістер сенетін инженерия",

    "form.modalTitle": "Өтінім қалдыру",
    "form.modalText": "Байланысыңызды қалдырыңыз — нақты ұсыныспен ораламыз.",
    "form.company": "Компания",
    "form.email": "E-mail",
    "form.message": "Хабарлама",
    "form.messagePlaceholder": "Міндетіңізді сипаттаңыз",

    "catalog.filters": "Сүзгілер",
    "catalog.filter.type": "Жабдық түрі",
    "catalog.filter.brand": "Өндіруші",
    "catalog.sort": "Сұрыптау",
    "catalog.sort.default": "Әдепкі бойынша",
    "catalog.sort.az": "Атауы: А–Я",
    "catalog.sort.za": "Атауы: Я–А",
    "catalog.results": "жабдық",

    "home.hero.badge": "Редукторлар · Сорғылар · Мотор-редукторлар · Муфталар",
    "home.hero.title": "Өнеркәсіптік жетектер",
    "home.hero.titleAccent": "сіздің жүктемеңізге",
    "home.hero.text":
      "EXPERT MACHINERY зауыттарға редукторлар, мотор-редукторлар, сорғылар, муфталар мен электр қозғалтқыштарын жеткізеді. Жабдықты каталогтағы суретке емес, нақты жұмыс режиміне қарап таңдаймыз.",
    "home.hero.point1": "Зауыттық тақтайша мен сызба бойынша таңдау",
    "home.hero.point2": "SEW, Flender, Nord, Bonfiglioli аналогтарын ауыстыру",
    "home.hero.point3": "Өтінімге 24 сағат ішінде жауап",

    "home.stats.items": "каталогтағы позиция",
    "home.stats.series": "редуктор мен сорғы сериясы",
    "home.stats.industries": "өнеркәсіп саласы",
    "home.stats.response": "инженердің алғашқы жауабы",

    "home.categories.eyebrow": "Каталог",
    "home.categories.title": "Жабдық түрлері бойынша",
    "home.categories.text":
      "Әр санат нақты міндетке құрылған: айналу моментін беру, қысымды көтеру, білікті жалғау және жетекті шамадан тыс жүктемеден қорғау.",
    "home.categories.count": "поз.",

    "home.popular.eyebrow": "Танымал сериялар",
    "home.popular.title": "Жиі сұралатын позициялар",
    "home.popular.text":
      "Конвейерлер, диірмендер мен сорғы топтарының көп мәселесін жабатын шешімдер.",

    "home.industries.eyebrow": "Салалар",
    "home.industries.title": "Цехыңыздың жағдайын білеміз",
    "home.industries.text":
      "Жүктемемен іске қосу, шаң, температура, қызмет көрсетуге шектеулі қолжетімділік — бәрі серия мен момент қорын таңдауға әсер етеді.",

    "home.process.eyebrow": "Жұмыс тәртібі",
    "home.process.title": "Міндеттен спецификацияға дейін",
    "home.process.step1.title": "Өтінім",
    "home.process.step1.text":
      "Қуаты, айналымы, жұмыс режимі немесе ескі тораптың тақтайша суреті.",
    "home.process.step2.title": "Инженерлік таңдау",
    "home.process.step2.text":
      "Серия, беріліс саны, момент, орнату түрі және сервис коэффициенті.",
    "home.process.step3.title": "Спецификация",
    "home.process.step3.text": "Тораптың жинағы, бағасы, жеткізу мерзімі және құжаттар.",
    "home.process.step4.title": "Жеткізу және сервис",
    "home.process.step4.text": "Тиеу, орнату, май және қызмет көрсету бойынша ұсыныстар.",

    "home.cta.title": "Параметрлерді жіберіңіз — таңдау мен бағаны қайтарамыз",
    "home.cta.text":
      "Тақтайша суреті, қозғалтқыш қуаты, айналымы және жүктеме сипаттамасы — жұмыс шешімін ұсыну үшін жеткілікті.",

    "catalog.meta.title": "Редукторлар мен сорғылар каталогы | EXPERT MACHINERY",
    "catalog.hero.eyebrow": "Каталог",
    "catalog.hero.title": "Редукторлар, мотор-редукторлар, сорғылар және муфталар",
    "catalog.hero.text":
      "Каталог өндіріс міндеттеріне құрылған: момент беру, орнату, жұмыс режимі, импорттық аналогтарды ауыстыру және жетек торабын жинақтау.",
    "catalog.search": "Серия, момент, сала немесе орнату түрі",
    "catalog.found": "Табылды",
    "catalog.items": "позиция",
    "catalog.empty.title": "Ештеңе табылмады",
    "catalog.empty.text":
      "Сұранысты өзгертіңіз немесе тақтайша суретін жіберіңіз — қолмен таңдаймыз.",
    "catalog.reset": "Сүзгіні тазалау",

    "product.back": "Каталогқа қайту",
    "product.requestPrice": "Бағасын сұрау",
    "product.specs": "Техникалық параметрлер",
    "product.advantages": "Артықшылықтары",
    "product.usage": "Қолданылуы",
    "product.description": "Сипаттамасы",
    "product.related": "Ұқсас позициялар",
    "product.whatToSend.title": "Дәл таңдау үшін не жіберу керек",
    "product.whatToSend.text":
      "Қозғалтқыш қуаты, кіріс және шығыс айналымы, жұмыс режимі, орнату түрі, жүктеме коэффициенті және қолданыстағы тораптың тақтайша суреті.",

    "industries.meta.title": "Салалар | EXPERT MACHINERY",
    "industries.hero.eyebrow": "Салалар",
    "industries.hero.title": "Өндірістің нақты жүктемесіне арналған жетектер",
    "industries.hero.text":
      "Әр салада іске қосу циклдері, шаңдану, температура және қызмет көрсету мүмкіндігі әртүрлі. Таңдау кезінде осы жағдайларды ескереміз.",
    "industries.pick": "Таңдау: қуат, момент, жұмыс режимі, температура, орнату және ресурс.",

    "service.meta.title": "Сервис және таңдау | EXPERT MACHINERY",
    "service.hero.eyebrow": "Сервис",
    "service.hero.title": "Өтінімнен жеткізуге дейінгі инженерлік қолдау",
    "service.hero.text":
      "Каталогтан серия таңдап қана қоймай, сіздің өлшемдеріңізге, жүктемеңізге және орнату шектеулеріңізге сай спецификация жинауға көмектесеміз.",

    "about.meta.title": "Компания туралы | EXPERT MACHINERY",
    "about.hero.eyebrow": "Компания туралы",
    "about.hero.title": "Жетек шешімдері бойынша өнеркәсіптік серіктес",
    "about.hero.text":
      "EXPERT MACHINERY нақты мерзім, дұрыс спецификация және техникалық қолдау қажет өндірістік кәсіпорындармен, жобалау топтарымен және жөндеу қызметтерімен жұмыс істейді.",
    "about.values.title": "Тапсырыс беруші не алады",
    "about.card1.title": "Инженерлік тәсіл",
    "about.card1.text":
      "Бағаны айтпас бұрын жұмыс режимін, орнатуды және беріктік қорын нақтылаймыз.",
    "about.card2.title": "Сенімді өндірушілер",
    "about.card2.text":
      "Жеткізу тарихы бар зауыттардың редукторлары, муфталары, сорғылары және керек-жарақтары.",
    "about.card3.title": "Аналогтарды ауыстыру",
    "about.card3.text":
      "Импорттық тораптардың орнына отырғызу өлшемдері мен параметрлері бойынша шешім таңдаймыз.",
    "about.card4.title": "Сүйемелдеу",
    "about.card4.text": "Спецификация, құжаттар және сервистік ұсыныстармен көмектесеміз.",

    "contacts.meta.title": "Байланыс | EXPERT MACHINERY",
    "contacts.hero.eyebrow": "Байланыс",
    "contacts.hero.title": "EXPERT MACHINERY-мен байланысыңыз",
    "contacts.hero.text":
      "Дәл жауап алу үшін тақтайша суретін, қозғалтқыш қуатын, айналымын, орнату түрін және жүктеме сипаттамасын жіберіңіз.",
    "contacts.phone": "Телефон",
    "contacts.address": "Мекенжай",
    "contacts.hours": "Жұмыс кестесі",
    "contacts.hoursValue": "Дс–Сб, 09:00 – 18:00",
    "contacts.email": "E-mail",

    "form.title": "Таңдауға өтінім",
    "form.text": "Форманы толтырыңыз — инженер нұсқалар мен бағаны қайтарады.",
    "form.name": "Атыңыз",
    "form.phone": "Телефон немесе Telegram",
    "form.type": "Жабдық түрі",
    "form.typePlaceholder": "Мысалы: цилиндрлік редуктор",
    "form.details": "Қуаты, айналымы, беріліс саны, аналог моделі",
    "form.submit": "Өтінім жіберу",
    "form.success": "Өтінім қабылданды. Инженер жақын арада хабарласады.",
    "form.note": "Прототип: форма әзірге серверге деректер жібермейді.",

    "footer.about":
      "Өзбекстан және Орталық Азия кәсіпорындарына өнеркәсіптік редукторлар, мотор-редукторлар, сорғылар, муфталар мен жетек шешімдерін жеткізу.",
    "footer.sections": "Бөлімдер",
    "footer.contacts": "Байланыс",
    "footer.rights": "Барлық құқықтар қорғалған.",
  },
  en: {
    "nav.catalog": "Catalog",
    "nav.industries": "Industries",
    "nav.service": "Service",
    "nav.about": "About",
    "nav.contacts": "Contacts",

    "header.tagline": "Industrial drives",
    "header.menu": "Menu",
    "header.close": "Close",
    "header.lang": "Language",
    "header.cta": "Get a selection",

    "common.more": "Details",
    "common.all": "All",
    "common.request": "Send a request",
    "common.catalog": "Open catalog",
    "common.call": "Call us",
    "common.telegram": "Message on Telegram",
    "common.viewAll": "View all",
    "common.viewCatalog": "View catalog",
    "common.home": "Home",

    "home.slide1.title": "Industrial drives for dependable production",
    "home.slide1.text":
      "We select and supply gearboxes, gear motors, pumps and couplings matched to the real duty cycle of your line.",
    "home.slide2.title": "Pumps for water, heating and process lines",
    "home.slide2.text":
      "25 series of centrifugal, vertical, multistage and circulation pumps matched to the pressure, head and temperature on site.",
    "home.slide3.title": "Replace imported gearboxes without stopping the line",
    "home.slide3.text":
      "We match SEW, Flender, Nord and Bonfiglioli units by mounting dimensions, torque and mounting type.",

    "home.why.eyebrow": "Why us",
    "home.why.title": "Why customers choose us",
    "home.why.display": "Engineering that production floors rely on",

    "form.modalTitle": "Send a request",
    "form.modalText": "Leave your contacts — we will come back with a precise offer.",
    "form.company": "Company",
    "form.email": "E-mail",
    "form.message": "Message",
    "form.messagePlaceholder": "Describe your task",

    "catalog.filters": "Filters",
    "catalog.filter.type": "Equipment type",
    "catalog.filter.brand": "Manufacturer",
    "catalog.sort": "Sort",
    "catalog.sort.default": "Default",
    "catalog.sort.az": "Name: A–Z",
    "catalog.sort.za": "Name: Z–A",
    "catalog.results": "items",

    "home.hero.badge": "Gearboxes · Pumps · Gear motors · Couplings",
    "home.hero.title": "Industrial drives",
    "home.hero.titleAccent": "sized for your load",
    "home.hero.text":
      "EXPERT MACHINERY supplies gearboxes, gear motors, pumps, couplings and electric motors to plants across Uzbekistan. We size equipment by the actual duty cycle, not by a catalog picture.",
    "home.hero.point1": "Selection by nameplate and drawing",
    "home.hero.point2": "Replacement for SEW, Flender, Nord, Bonfiglioli",
    "home.hero.point3": "First response within 24 hours",

    "home.stats.items": "items in the catalog",
    "home.stats.series": "gearbox and pump series",
    "home.stats.industries": "industries served",
    "home.stats.response": "first engineering reply",

    "home.categories.eyebrow": "Catalog",
    "home.categories.title": "Equipment by type",
    "home.categories.text":
      "Every category is built around a real job: transmit torque, raise pressure, connect a shaft and protect the drive from overload.",
    "home.categories.count": "items",

    "home.popular.eyebrow": "Popular series",
    "home.popular.title": "Most requested items",
    "home.popular.text": "The units that cover most conveyor, mill and pump-station tasks.",

    "home.industries.eyebrow": "Industries",
    "home.industries.title": "We know your shop floor conditions",
    "home.industries.text":
      "Loaded starts, dust, temperature and limited service access all change the series and the torque margin we recommend.",

    "home.process.eyebrow": "How we work",
    "home.process.title": "From the task to the specification",
    "home.process.step1.title": "Request",
    "home.process.step1.text":
      "Power, speed, duty cycle — or simply a photo of the old unit nameplate.",
    "home.process.step2.title": "Engineering selection",
    "home.process.step2.text": "Series, gear ratio, torque, mounting type and service factor.",
    "home.process.step3.title": "Specification",
    "home.process.step3.text": "Unit configuration, price, lead time and supporting documents.",
    "home.process.step4.title": "Delivery and service",
    "home.process.step4.text":
      "Shipment plus mounting, lubrication and maintenance recommendations.",

    "home.cta.title": "Send your parameters — get a selection and a price",
    "home.cta.text":
      "A nameplate photo, motor power, speed and a load description are enough for us to propose a working solution.",

    "catalog.meta.title": "Gearbox and pump catalog | EXPERT MACHINERY",
    "catalog.hero.eyebrow": "Catalog",
    "catalog.hero.title": "Gearboxes, gear motors, pumps and couplings",
    "catalog.hero.text":
      "The catalog is built around production tasks: torque transmission, mounting, duty cycle, replacement of imported analogs and drive unit configuration.",
    "catalog.search": "Series, torque, industry or mounting type",
    "catalog.found": "Found",
    "catalog.items": "items",
    "catalog.empty.title": "Nothing found",
    "catalog.empty.text":
      "Change the query or send a nameplate photo — we will select it manually.",
    "catalog.reset": "Reset filters",

    "product.back": "Back to catalog",
    "product.requestPrice": "Request a price",
    "product.specs": "Technical parameters",
    "product.advantages": "Advantages",
    "product.usage": "Application",
    "product.description": "Description",
    "product.related": "Similar items",
    "product.whatToSend.title": "What to send for an accurate selection",
    "product.whatToSend.text":
      "Motor power, input and output speed, duty cycle, mounting type, load factor and a nameplate photo of the existing unit.",

    "industries.meta.title": "Industries | EXPERT MACHINERY",
    "industries.hero.eyebrow": "Industries",
    "industries.hero.title": "Drives matched to real production loads",
    "industries.hero.text":
      "Start cycles, dust levels, temperature and service access differ in every industry. We take these conditions into account during selection.",
    "industries.pick": "Selection: power, torque, duty cycle, temperature, mounting and service life.",

    "service.meta.title": "Service and selection | EXPERT MACHINERY",
    "service.hero.eyebrow": "Service",
    "service.hero.title": "Engineering support from request to delivery",
    "service.hero.text":
      "We help you build a working specification for your dimensions, loads and mounting constraints — not just pick a series from the catalog.",

    "about.meta.title": "About | EXPERT MACHINERY",
    "about.hero.eyebrow": "About",
    "about.hero.title": "An industrial partner for drive solutions",
    "about.hero.text":
      "EXPERT MACHINERY works with manufacturing plants, project teams and maintenance services that need clear lead times, an accurate specification and technical support.",
    "about.values.title": "What the customer gets",
    "about.card1.title": "Engineering approach",
    "about.card1.text": "We clarify duty cycle, mounting and safety margin before quoting a price.",
    "about.card2.title": "Proven manufacturers",
    "about.card2.text":
      "Gearboxes, gear motors, couplings, pumps and accessories from plants with a supply record.",
    "about.card3.title": "Analog replacement",
    "about.card3.text": "We match imported units by mounting dimensions and parameters.",
    "about.card4.title": "Support",
    "about.card4.text": "We help with specification, documents and service recommendations.",

    "contacts.meta.title": "Contacts | EXPERT MACHINERY",
    "contacts.hero.eyebrow": "Contacts",
    "contacts.hero.title": "Get in touch with EXPERT MACHINERY",
    "contacts.hero.text":
      "For an accurate answer, attach a nameplate photo, motor power, speed, mounting type and load description.",
    "contacts.phone": "Phone",
    "contacts.address": "Address",
    "contacts.hours": "Working hours",
    "contacts.hoursValue": "Mon–Sat, 09:00 – 18:00",
    "contacts.email": "E-mail",

    "form.title": "Selection request",
    "form.text": "Fill in the form — an engineer will come back with options and a price.",
    "form.name": "Your name",
    "form.phone": "Phone or Telegram",
    "form.type": "Equipment type",
    "form.typePlaceholder": "For example: helical gearbox",
    "form.details": "Power, speed, gear ratio, analog model",
    "form.submit": "Send request",
    "form.success": "Request received. An engineer will contact you shortly.",
    "form.note": "Prototype: the form does not submit data to a server yet.",

    "footer.about":
      "Supply of industrial gearboxes, gear motors, pumps, couplings and drive solutions for plants in Uzbekistan and Central Asia.",
    "footer.sections": "Sections",
    "footer.contacts": "Contacts",
    "footer.rights": "All rights reserved.",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type TranslationKey = keyof (typeof dictionary)["ru"];

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  tr: (value: Localized) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (locales as readonly string[]).includes(stored)) {
      setLocaleState(stored as Locale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => dictionary[locale][key] ?? dictionary.ru[key],
    [locale],
  );

  const tr = useCallback((value: Localized) => pick(locale, value), [locale]);

  const value = useMemo(() => ({ locale, setLocale, t, tr }), [locale, setLocale, t, tr]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
