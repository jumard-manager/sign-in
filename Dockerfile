FROM python:3.10.13-slim-bookworm

ENV TZ Asia/Tokyo

# add python module
COPY ./server/requirements.txt /opt/pip/requirements.txt
RUN pip install -r /opt/pip/requirements.txt
RUN rm -rf /opt/pip

# add all
COPY ./server /opt

WORKDIR /opt

EXPOSE 8000

CMD ["bash", "-c", "python manage.py runserver --noreload --insecure 0.0.0.0:8000"]