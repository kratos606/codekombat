from PIL import Image, ImageDraw, ImageFont
import sys, os

# Get the current directory of this script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Paths using the current directory without the 'assets' folder
image_path = os.path.join(current_dir, 'certificate.jpg')
font_path = os.path.join(current_dir, 'AlexBrush-Regular.ttf')
output_dir = os.path.join(current_dir, 'certificates')

# Open the image
image = Image.open(image_path)
draw = ImageDraw.Draw(image)

# Get the message from command-line arguments
msg = sys.argv[1]

# Load the font
font = ImageFont.truetype(font_path, 160)

# Calculate text size using 'textbbox' instead of 'textsize'
W, H = image.size
bbox = draw.textbbox((0, 0), msg, font=font)
w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]

# Draw the text centered
draw.text(((W - w) / 2, (H - h) / 2), msg, fill="white", font=font)

# Create the directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Save the image with a sequential filename
filename = f"{len(os.listdir(output_dir)) + 1}.jpg"
image.save(os.path.join(output_dir, filename))

print(filename)
