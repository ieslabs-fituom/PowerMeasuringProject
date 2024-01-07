#include <PZEM004Tv30.h>
#include <Wire.h>
#include <RTClib.h>
#include <EEPROM.h>

#if !defined(PZEM_RX_PIN) && !defined(PZEM_TX_PIN)
#define PZEM_RX_PIN 16
#define PZEM_TX_PIN 17
#endif

#if !defined(PZEM_SERIAL)
#define PZEM_SERIAL Serial2
#endif

#if defined(ESP32)
PZEM004Tv30 pzem(PZEM_SERIAL, PZEM_RX_PIN, PZEM_TX_PIN);
#else
PZEM004Tv30 pzem(PZEM_SERIAL);
#endif

RTC_DS3231 rtc;

int th;

int stime;
int tq = 10000; // 10 second delay

void saveThresholdToEEPROM(int val) {
  int address = 0;
  EEPROM.put(address, val);
  EEPROM.commit();
}

void readThresholdFromEEPROM() {
  int address = 0;
  EEPROM.get(address, th);

  Serial.println("Value Fetched (Threshold): ");
  Serial.print(th);
}

void OutCurrentRTCTime(){
  DateTime now = rtc.now();

  Serial.print(now.year(), DEC);
  Serial.print('/');
  Serial.print(now.month(), DEC);
  Serial.print('/');
  Serial.print(now.day(), DEC);
  Serial.print(' ');
  Serial.print(now.hour(), DEC);
  Serial.print(':');
  Serial.print(now.minute(), DEC);
  Serial.print(':');
  Serial.print(now.second(), DEC);
  Serial.println();
}

void setup() {
  Serial.begin(115200);
  EEPROM.begin(512);

  Wire.begin();

  // Uncomment in order to reset the internal energy counter
  // pzem.resetEnergy()

  if (!rtc.begin()) {
    Serial.println("RTC module is not found");
    while (1);
  }

  //saveThresholdToEEPROM(10);

  // Read Threshold
  readThresholdFromEEPROM();

  stime = millis();

  // Set the RTC to the date & time this sketch was compiled
  //rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
}

void loop() {
  // Check if the data is valid
  float currentVal = pzem.current();

  if (isnan(currentVal) && false) {
    Serial.println("Error reading current");
  }
  else {
    if (millis() - stime > tq){
      if (currentVal > th){
        // upload to the database
        Serial.print(currentVal);
      }
      else{
        Serial.println(currentVal);
        OutCurrentRTCTime();
      }

      stime = millis();
      Serial.println();
    }    
  }
}
