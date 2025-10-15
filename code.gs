function doPost(e) {
  var sheet = SpreadsheetApp.openById("AKfycbxH0ZYhLo5KLHW2z0yuKA3ZUB2Ye2kXC9Aa4J9CPkG177vWKFmGORdWuecVLdK0_kFv").getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.device, data.reason, data.bpm, data.lat, data.lon, data.date, data.time]);
  return ContentService.createTextOutput("OK");
}

function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var jsonData = [];

  for (var i = 1; i < data.length; i++) {
    jsonData.push({
      timestamp: data[i][0],
      device: data[i][1],
      lat: data[i][2],
      lon: data[i][3],
      message: data[i][4],
      date: data[i][5],
      time: data[i][6]
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}
