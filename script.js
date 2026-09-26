// Data Gunung Lengkap
const mountainsData = {
    bromo: {
        title: "Gunung Bromo",
        location: "Jawa Timur",
        height: "2.329 mdpl",
        difficulty: "Mudah - Sedang",
        category: ["sunrise", "santai"],
        img: "images/Bromo.jpg",
        nature: "Bromo menawarkan keindahan luar biasa berupa kaldera pasir seluas 10 kilometer persegi, kawah aktif spektakuler, serta deretan Gunung Batok dan latar puncak Semeru. Sunrise di Penanjakan merupakan salah satu daya tarik turisme terbaik di Asia Tenggara.",
        myth: "Suku Tengger meyakini Bromo sebagai tempat suci. Mitos pangeran Roro Anteng dan Joko Seger menjadi latar belakang upacara tahunan Kasada, di mana masyarakat melempar hasil bumi dan ternak ke dalam kawah sebagai wujud rasa syukur dan penolak bala."
    },
    rinjani: {
        title: "Gunung Rinjani",
        location: "Lombok, NTB",
        height: "3.726 mdpl",
        difficulty: "Sangat Tinggi",
        category: ["sunrise", "mistik", "ekstrem"],
        img: "images/Rinjani.jpg",
        nature: "Gunung tertinggi kedua di Indonesia ini terkenal dengan Danau Kawah Segara Anak yang memukau berwarna biru keemasan. Sabana Sembalun dan keanekaragaman vegetasi menjadikan pendakian Rinjani sebagai pengalaman visual yang lengkap.",
        myth: "Masyarakat Lombok meyakini Rinjani dijaga oleh Dewi Anjani, sosok Ratu Gaib penguasa pegunungan. Danau Segara Anak juga dianggap tempat sakral untuk menyucikan benda-benda pusaka adat."
    },
    prau: {
        title: "Gunung Prau",
        location: "Wonosobo, Jawa Tengah",
        height: "2.565 mdpl",
        difficulty: "Mudah",
        category: ["sunrise", "santai"],
        img: "images/Prau.jpg",
        nature: "Prau terkenal dengan puncak berupa hamparan padang rumput hijau berbukit-bukit layaknya bukit Teletubbies. Dari sini, pendaki disuguhkan pamandangan 'Golden Sunrise' berlatar Gunung Sindoro dan Sumbing.",
        myth: "Beberapa titik di Dataran Tinggi Dieng dekat lokasi Prau dipercaya memiliki aura mistik peninggalan era Hindu kuno, termasuk candi-candi purba yang dikelilingi kabut magis."
    },
    lawu: {
        title: "Gunung Lawu",
        location: "Perbatasan Jawa Tengah & Jawa Timur",
        height: "3.265 mdpl",
        difficulty: "Sedang - Tinggi",
        category: ["mistik", "ekstrem"],
        img: "images/Lawu.jpg",
        nature: "Lawu menawarkan keasrian hutan Dipterokarp, hutan Montane, hingga hutan Ericaceous. Memiliki warisan warung tertinggi di Indonesia 'Mbok Yem' dekat Hargo Dumilah.",
        myth: "Sarat akan sejarah pelarian Prabu Brawijaya V (Raja terakhir Majapahit). Terdapat legenda Pasar Setan di mana pendaki mendengar keriuhan transaksi gaib serta misteri burung Jalak Lawu yang sering menjadi penunjuk jalan pendaki berhati tulus."
    },
    merapi: {
        title: "Gunung Merapi",
        location: "D.I. Yogyakarta & Jawa Tengah",
        height: "2.910 mdpl",
        difficulty: "Sangat Tinggi",
        category: ["mistik", "ekstrem"],
        img: "images/Merapi.jpg",
        nature: "Salah satu gunung api paling aktif di dunia. Menyajikan lanskap batuan vulkanik unik, gurun pasir abu, dan pandangan spektakuler Yogyakarta dari puncak.",
        myth: "Memiliki Keraton Gaib Merapi yang terhubung dengan Keraton Yogyakarta dan Nyi Roro Kidul di Laut Selatan. Tokoh Mbah Maridjan dipandang sebagai juru kunci legendaris penjaga Merapi."
    },
    kerinci: {
        title: "Gunung Kerinci",
        location: "Jambi, Sumatra",
        height: "3.805 mdpl",
        difficulty: "Tinggi - Ekstrem",
        category: ["mistik", "ekstrem"],
        img: "images/Kerinci.jpg",
        nature: "Atap Sumatra dan gunung berapi tertinggi di Indonesia. Dikelilingi Hutan Hujan Tropis Taman Nasional Kerinci Seblat yang menjadi habitat Harimau Sumatra dan Orangutan.",
        myth: "Legenda 'Cindaku' atau manusia harimau yang menjadi penjaga hutan Kerinci. Pendaki dilarang bersikap takabur agar tidak disesatkan oleh penghuni hutan purba Kerinci."
    },
    salak: {
        title: "Gunung Salak",
        location: "Bogor, Jawa Barat",
        height: "2.211 mdpl",
        difficulty: "Tinggi",
        category: ["mistik"],
        img: "images/Salak.jpg",
        nature: "Hutan hujan basah yang sangat lebat dengan jalur pendakian penuh dengan vegetasi liar, jurang terjal, serta Kawah Ratu yang mempesona.",
        myth: "Sering dihubungkan dengan makam-makam keramat para pangeran Kerajaan Pajajaran di Puncak Manik. Terkenal dengan aura mistis yang pekat dan gangguan kompas navigasi."
    },
    gede: {
        title: "Gunung Gede Pangrango",
        location: "Cianjur, Jawa Barat",
        height: "2.958 mdpl",
        difficulty: "Sedang",
        category: ["santai", "sunrise"],
        img: "images/Gedepangarago.jpg",
        nature: "Memiliki Alun-Alun Surya Kencana, padang Bunga Edelweiss alami seluas 50 hektar di atas puncak. Terdapat pula Air Terjun Cibeureum dan Telaga Biru di awal jalur.",
        myth: "Dipercaya sebagai lokasi tempat bersemedi Pangeran Surya Kencana dari Kerajaan Pajajaran yang gaib bersama masyarakat jin yang menjaga kedamaian flora fauna Gunung Gede."
    }
};

// Populate Explorer Grid on Init
function initExplorer() {
    const grid = document.getElementById('explorerGrid');
    grid.innerHTML = '';

    Object.keys(mountainsData).forEach(key => {
        const item = mountainsData[key];
        const card = document.createElement('div');
        card.className = 'beauty-card';
        card.setAttribute('data-category', item.category.join(' '));
        card.onclick = () => openModal(key);

        card.innerHTML = `
            <div class="card-img-wrapper">
                <span class="card-tag">${item.difficulty}</span>
                <img src="${item.img}" alt="${item.title}">
            </div>
            <div class="card-body">
                <h3>${item.title}</h3>
                <div class="card-location"><i class="fa-solid fa-location-dot"></i> ${item.location}</div>
                <p>${item.nature.substring(0, 90)}...</p>
                <div class="card-footer">
                    <span class="height-info"><i class="fa-solid fa-mountain"></i> ${item.height}</span>
                    <span class="read-more">Detail <i class="fa-solid fa-chevron-right"></i></span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Navigation Menu Scroll & Sticky
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Mobile Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close nav links on click mobile
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Filter Mitos
function filterMystery(category) {
    const buttons = document.querySelectorAll('.mystery-tabs .tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const cards = document.querySelectorAll('#mysteryGrid .mystery-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter Mountains Explorer
function filterMountains(filter) {
    const buttons = document.querySelectorAll('.filter-container .filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const cards = document.querySelectorAll('#explorerGrid .beauty-card');
    cards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal Functionality
function openModal(key) {
    const data = mountainsData[key];
    if (!data) return;

    document.getElementById('modalImg').src = data.img;
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalLoc').innerText = data.location;
    document.getElementById('modalHeight').innerText = data.height;
    document.getElementById('modalDiff').innerText = data.difficulty;
    document.getElementById('modalNature').innerText = data.nature;
    document.getElementById('modalMyth').innerText = data.myth;

    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeModalOnOverlay(e) {
    if (e.target.id === 'modalOverlay') {
        closeModal();
    }
}

// Quiz Logic
let quizAnswers = [];

function answerQuiz(option) {
    quizAnswers.push(option);
    const currentStep = quizAnswers.length;

    if (currentStep === 1) {
        document.getElementById('quizStep1').classList.remove('active');
        document.getElementById('quizStep2').classList.add('active');
    } else if (currentStep === 2) {
        document.getElementById('quizStep2').classList.remove('active');
        document.getElementById('quizStep3').classList.add('active');
    } else if (currentStep === 3) {
        document.getElementById('quizStep3').classList.remove('active');
        calculateQuizResult();
        document.getElementById('quizResult').classList.add('active');
    }
}

function calculateQuizResult() {
    let resultKey = 'prau';
    const countA = quizAnswers.filter(a => a === 'A').length;
    const countB = quizAnswers.filter(a => a === 'B').length;
    const countC = quizAnswers.filter(a => a === 'C').length;

    if (countC >= 2) {
        resultKey = 'lawu';
    } else if (countA >= 2) {
        resultKey = 'prau';
    } else if (countB >= 2) {
        resultKey = 'gede';
    } else if (quizAnswers.includes('C')) {
        resultKey = 'rinjani';
    }

    const data = mountainsData[resultKey];
    document.getElementById('resultTitle').innerText = `Rekomendasi: ${data.title}`;
    document.getElementById('resultDesc').innerText = `Berdasarkan pilihanmu, ${data.title} (${data.location}) adalah jawaban paling tepat! Menawarkan kombinasi spektakuler ketinggian ${data.height} dan suasana yang menyatu dengan jiwa petualangmu.`;
    document.getElementById('resultImg').src = data.img;
}

function resetQuiz() {
    quizAnswers = [];
    document.getElementById('quizResult').classList.remove('active');
    document.getElementById('quizStep1').classList.add('active');
}

// On Page Load Init
window.onload = function () {
    initExplorer();
};
