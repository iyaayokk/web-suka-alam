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
                <span class="subtitle">Bagikan lokasi</span>
                <h2 id="locationShareTitle">Bantu kami memahami lokasi pengunjung</h2>
                <p>Jika kamu setuju, koordinat lokasi saat ini, tingkat akurasi, nama gunung yang sedang dilihat, dan waktu pengiriman akan disimpan di Google Sheets. Lokasi tidak dikirim sebelum kamu menekan tombol. Jangan bagikan jika kamu tidak nyaman.</p>
                <button class="btn-primary location-share-button" id="shareLocationButton" type="button">
                    <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                    Izinkan & bagikan lokasi
                </button>
                <p class="location-share-status" id="locationShareStatus" role="status" aria-live="polite"></p>
            </div>
        </section>
    `;

    const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyxZWeAV0SCgpTQ6wwUydD-tfVmIQJm7JuzhJ9q1ZGl1qJARkAMc6AeV9_yRlQS8RqY/exec';
    const shareLocationButton = document.getElementById('shareLocationButton');
    const locationShareStatus = document.getElementById('locationShareStatus');

    shareLocationButton.addEventListener('click', () => {
        if (!window.isSecureContext || !navigator.geolocation) {
            locationShareStatus.textContent = 'Fitur lokasi memerlukan HTTPS (atau localhost) dan browser yang mendukung lokasi.';
            return;
        }

        if (!GOOGLE_SHEETS_ENDPOINT.startsWith('https://script.google.com/macros/s/')) {
            locationShareStatus.textContent = 'Penyimpanan belum dikonfigurasi. Admin perlu memasang URL Web App Google Apps Script terlebih dahulu.';
            return;
        }

        shareLocationButton.disabled = true;
        locationShareStatus.textContent = 'Meminta izin lokasi dari browser…';

        navigator.geolocation.getCurrentPosition(async (position) => {
            const submission = {
                mountainKey,
                mountain: mountain.title,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracyMeters: position.coords.accuracy,
                capturedAt: new Date().toISOString()
            };

            locationShareStatus.textContent = 'Mengirim lokasi ke Google Sheets…';

            try {
                await fetch(GOOGLE_SHEETS_ENDPOINT, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(submission)
                });
                locationShareStatus.textContent = 'Permintaan pengiriman sudah dilakukan. Periksa Google Sheets untuk memastikan data tercatat.';
            } catch (error) {
                console.error('Gagal mengirim lokasi ke Google Sheets:', error);
                locationShareStatus.textContent = 'Lokasi berhasil didapatkan, tetapi gagal dikirim. Periksa koneksi internet dan coba lagi.';
                shareLocationButton.disabled = false;
            }
        }, (error) => {
            const messages = {
                1: 'Izin lokasi ditolak. Tidak ada lokasi yang dikirim.',
                2: 'Lokasi tidak dapat ditentukan. Coba lagi saat sinyal tersedia.',
                3: 'Permintaan lokasi melewati batas waktu. Coba lagi.'
            };
            locationShareStatus.textContent = messages[error.code] || 'Lokasi tidak dapat diakses. Silakan coba lagi.';
            shareLocationButton.disabled = false;
        }, {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 0
        });
    });
}