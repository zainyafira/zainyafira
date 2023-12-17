// Code.gs (Google Apps Script)
var SPREADSHEET_ID = '1Za5T_8E5clKC8Gp6oyVjXC6GVcOS7QD75m4--ACNTnE'; // Ganti dengan ID Google Spreadsheet Anda
var SHEET_NAME = 'Sheet1'; // Ganti dengan nama sheet Anda

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Deteksi Nomor Resi')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function init() {
  SpreadsheetApp.flush();
}

function saveAndDetect(trackingNumber) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === trackingNumber) {
      return 'Nomor resi sudah ada dalam database.';
    }
  }
  
  // Menyimpan nomor resi baru ke spreadsheet
  sheet.appendRow([trackingNumber]);
  
  // Deteksi ekspedisi (disini Anda dapat menambahkan logika deteksi sesuai kebutuhan)
  var detectedCarrier = detectCarrier(trackingNumber);
  
  return 'Nomor resi tersimpan. Ekspedisi yang terdeteksi: ' + detectedCarrier;
}

function detectCarrier(trackingNumber) {
  // Logika deteksi ekspedisi berdasarkan nomor resi (sesuaikan dengan kebutuhan Anda)
  // Contoh sederhana hanya untuk demonstrasi
  if (trackingNumber.startsWith('JNE')) {
    return 'JNE';
  } else if (trackingNumber.startsWith('J&T')) {
    return 'J&T';
  } else {
    return 'Ekspedisi tidak dikenali';
  }
}
