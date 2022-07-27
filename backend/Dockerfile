FROM ubuntu:20.04

WORKDIR /app

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && apt-get install -y --no-install-recommends \
    vim \
    apt-utils \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update -y &&\
  apt-get install -y python3-pip python3.8-dev default-libmysqlclient-dev &&\
  apt-get update -y &&\
  apt-get install -y build-essential libssl-dev libffi-dev python3-setuptools

RUN apt-get install -y python3-tk

RUN apt install -y python3.8-venv

RUN python3.8 -m venv env
RUN /bin/bash -c "source env/bin/activate"

COPY ./backend/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
# RUN pip3 install torch==1.4.0+cpu torchvision==0.5.0+cpu torchaudio==0.4.0 -f https://download.pytorch.org/whl/torch_stable.html
RUN pip install --no-cache-dir torch==1.8.0+cpu -f https://download.pytorch.org/whl/torch_stable.html
RUN pip install transformers tqdm numpy scikit-learn scipy nltk sentencepiece
RUN pip install --no-deps sentence-transformers
RUN pip install cryptography

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8080"]


