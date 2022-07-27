#./Dockerfile
FROM python:3.7.4
WORKDIR /usr/src/app

## Install packages
RUN pip install --no-cache-dir torch==1.8.0+cpu -f https://download.pytorch.org/whl/torch_stable.html
RUN pip install transformers tqdm numpy scikit-learn scipy nltk sentencepiece
RUN pip install --no-deps sentence-transformers

COPY requirements.txt ./
RUN pip install -r requirements.txt

## Copy all src files
COPY . .

## Run the application on the port 8000
EXPOSE 8000

#CMD ["python", "./setup.py", "runserver", "--host=0.0.0.0", "-p 8080"]
#CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
