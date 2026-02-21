# OWASP Arena

OWASP Top 10 2025 기반 웹 보안 워게임 플랫폼

## 🎯 프로젝트 소개

실습을 통해 OWASP Top 10 취약점을 학습할 수 있는 CTF 스타일 워게임 플랫폼입니다.

## 📚 OWASP Top 10 2025

- A01: Broken Access Control
- A02: Security Misconfiguration
- A03: Software Supply Chain Failures
- A04: Cryptographic Failures
- A05: Injection
- A06: Insecure Design
- A07: Authentication Failures
- A08: Software or Data Integrity Failures
- A09: Logging & Monitoring Failures
- A10: Mishandling of Exceptional Conditions

## 🚀 시작하기

### 프론트엔드 실행
```bash
cd frontend
npm install
npm start
```

브라우저에서 http://localhost:3000 접속

### 챌린지 실행
```bash
cd challenges/a01-broken-access
pip install -r requirements.txt
python app.py
```

또는 Docker로:
```bash
docker-compose up
```

## 🏗️ 기술 스택

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router

### Challenges
- Flask (Python)
- Docker

## 📝 Features

- ✅ 10가지 OWASP Top 10 챌린지
- ✅ Flag 제출 시스템
- ✅ 진행도 추적 (localStorage)
- ✅ 힌트 시스템
- ✅ 난이도별 필터링

## 👤 Author

**퀵실버 (QuickSilver)**
- 🏫 Korea Polytechnic University Seoul Gangnam Campus
- 🎓 Cybersecurity Student (ID: 2420110202)

## 📄 License

MIT License