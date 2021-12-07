import drivers
import time
import sys
import RPi.GPIO as GPIO

display = drivers.Lcd()
display.lcd_backlight(0)
pin=[40,38,36]


GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(pin[0], GPIO.OUT)
GPIO.setup(pin[1], GPIO.OUT)
GPIO.setup(pin[2], GPIO.OUT)
GPIO.output(pin[0], GPIO.HIGH)
GPIO.output(pin[1], GPIO.HIGH)
GPIO.output(pin[2], GPIO.HIGH)
i=0
cadena=''
if len(sys.argv[1])-1>15:
    cadena=sys.argv[1][0:15]
else:
    cadena=sys.argv[1]
try:
    display.lcd_backlight(1)
    if sys.argv[2]=='guest':
        while i<2:
            display.lcd_display_string("Mensaje de: ",1)
            display.lcd_display_string(cadena,2);
            GPIO.output(pin[1], GPIO.LOW)
            time.sleep(0.25)
            GPIO.output(pin[1], GPIO.HIGH)
            time.sleep(0.25)
            i=i+1
    elif sys.argv[2]=='auth':
        while i<2:
            display.lcd_display_string("Mensaje de: ",1)
            display.lcd_display_string(cadena,2);
            GPIO.output(pin[2], GPIO.LOW)
            time.sleep(0.25)
            GPIO.output(pin[2], GPIO.HIGH)
            time.sleep(0.25)
            i=i+1
    display.lcd_clear()
    display.lcd_backlight(0)
    GPIO.cleanup()

except KeyboardInterrupt:
    display.lcd_clear()
    GPIO.cleanup()
    display.lcd_backlight(0)