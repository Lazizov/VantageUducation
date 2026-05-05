// --- State & Elements ---
const htmlEl = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const currentLangText = document.getElementById('currentLang');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

// --- Localization Dictionary ---
const translations = {
    ru: {
        title: "Vantage Education Center",
        nav_about: "О нас",
        nav_courses: "Курсы",
        nav_contacts: "Контакты",
        courses_title: "Наши курсы",
        courses_subtitle: "Выберите программу, которая подходит именно вам.",
        course1_title: "General English",
        course1_desc: "Общий курс английского языка для всех уровней.",
        course2_title: "IELTS Preparation",
        course2_desc: "Интенсивная подготовка к международному экзамену IELTS.",
        course3_title: "Kids English",
        course3_desc: "Увлекательный английский для детей от 7 лет.",
        logo_sub: "EDUCATION CENTER",
        open_map: "Открыть в картах",
        c_level: "Уровень:",
        c_age: "Возраст:",
        c_price: "Стоимость в месяц:",
        c_mat: "Материалы:",
        c1_level: "Beginner - Advanced",
        c1_age: "от 12 лет",
        c1_price: "500,000 UZS",
        c1_mat: "Книга (150,000 UZS)",
        c2_level: "Intermediate+",
        c2_age: "от 15 лет",
        c2_price: "600,000 UZS",
        c2_mat: "Книга + тесты (200,000 UZS)",
        c3_level: "Starters, Movers",
        c3_age: "7 - 11 лет",
        c3_price: "450,000 UZS",
        c3_mat: "Книга (150,000 UZS)",
        courses_page_title: "Наши Учебные Программы",
        courses_page_subtitle: "От базового английского до подготовки к международным экзаменам.",
        view_all_courses: "Смотреть все курсы ➔",
        course_sat_title: "SAT Preparation",
        course_sat_desc: "Подготовка к сдаче американского экзамена SAT для поступления в топ-вузы.",
        csat_level: "Upper-Intermediate+",
        csat_age: "от 14 лет",
        csat_price: "800,000 UZS",
        csat_mat: "Книга + тесты (250,000 UZS)",
        course_presat_title: "Pre-SAT",
        course_presat_desc: "Базовая подготовка по английскому и математике перед основным курсом SAT.",
        cpresat_level: "Intermediate",
        cpresat_age: "от 13 лет",
        cpresat_price: "650,000 UZS",
        cpresat_mat: "Книга (200,000 UZS)",
        course_maths_title: "Maths (на английском)",
        course_maths_desc: "Изучение математики на английском языке для международных экзаменов.",
        cmaths_level: "Pre-Intermediate+",
        cmaths_age: "от 12 лет",
        cmaths_price: "550,000 UZS",
        cmaths_mat: "Рабочая тетрадь (150,000 UZS)",
        hero_title: "Мы не просто обучаем, мы меняем жизни людей!",
        hero_subtitle: "В Vantage мы создаем атмосферу, где каждый студент достигает своих целей и открывает новые горизонты.",
        hero_btn: "Запишитесь на первый урок ✨",
        stat_years: "лет опыта",
        stat_students: "студентов обучено",
        stat_branches: "главный офис",
        stat_staff: "опытных сотрудников",
        features_title: "Почему выбирают нас?",
        features_subtitle: "Центр изучения языков Vantage занимается обучением молодежи с 2014 года.",
        feature1_title: "Дополнительные занятия",
        feature1_desc: "Если вы не смогли хорошо усвоить тему, вторые учителя всегда будут рядом и помогут вам.",
        feature2_title: "Опытные преподаватели",
        feature2_desc: "Каждый преподаватель прошел специальные курсы повышения квалификации. Наши уважаемые преподаватели имеют высокие результаты IELTS.",
        feature3_title: "Бесплатные мероприятия",
        feature3_desc: "Speaking clubs, movie nights и общение со знаменитостями — совершенно бесплатно для студентов.",
        feature4_title: "Тестовый Центр",
        feature4_desc: "У нас есть отдельный тестовый центр, где вы можете сдать MOCK экзамены для подготовки.",
        feature5_title: "Co-working зоны",
        feature5_desc: "Специальные co-working зоны для наших учеников, где можно свободно заниматься вне уроков.",
        promo_title: "Сила Сертификата",
        promo_subtitle: "Наши сертификаты признаны ведущими работодателями и университетами страны. Откройте свое будущее!",
        contacts_title: "Наши контакты",
        contacts_subtitle: "Свяжитесь с нами или приходите в наш главный офис.",
        form_name: "Ваше имя",
        form_phone: "Номер телефона",
        form_problem: "Кратко опишите причину обращения",
        form_btn: "Отправить заявку",
        address_text: "г. Ташкент, Чиланзарский район, ул. Чопон ота, Ц квартал, дом 4Б",
        footer_desc: "Образовательный центр, меняющий жизни через знания.",
        footer_links: "Ссылки",
        footer_social: "Социальные сети",
        footer_rights: "Все права защищены."
    },
    en: {
        title: "Vantage Education Center",
        nav_about: "About Us",
        nav_courses: "Courses",
        nav_contacts: "Contacts",
        courses_title: "Our Courses",
        courses_subtitle: "Choose the program that suits you best.",
        course1_title: "General English",
        course1_desc: "General English course for all levels.",
        course2_title: "IELTS Preparation",
        course2_desc: "Intensive preparation for the international IELTS exam.",
        course3_title: "Kids English",
        course3_desc: "Engaging English for kids from 7 years old.",
        logo_sub: "EDUCATION CENTER",
        open_map: "Open in Maps",
        c_level: "Level:",
        c_age: "Age:",
        c_price: "Monthly Price:",
        c_mat: "Materials:",
        c1_level: "Beginner - Advanced",
        c1_age: "12+ years",
        c1_price: "500,000 UZS",
        c1_mat: "Book (150,000 UZS)",
        c2_level: "Intermediate+",
        c2_age: "15+ years",
        c2_price: "600,000 UZS",
        c2_mat: "Book + tests (200,000 UZS)",
        c3_level: "Starters, Movers",
        c3_age: "7 - 11 years",
        c3_price: "450,000 UZS",
        c3_mat: "Book (150,000 UZS)",
        courses_page_title: "Our Educational Programs",
        courses_page_subtitle: "From basic English to international exam preparation.",
        view_all_courses: "View all courses ➔",
        course_sat_title: "SAT Preparation",
        course_sat_desc: "Preparation for the American SAT exam for admission to top universities.",
        csat_level: "Upper-Intermediate+",
        csat_age: "14+ years",
        csat_price: "800,000 UZS",
        csat_mat: "Book + tests (250,000 UZS)",
        course_presat_title: "Pre-SAT",
        course_presat_desc: "Basic preparation in English and Mathematics before the main SAT course.",
        cpresat_level: "Intermediate",
        cpresat_age: "13+ years",
        cpresat_price: "650,000 UZS",
        cpresat_mat: "Book (200,000 UZS)",
        course_maths_title: "Maths (in English)",
        course_maths_desc: "Studying mathematics in English for international exams.",
        cmaths_level: "Pre-Intermediate+",
        cmaths_age: "12+ years",
        cmaths_price: "550,000 UZS",
        cmaths_mat: "Workbook (150,000 UZS)",
        hero_title: "We don't just teach, we change people's lives!",
        hero_subtitle: "At Vantage, we create an environment where every student achieves their goals and discovers new horizons.",
        hero_btn: "Sign up for the first lesson",
        stat_years: "years of experience",
        stat_students: "students trained",
        stat_branches: "main office",
        stat_staff: "experienced staff",
        features_title: "Why choose us?",
        features_subtitle: "Vantage Language Learning Center has been educating youth since 2014.",
        feature1_title: "Extra Classes",
        feature1_desc: "If you didn't grasp the topic well, second teachers will always be there to help you.",
        feature2_title: "Experienced Teachers",
        feature2_desc: "Every teacher has passed special qualification courses. Our esteemed teachers have high IELTS scores.",
        feature3_title: "Free Events",
        feature3_desc: "Speaking clubs, movie nights, and celebrity talks — completely free for students.",
        feature4_title: "Test Center",
        feature4_desc: "We have a separate test center where you can take MOCK exams for preparation.",
        feature5_title: "Co-working zones",
        feature5_desc: "Special co-working areas for our students where you can study freely outside of lessons.",
        promo_title: "Power of the Certificate",
        promo_subtitle: "Our certificates are recognized by leading employers and universities. Unlock your future!",
        contacts_title: "Our Contacts",
        contacts_subtitle: "Contact us or visit our main office.",
        form_name: "Your Name",
        form_phone: "Phone Number",
        form_problem: "Briefly describe your request",
        form_btn: "Send Request",
        address_text: "Tashkent, Chilanzar district, Chopon ota street, block C, house 4B",
        footer_desc: "An educational center changing lives through knowledge.",
        footer_links: "Links",
        footer_social: "Social Media",
        footer_rights: "All rights reserved."
    },
    uz: {
        title: "Vantage Education Center",
        nav_about: "Biz haqimizda",
        nav_courses: "Kurslar",
        nav_contacts: "Kontaktlar",
        courses_title: "Bizning kurslar",
        courses_subtitle: "O'zingizga mos dasturni tanlang.",
        course1_title: "General English",
        course1_desc: "Barcha darajalar uchun umumiy ingliz tili kursi.",
        course2_title: "IELTS Preparation",
        course2_desc: "Xalqaro IELTS imtihoniga intensiv tayyorgarlik.",
        course3_title: "Kids English",
        course3_desc: "7 yoshdan oshgan bolalar uchun qiziqarli ingliz tili.",
        logo_sub: "TA'LIM MARKAZI",
        open_map: "Xaritada ochish",
        c_level: "Daraja:",
        c_age: "Yosh:",
        c_price: "Oylik to'lov:",
        c_mat: "Materiallar:",
        c1_level: "Beginner - Advanced",
        c1_age: "12 yoshdan",
        c1_price: "500,000 UZS",
        c1_mat: "Kitob (150,000 UZS)",
        c2_level: "Intermediate+",
        c2_age: "15 yoshdan",
        c2_price: "600,000 UZS",
        c2_mat: "Kitob + testlar (200,000 UZS)",
        c3_level: "Starters, Movers",
        c3_age: "7 - 11 yosh",
        c3_price: "450,000 UZS",
        c3_mat: "Kitob (150,000 UZS)",
        courses_page_title: "Bizning O'quv Dasturlarimiz",
        courses_page_subtitle: "Asosiy ingliz tilidan xalqaro imtihonlarga tayyorgarlikgacha.",
        view_all_courses: "Barcha kurslarni ko'rish ➔",
        course_sat_title: "SAT Tayyorgarlik",
        course_sat_desc: "Top universitetlarga kirish uchun Amerika SAT imtihoniga tayyorgarlik.",
        csat_level: "Upper-Intermediate+",
        csat_age: "14 yoshdan",
        csat_price: "800,000 UZS",
        csat_mat: "Kitob + testlar (250,000 UZS)",
        course_presat_title: "Pre-SAT",
        course_presat_desc: "Asosiy SAT kursidan oldin ingliz tili va matematika bo'yicha tayyorgarlik.",
        cpresat_level: "Intermediate",
        cpresat_age: "13 yoshdan",
        cpresat_price: "650,000 UZS",
        cpresat_mat: "Kitob (200,000 UZS)",
        course_maths_title: "Matematika (Ingliz tilida)",
        course_maths_desc: "Xalqaro imtihonlar uchun ingliz tilida matematika o'rganish.",
        cmaths_level: "Pre-Intermediate+",
        cmaths_age: "12 yoshdan",
        cmaths_price: "550,000 UZS",
        cmaths_mat: "Ish daftari (150,000 UZS)",
        hero_title: "Biz shunchaki o'rgatmaymiz, insonlar hayotini o'zgartiramiz!",
        hero_subtitle: "Vantage-da biz har bir o'quvchi o'z maqsadiga erishadigan va yangi ufqlarni ochadigan muhit yaratamiz.",
        hero_btn: "Birinchi darsga yoziling",
        stat_years: "yillik tajriba",
        stat_students: "o'quvchilar o'qitildi",
        stat_branches: "bosh ofis",
        stat_staff: "tajribali xodimlar",
        features_title: "Nima uchun bizni tanlashadi?",
        features_subtitle: "Vantage tillarni o'rganish markazi 2014 yildan beri yoshlarga ta'lim berib kelmoqda.",
        feature1_title: "Qo'shimcha darslar",
        feature1_desc: "Agar mavzuni yaxshi o'zlashtira olmasangiz, ikkinchi o'qituvchilar doimo yonizda bo'lib yordam berishadi.",
        feature2_title: "Tajribali o'qituvchilar",
        feature2_desc: "Har bir o'qituvchi maxsus malaka oshirish kurslaridan o'tgan. Hurmatli ustozlarimiz yuqori IELTS natijalariga ega.",
        feature3_title: "Bepul tadbirlar",
        feature3_desc: "Speaking klublar, kino kechalari va mashhurlar bilan uchrashuvlar — o'quvchilar uchun mutlaqo bepul.",
        feature4_title: "Test Markazi",
        feature4_desc: "Tayyorgarlik ko'rish uchun MOCK imtihonlarini topshirishingiz mumkin bo'lgan alohida test markazimiz mavjud.",
        feature5_title: "Co-working zonalari",
        feature5_desc: "O'quvchilarimiz uchun darsdan tashqari erkin shug'ullanish mumkin bo'lgan maxsus co-working zonalari.",
        promo_title: "Sertifikat Kuchi",
        promo_subtitle: "Bizning sertifikatlarimiz yetakchi ish beruvchilar va universitetlar tomonidan tan olingan. Kelajagingizni oching!",
        contacts_title: "Bizning kontaktlar",
        contacts_subtitle: "Biz bilan bog'laning yoki bosh ofisimizga tashrif buyuring.",
        form_name: "Ismingiz",
        form_phone: "Telefon raqamingiz",
        form_problem: "Murojaat sababini qisqacha yozing",
        form_btn: "Ariza yuborish",
        address_text: "Toshkent sh., Chilonzor tumani, Cho'pon ota ko'chasi, C mavze, 4B uy",
        footer_desc: "Bilim orqali hayotni o'zgartiruvchi ta'lim markazi.",
        footer_links: "Havolalar",
        footer_social: "Ijtimoiy tarmoqlar",
        footer_rights: "Barcha huquqlar himoyalangan."
    }
};

// --- Theme Toggling ---
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// --- Localization ---
function updateLanguage(langCode) {
    const strings = translations[langCode];
    if (!strings) return;

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (strings[key]) {
            el.innerHTML = strings[key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (strings[key]) {
            el.setAttribute('placeholder', strings[key]);
        }
    });

    // Update title
    document.title = strings['title'];
    htmlEl.setAttribute('lang', langCode);
    currentLangText.textContent = langCode.toUpperCase();
    localStorage.setItem('lang', langCode);
}

langBtn.addEventListener('click', () => {
    langDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// Change language
langDropdown.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
        const langCode = item.getAttribute('data-lang');
        updateLanguage(langCode);
        langDropdown.classList.remove('active');
    });
});

// Init Language
function initLanguage() {
    const savedLang = localStorage.getItem('lang') || 'ru';
    updateLanguage(savedLang);
}

// --- Mobile Menu ---
mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
});

// --- Telegram Form Submission ---
const telegramForm = document.getElementById('telegramForm');
const formStatus = document.getElementById('formStatus');

if (telegramForm) {
    telegramForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const phone = document.getElementById('userPhone').value;
        const problem = document.getElementById('userProblem').value;
        const submitBtn = document.getElementById('submitBtn');
        const currentLang = localStorage.getItem('lang') || 'ru';
        
        const BOT_TOKEN = '8732035671:AAH-pBJdQVpvt3eoNULxiBsGWkG4OEJmCcA';
        const CHAT_IDS = ['8468517793', '7168418095'];

        const message = `🌟 Новая заявка с сайта Vantage!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💬 Причина обращения: ${problem}`;
        submitBtn.disabled = true;
        
        try {
            // Send message to all chat IDs
            const promises = CHAT_IDS.map(chatId => {
                return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                    })
                });
            });

            const responses = await Promise.all(promises);
            const allOk = responses.every(res => res.ok);

            if (allOk) {
                formStatus.textContent = currentLang === 'ru' ? 'Заявка успешно отправлена!' : 
                                        currentLang === 'uz' ? 'Ariza muvaffaqiyatli yuborildi!' : 
                                        'Request successfully sent!';
                formStatus.className = 'form-status success';
                telegramForm.reset();
            } else {
                throw new Error('Failed to send to one or more chats');
            }
        } catch (error) {
            formStatus.textContent = currentLang === 'ru' ? 'Произошла ошибка при отправке. Попробуйте позже.' : 
                                    currentLang === 'uz' ? 'Yuborishda xatolik yuz berdi. Keyinroq qayta urinib ko\'ring.' : 
                                    'An error occurred while sending. Please try again later.';
            formStatus.className = 'form-status error';
        }
        
        submitBtn.disabled = false;
        formStatus.style.display = 'block';
        
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    });
}

// --- Video Player Logic ---
const videoWrapper = document.getElementById('videoWrapper');
const aboutVideo = document.getElementById('aboutVideo');
const playBtn = document.getElementById('playBtn');

if (videoWrapper && aboutVideo && playBtn) {
    videoWrapper.addEventListener('click', () => {
        if (aboutVideo.paused) {
            aboutVideo.play();
            playBtn.style.opacity = '0';
            playBtn.style.pointerEvents = 'none';
        } else {
            aboutVideo.pause();
            playBtn.style.opacity = '1';
        }
    });

    aboutVideo.addEventListener('ended', () => {
        playBtn.style.opacity = '1';
        playBtn.style.pointerEvents = 'auto';
    });
}

// --- Certificate Carousel Logic ---
const certCarousel = document.getElementById('certCarousel');
if (certCarousel) {
    let currentIndex = 0;
    const items = certCarousel.querySelectorAll('.cert-slide');
    const totalItems = items.length;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        certCarousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3000);
}

// --- Study Modal Logic ---
const closeStudyModalBtn = document.getElementById('closeStudyModalBtn');
const studyModal = document.getElementById('studyModal');
const studyForm = document.getElementById('studyForm');
const studyStatus = document.getElementById('studyStatus');

if (studyModal) {
    // Event delegation for dynamic buttons
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('openStudyModalBtn')) {
            studyModal.style.display = 'flex';
        }
    });

    closeStudyModalBtn.addEventListener('click', () => {
        studyModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === studyModal) {
            studyModal.style.display = 'none';
        }
    });

    studyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('studyName').value;
        const phone = document.getElementById('studyPhone').value;
        const age = document.getElementById('studyAge').value;
        const studyBefore = document.getElementById('studyBefore').value;
        const studyCerts = document.getElementById('studyCerts').value;
        const course = document.querySelector('input[name="studyCourse"]:checked').value;
        
        const submitBtn = document.getElementById('studySubmitBtn');
        const currentLang = localStorage.getItem('lang') || 'ru';
        
        const BOT_TOKEN = '8732035671:AAH-pBJdQVpvt3eoNULxiBsGWkG4OEJmCcA';
        const CHAT_IDS = ['8468517793', '7168418095'];

        const message = `Новая заявка "Хочу учиться"!\n\nИмя: ${name}\nТелефон: ${phone}\nВозраст: ${age}\nИзучал ранее: ${studyBefore}\nСертификаты: ${studyCerts}\nВыбранный курс: ${course}`;
        submitBtn.disabled = true;
        
        try {
            const promises = CHAT_IDS.map(chatId => {
                return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, text: message })
                });
            });

            const responses = await Promise.all(promises);
            const allOk = responses.every(res => res.ok);

            if (allOk) {
                studyStatus.textContent = currentLang === 'ru' ? 'Заявка успешно отправлена!' : 'Ariza muvaffaqiyatli yuborildi!';
                studyStatus.className = 'form-status success';
                studyForm.reset();
                setTimeout(() => { studyModal.style.display = 'none'; }, 2000);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            studyStatus.textContent = currentLang === 'ru' ? 'Ошибка отправки.' : 'Yuborishda xatolik.';
            studyStatus.className = 'form-status error';
        }
        
        submitBtn.disabled = false;
        studyStatus.style.display = 'block';
        
        setTimeout(() => { studyStatus.style.display = 'none'; }, 5000);
    });
}

// --- Dynamic Courses Fetching from Supabase ---
const SUPABASE_URL = 'https://bkfvwjixmmdeojhmbpqk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrZnZ3aml4bW1kZW9qaG1icHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MzYxNTksImV4cCI6MjA5MzExMjE1OX0.8IkaI1hmiGmHDV4qecDlB5QIlz_60eDVYEb-L9RZBbE';

if (window.supabase) {
    const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const grid = document.getElementById('dynamicCoursesGrid');
    
    if (grid) {
        async function fetchCourses() {
            const { data, error } = await sb.from('courses').select('*').order('sort_order', { ascending: true });
            if (error) {
                grid.innerHTML = `<div style="text-align: center; color: #ef4444; padding: 40px; grid-column: 1 / -1;">Ошибка загрузки курсов: ${error.message} (Вы выполнили SQL запрос в базе данных?)</div>`;
                return;
            }
            
            if (!data || data.length === 0) {
                grid.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 40px; grid-column: 1 / -1;">Нет доступных курсов. Добавьте их в панели администратора.</div>`;
                return;
            }
            
            // Render courses based on page (index.html shows 3, courses.html shows all)
            const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
            const coursesToShow = isHomePage ? data.slice(0, 3) : data;
            
            grid.innerHTML = coursesToShow.map(c => `
                <div class="feature-card course-card">
                    <h3>${c.title}</h3>
                    <p class="course-desc">${c.description}</p>
                    <ul class="course-details">
                        <li><strong>Уровень:</strong> <span>${c.level}</span></li>
                        <li><strong>Возраст:</strong> <span>${c.age}</span></li>
                        <li><strong>Стоимость в месяц:</strong> <span>${c.price}</span></li>
                        <li><strong>Материалы:</strong> <span>${c.materials}</span></li>
                    </ul>
                    <button class="openStudyModalBtn" style="margin-top: 15px; width: 100%; padding: 12px; border-radius: 8px; border: none; background: var(--accent-blue); color: #fff; font-size: 0.95rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">Хочу учиться</button>
                </div>
            `).join('');
        }
        
        fetchCourses();
    }
}
