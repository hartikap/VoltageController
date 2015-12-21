String inString = "";    // string to hold serial input
const int analogOutPin = 11;
const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to

int sensorValue = 0;        // value read from the pot
int previousValue = 0;
int incomingByte = 0;
void setup() {

  cli();
  //set timer1 interrupt at 100Hz
  TCCR1A = 0;// set entire TCCR1A register to 0
  TCCR1B = 0;// same for TCCR1B
  TCNT1  = 0;//initialize counter value to 0
  // set compare match register for 10hz increments
  OCR1A = 155;// = (16*10^6) / (100*1024) - 1 (must be <65536)
  // turn on CTC mode
  TCCR1B |= (1 << WGM12);
  // Set CS10 and CS12 bits for 1024 prescaler
  TCCR1B |= (1 << CS12) | (1 << CS10);  
  // enable timer compare interrupt
  TIMSK1 |= (1 << OCIE1A);

  sei();//allow interrupts
  

  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

}

ISR(TIMER1_COMPA_vect){

   sensorValue = analogRead(analogInPin);
   
   // serialport transmits data if the data has changed more than 1. This
   // prevents continuous data transfer due to constant bouncing of the adc
   // between two measurement values. Drawback - less accurate measurement
   // result. In the case of 0 and 1023 we want to make a transmit even if
   // the change is just 1.  
   if ( (sensorValue-previousValue)>1 ||  ((previousValue-sensorValue)>1) 
      || ((sensorValue!= previousValue) && ((sensorValue == 0) 
      || (sensorValue == 1023) )) ) {
      Serial.print(sensorValue);
      Serial.print('B');
  }

  previousValue = sensorValue;
     
}


void loop() {


  if (Serial.available() > 0) {

    incomingByte = Serial.read();

    if (isDigit(incomingByte)) {
      // convert the incoming byte to a char
      // and add it to the string:
      inString += (char)incomingByte;
    }
    
    // if you get something that's not a digit, write the received
    // value to analog output
    if (!isDigit(incomingByte)) {
      analogWrite(analogOutPin, inString.toInt());
      // clear the string for new input:
      inString = "";
    }

  }
  
}
