from pynput import keyboard
import pyautogui
import time
import random
def on_press(key):
    try:
        # Check if the 'e' key is pressed
        if key.char == 'e':

            for _ in range(15):
                time.sleep(0.01)
                pyautogui.press('tab')
                time.sleep(0.01)
                pyautogui.press('space')
        if key.char == 'f':

            for _ in range(15):
                time.sleep(0.01)
                pyautogui.press('tab')
                time.sleep(0.01)
                pyautogui.press('right')
        if key.char == 'g':
            for _ in range(15):
                time.sleep(0.01)
                pyautogui.press('tab')
                time.sleep(0.01)
                pyautogui.press('right')
                time.sleep(0.01)
                pyautogui.press('right')
        if key.char == 'r':
            
            for i in range(15):
                ran=random.randint(0,2)
                if ran == 1:


                        time.sleep(0.01)
                        pyautogui.press('tab')
                        time.sleep(0.01)
                        pyautogui.press('space')
                if ran==0:
                        time.sleep(0.01)
                        pyautogui.press('tab')
                        time.sleep(0.01)
                        pyautogui.press('right')

    except AttributeError:
        # If it's a special key, ignore it
        pass

# Start listening for key press events
with keyboard.Listener(on_press=on_press) as listener:
    listener.join()