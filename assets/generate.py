from PIL import Image, ImageDraw,ImageFont
import sys,os

image = Image.open('/app/assets/certificate.jpg')
draw = ImageDraw.Draw(image)
msg = sys.argv[1]
font = ImageFont.truetype("/app/assets/AlexBrush-Regular.ttf", 160)
W, H = image.size
w, h = draw.textsize(msg, font=font)
draw.text(((W - w) / 2, (H - h) / 2), msg, fill="white",font=font)

dir = '/app/assets/certificates'
if not os.path.exists(dir):
    os.makedirs(dir)
print(f"{len(os.listdir(dir))+1}.jpg")
image.save(f"{dir}/{len(os.listdir(dir))+1}.jpg")