#include <SoftwareSerial.h>
#include <PulseSensorPlayground.h>

SoftwareSerial sim800l(3, 2); // SIM800L Tx → D3, Rx → D2
const int buttonPin = 7;
const int PulseWire = A0;   // Pulse sensor to A0
const int LED13 = 13;       // Blink LED on pin 13

PulseSensorPlayground pulseSensor;

int Threshold = 550;  // adjust if needed

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(LED13, OUTPUT);

  Serial.begin(9600);
  sim800l.begin(9600);

  // Pulse sensor setup
  pulseSensor.analogInput(PulseWire);
  pulseSensor.blinkOnPulse(LED13);
  pulseSensor.setThreshold(Threshold);

  if (pulseSensor.begin()) {
    Serial.println("PulseSensor ready!");
  }

  // 🔎 GSM Module check
  Serial.println("Checking GSM Module...");
  sim800l.println("AT");
  delay(1000);
  if (checkResponse("OK")) {
    Serial.println("GSM Module OK ✅");
  } else {
    Serial.println("GSM Module Not Responding ❌");
  }

  Serial.println("System Ready. Press button OR abnormal heartbeat to send SMS.");
}

void loop() {
  // ✅ Button press check
  if (digitalRead(buttonPin) == LOW) {
    sendSMS("Emergency! Button pressed, please help.");
    delay(5000);
  }

  // ✅ Heartbeat check
  int myBPM = pulseSensor.getBeatsPerMinute();
  if (pulseSensor.sawStartOfBeat()) {
    Serial.print("♥ BPM: ");
    Serial.println(myBPM);

    if (myBPM > 100 || myBPM < 60) {
      String alert = "Abnormal Heartbeat detected! BPM = " + String(myBPM);
      sendSMS(alert);
      delay(10000); // wait to avoid spamming
    }
  }

  showSerialData();
}

void sendSMS(String text) {
  Serial.println("Sending SMS...");
  
  sim800l.println("AT+CMGF=1");
  delay(1000);
  showSerialData();

  sim800l.println("AT+CMGS=\"+91xxxxxxxxxx\""); // Replace with your number
  delay(1000);
  showSerialData();

  sim800l.print(text);
  delay(500);

  sim800l.write(26);  // CTRL+Z
  delay(5000);
  showSerialData();

  Serial.println("SMS Sent!");
}

void showSerialData() {
  while (sim800l.available()) {
    Serial.write(sim800l.read());
  }
}

bool checkResponse(String expected) {
  long int time = millis();
  String reply = "";
  while ((millis() - time) < 2000) {  // wait 2 sec max
    while (sim800l.available()) {
      char c = sim800l.read();
      reply += c;
    }
    if (reply.indexOf(expected) != -1) {
      return true;
    }
  }
  return false;
}Emergency SOS 
