import easyocr

def text_conversion(image):
    reader = easyocr.Reader(['ko', 'en'],
                            model_storage_directory='model',
                            user_network_directory='user_network',
                            recog_network='custom')
    result = reader.readtext(image)
    return result