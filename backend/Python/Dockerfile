FROM python:3.5.4

RUN mkdir -p /usr/src/python
WORKDIR /usr/src/python

COPY . /usr/src/python
RUN pip install -r requirements.txt

CMD ["tail", "-f", "/dev/null"]
