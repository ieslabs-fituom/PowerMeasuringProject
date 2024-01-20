#include <PZEM004Tv30.h>
#include <Wire.h>
#include <RTClib.h>
#include <EEPROM.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>

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

const char* ssid     = "Galaxy A30s9CCA";
const char* password = "Isu32357";

const char* server = "http://192.168.141.177:3000/api/post/";
String apikey = "lukepramo221#";
int device_id = 4;

RTC_DS3231 rtc;

float th = 0;

int stime;
int tq = 500; // 5 second delay

String start_time;
String end_time;

void setStartTime(){
  DateTime now = rtc.now();
  
  start_time = String(now.year()) + "-" + String(now.month()) + "-" + String(now.day()) + " " + String(now.hour()) + ":" + String(now.minute()) + ":" + String(now.second());

  Serial.println(start_time);
}

void setEndTime(){
  DateTime now = rtc.now();
  
  end_time = String(now.year()) + "-" + String(now.month()) + "-" + String(now.day()) + " " + String(now.hour()) + ":" + String(now.minute()) + ":" + String(now.second());

  Serial.println(end_time);
}

void saveThresholdToEEPROM(float val) {
  int address = 0;
  EEPROM.put(address, val);
  EEPROM.commit();

  Serial.println();
  Serial.print("Saved Threshold in EEPROM: ");
  Serial.print(val);
  Serial.println();
}

void readThresholdFromEEPROM() {
  int address = 0;
  EEPROM.get(address, th);

  //th = th / 100;

  Serial.print("Value Fetched (Threshold): ");
  Serial.print(th);
  Serial.println();
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

void showData(float val){
  Serial.print(val);
  Serial.print("A  -  ");
  OutCurrentRTCTime();
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

  //saveThresholdToEEPROM(2.8);

  // Read Threshold
  readThresholdFromEEPROM();

  EEPROM.end();

  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  

  stime = millis();

  // Set the RTC to the date & time this sketch was compiled
  //rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));

  Serial.println("Device Off.");
}

bool isHigh = false;

void loop() {
  // Check if the data is valid
  float currentVal = pzem.current();

  if (isnan(currentVal)) {
    Serial.println("Error reading current");
  }
  else {
    if (millis() - stime > tq){
      if (currentVal > th && isHigh == false){
        // start
        Serial.println("\nDevice on!");
        setStartTime();
        isHigh = true;        
      }
      else if (currentVal < th && isHigh == true){
        // stop
        isHigh = false;
        setEndTime();
        send_request();
        Serial.println("Device Off.");        
      }
      else if (currentVal > th && isHigh == true){
        // print values
        showData(currentVal);
      }
      else{
        // do nothing
        Serial.print(".");
      }

      stime = millis();
    }    
  }
}

void send_request(){
  if(WiFi.status()== WL_CONNECTED){
    WiFiClientSecure *client = new WiFiClientSecure;
    client->setInsecure();
    HTTPClient https;
    https.begin(*client, server);
    https.addHeader("Content-Type", "application/x-www-form-urlencoded");
    String Request = "api_key=" + apikey + "&device_id=" + device_id + "&start_time=" + start_time + "&end_time" + end_time;
    Serial.println(Request);
    int httpResponseCode = https.POST(Request);
    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    https.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }
}