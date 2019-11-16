FROM python:alpine3.7

EXPOSE 8080
ENTRYPOINT python demo.py

WORKDIR /usr/src/app

COPY requirements.txt demo.py ./
COPY templates ./templates
COPY swagger ./swagger

RUN pip install --no-cache-dir -r requirements.txt
