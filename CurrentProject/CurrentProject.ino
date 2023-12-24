#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>

const char* ssid     = "REPLACE_WITH_YOUR_SSID";
const char* password = "REPLACE_WITH_YOUR_PASSWORD";

const char* server = "http://localhost:3000/api/post/";
String apikey = "lukepramo221#";
int device_id = 4;

void setup() {
  Serial.begin(115200);
  WIFI.begin(ssid,password);
  Serial.println("Connecting to WIFI");
  while(WIFI.status() != WL_CONNECTED){
    Serial.println(".");
    delay(500);
  }
  Serial.println("Connection success to : " + WIFI.localIP());
}

void loop() {
  if (Serial.readString() == "!"){
    digitalWrite(2, HIGH);
  }
  //call the send_request function as per the conditions

  void send_request(String device_id, String start_time, String end_time){
    if(WiFi.status()== WL_CONNECTED){
    WiFiClientSecure *client = new WiFiClientSecure;
    client->setInsecure();
    HTTPClient https;
    https.begin(*client, server);
    https.addHeader("Content-Type", "application/x-www-form-urlencoded");
    String Request = "api_key=" + apikey + "&device_id=" + device_id + "&start_time=" + start_timen + "&end_time" + end_time;
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

  
}
}
