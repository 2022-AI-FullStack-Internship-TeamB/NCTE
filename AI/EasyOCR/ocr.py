"""
import easyocr
import numpy as np
import cv2
import random
import matplotlib.pyplot as plt
from PIL import ImageFont, ImageDraw, Image

reader = easyocr.Reader(['ko', 'en'],
model_storage_directory='model',
user_network_directory='user_network',
recog_network='custom')
result=reader.readtext('test2.jpg')

img = cv2.imread('test2.jpg')

img = Image.fromarray(img)
font = ImageFont.truetype("fonts/HMKMRHD.TTF", 80)
draw = ImageDraw.Draw(img)

np.random.seed(42)
COLORS = np.random.randint(0, 255, size=(255, 3), dtype="uint8")

for i in result:
    x = i[0][0][0]
    y = i[0][0][1]
    w = i[0][1][0] - i[0][0][0]
    h = i[0][2][1] - i[0][1][1]

    color_idx = random.randint(0, 255)
    color = [int(c) for c in COLORS[color_idx]]

    draw.rectangle(((x, y), (x + w, y + h)), outline=tuple(color), width=2)
    draw.text((int((x + x + w) / 2), y - 2), str(i[1]), font=font, fill=tuple(color), )

plt.imshow(img)
plt.show()
"""
from easyocr.easyocr import *

# GPU 설정
os.environ['CUDA_VISIBLE_DEVICES'] = '0,1'


def get_files(path):
    file_list = []

    files = [f for f in os.listdir(path) if not f.startswith('.')]  # skip hidden file
    files.sort()
    abspath = os.path.abspath(path)
    for file in files:
        file_path = os.path.join(abspath, file)
        file_list.append(file_path)

    return file_list, len(file_list)


if __name__ == '__main__':


    # Using custom model
    reader = Reader(['ko', 'en'], gpu=True,
                    model_storage_directory='model',
                    user_network_directory='user_network',
                    recog_network='custom')

    files, count = get_files('test_images')

    for idx, file in enumerate(files):
        filename = os.path.basename(file)

        result = reader.readtext(file)

        # result[0]: bbox
        # result[1]: string
        # result[2]: confidence
        for (bbox, string, confidence) in result:
            print("filename: '%s', confidence: %.4f, string: '%s'" % (filename, confidence, string))
            # print('bbox: ', bbox)