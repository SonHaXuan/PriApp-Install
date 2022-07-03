FROM tiangolo/uwsgi-nginx-flask:python3.6

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -U -r requirements.txt
RUN python -m nltk.downloader stopwords

COPY . .

EXPOSE 5000

CMD ["python", "run.py"]
