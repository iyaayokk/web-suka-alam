const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyxZWeAV0SCgpTQ6wwUydD-tfVmIQJm7JuzhJ9q1ZGl1qJARkAMc6AeV9_yRlQS8RqY/exec';
const locationConsentDialog = document.getElementById('locationConsentDialog');

if (locationConsentDialog) {
    requestAnimationFrame(() => {
        locationConsentDialog.classList.add('active');
        locationConsentDialog.setAttribute('aria-hidden', 'false');
    });

    document.getElementById('dismissLocationConsent').addEventListener('click', () => {
        locationConsentDialog.classList.remove('active');
        locationConsentDialog.setAttribute('aria-hidden', 'true');
    });
}

document.querySelectorAll('[data-share-location]').forEach((button) => {
    button.addEventListener('click', () => {
        const status = document.getElementById(button.dataset.statusTarget);

        if (!window.isSecureContext || !navigator.geolocation) {
            status.textContent = 'Fitur lokasi memerlukan HTTPS (atau localhost) dan browser yang mendukung lokasi.';
            return;
        }

        button.disabled = true;
        status.textContent = 'Meminta izin lokasi dari browser…';

        navigator.geolocation.getCurrentPosition(async (position) => {
            const submission = {
                mountainKey: button.dataset.mountainKey,
                mountain: button.dataset.mountainName,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracyMeters: position.coords.accuracy,
                capturedAt: new Date().toISOString()
            };

            status.textContent = 'Mengirim lokasi ke Google Sheets…';

            try {
                await fetch(GOOGLE_SHEETS_ENDPOINT, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(submission)
                });
                status.textContent = 'Permintaan pengiriman selesai. Admin dapat memeriksa Google Sheets.';
                if (locationConsentDialog) {
                    locationConsentDialog.classList.remove('active');
                    locationConsentDialog.setAttribute('aria-hidden', 'true');
                }
            } catch (error) {
                console.error('Gagal mengirim lokasi ke Google Sheets:', error);
                status.textContent = 'Lokasi berhasil didapatkan, tetapi gagal dikirim. Periksa koneksi internet dan coba lagi.';
                button.disabled = false;
            }
        }, (error) => {
            const messages = {
                1: 'Izin lokasi ditolak. Tidak ada lokasi yang dikirim.',
                2: 'Lokasi tidak dapat ditentukan. Coba lagi saat sinyal tersedia.',
                3: 'Permintaan lokasi melewati batas waktu. Coba lagi.'
            };
            status.textContent = messages[error.code] || 'Lokasi tidak dapat diakses. Silakan coba lagi.';
            button.disabled = false;
        }, {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 0
        });
    });
});
