FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy project
COPY . /app/

EXPOSE 8000

# Simple run command with correct project name
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]