const detailRoot = document.getElementById('mountainDetail');
const mountainKey = new URLSearchParams(window.location.search).get('gunung');
const mountain = window.mountainsData[mountainKey];

if (!mountain) {
    document.title = 'Gunung tidak ditemukan - SUKA ALAM';
    detailRoot.innerHTML = `
        <section class="detail-error">
            <h1>Gunung tidak ditemukan</h1>
            <p>Halaman yang kamu cari belum tersedia.</p>
            <a class="btn-primary" href="../index.html#explorer">Lihat daftar gunung</a>
        </section>
    `;
} else {
    document.title = `${mountain.title} - Keindahan & Misteri | SUKA ALAM`;
    detailRoot.innerHTML = `
        <section class="detail-hero" style="background-image: linear-gradient(90deg, rgba(15, 25, 18, 0.82), rgba(15, 25, 18, 0.18)), url('../${mountain.img}')">
            <div class="detail-hero-content">
                <a class="detail-back" href="../index.html#explorer"><i class="fa-solid fa-arrow-left"></i> Kembali ke daftar gunung</a>
                <h1>${mountain.title}</h1>
                <p>${mountain.location}</p>
                <div class="detail-meta">
                    <span><i class="fa-solid fa-mountain"></i> ${mountain.height}</span>
                    <span><i class="fa-solid fa-route"></i> ${mountain.difficulty}</span>
                </div>
            </div>
        </section>
        <section class="detail-content">
            <article class="detail-story">
                <span class="subtitle">Lanskap & kehidupan</span>
                <h2>Keindahan ${mountain.title}</h2>
                <p>${mountain.nature}</p>
                <div class="detail-note">Informasi pendakian dapat berubah. Periksa status jalur dan aturan kawasan sebelum berangkat.</div>
            </article>
            <article class="detail-story">
                <span class="subtitle">Cerita yang diwariskan</span>
                <h2>Misteri & legenda</h2>
                <p>${mountain.myth}</p>
                <div class="detail-note">Kisah mistis di halaman ini merupakan folklore dan kepercayaan lokal, bukan fakta yang terverifikasi.</div>
                <h3 class="detail-sources-title">Sumber cerita lokal</h3>
                <ul class="detail-sources">
                    ${mountain.sources.map(source => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></li>`).join('')}
                </ul>
            </article>
        </section>
        <section class="location-share" aria-labelledby="locationShareTitle">
            <div class="location-share-card">
                <span class="subtitle">Suka alam</span>
                <h2 id="locationShareTitle">Support My Journey</h2>
                <p>Every great journey begins with a little support. Your kindness, encouragement, and support mean more than words can express. Together, we can turn dreams into reality and make something truly meaningful. Thank you for being part of my journey. ❤️</p>
                <button class="btn-primary location-share-button" type="button" data-share-location data-mountain-key="${mountainKey}" data-mountain-name="${mountain.title}" data-status-target="detailLocationStatus">
                    <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                    Support me
                </button>
                <p class="location-share-status" id="detailLocationStatus" role="status" aria-live="polite"></p>
            </div>
        </section>
    `;
}