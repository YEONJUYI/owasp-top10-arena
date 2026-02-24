FROM python:3.11-slim

WORKDIR /app

# requirements 복사 및 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 앱 파일 복사
COPY . .

# 포트 노출
EXPOSE 5000

# 앱 실행
CMD ["python", "app.py"]