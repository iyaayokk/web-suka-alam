function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Request body is required.');
  }

  const data = JSON.parse(e.postData.contents);
  const mountainKeys = [
    'bromo', 'rinjani', 'prau', 'lawu', 'merapi',
    'merbabu', 'kerinci', 'salak', 'gede', 'argopuro'
  ];

  if (!mountainKeys.includes(data.mountainKey)) {
    throw new Error('Unknown mountain.');
  }

  const latitude = Number(data.latitude);
  const longitude = Number(data.longitude);
  const accuracyMeters = Number(data.accuracyMeters);
  const capturedAt = new Date(data.capturedAt);
  const mountainName = String(data.mountain || '').slice(0, 100);

  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 ||
      !Number.isFinite(longitude) || longitude < -180 || longitude > 180 ||
      !Number.isFinite(accuracyMeters) || accuracyMeters < 0 ||
      !Number.isFinite(capturedAt.getTime()) || !mountainName) {
    throw new Error('Invalid location values.');
  }

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('Bind this script to a Google spreadsheet.');
  }

  const sheet = spreadsheet.getSheets()[0];
  if (!sheet) {
    throw new Error('The spreadsheet has no sheet.');
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Waktu diterima',
      'Waktu lokasi',
      'Kunci gunung',
      'Nama gunung',
      'Latitude',
      'Longitude',
      'Akurasi (meter)'
    ]);
  }

  sheet.appendRow([
    new Date(),
    capturedAt,
    data.mountainKey,
    mountainName,
    latitude,
    longitude,
    accuracyMeters
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
