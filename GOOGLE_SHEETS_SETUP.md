# Menyimpan lokasi ke Google Sheets

Lokasi hanya diminta setelah pengunjung menekan **Izinkan & bagikan lokasi** dan menyetujui dialog izin browser. Data yang dikirim adalah koordinat, tingkat akurasi, gunung, dan waktu. Jaga spreadsheet tetap privat.

Spreadsheet dan Web App untuk project ini sudah dibuat dan dihubungkan. Buka [Lokasi Pengunjung](https://docs.google.com/spreadsheets/d/1Utyn0xPbLm-BDRMLll7P85uuKZYpdlFw0eFVbmpxPZ4/edit) untuk melihat kiriman. Data akan masuk ke tab pertama setelah pengunjung menekan tombol dan menyetujui izin lokasi.

Situs memakai URL Web App yang sudah terpasang di `pages/detail.js`. Jika perlu membuat ulang deployment, gunakan [`apps-script/Code.gs`](./apps-script/Code.gs), deploy sebagai **Web app**, pilih **Execute as: akun kamu** dan **Who has access: Anyone**, lalu ganti URL `/exec` di `pages/detail.js`.

Endpoint menerima kiriman publik agar tombol dapat bekerja tanpa login. Spreadsheet tetap privat; hanya admin yang dapat melihat isinya. Jangan pernah memasukkan data lokasi tanpa persetujuan pengunjung.
