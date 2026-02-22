# 🎯 OWASP Arena

OWASP Top 10 2025 기반 웹 보안 워게임 플랫폼

## 프로젝트 소개

실습을 통해 OWASP Top 10 취약점을 학습할 수 있는 CTF 스타일 워게임 플랫폼입니다.
각 챌린지는 실제 취약점 원리에 맞게 설계되어 있으며, Docker로 격리된 환경에서 실행됩니다.

## 챌린지 현황

| # | 카테고리 | 취약점 원리 | 풀이 방식 | 상태 |
|---|---------|-----------|---------|------|
| A01 | Broken Access Control | IDOR | URL 파라미터 조작으로 타 유저 접근 | ✅ 완료 |
| A02 | Security Misconfiguration | 기본 크리덴셜 | robots.txt 분석 → 관리자 로그인 | ✅ 완료 |
| A03 | Software Supply Chain Failures | 악성 패키지 백도어 | package.json 분석 → 백도어 엔드포인트 공격 | ✅ 완료 |
| A04 | Cryptographic Failures | Base64 ≠ 암호화 | 쿠키 디코딩 → 권한 변조 → 재인코딩 | ✅ 완료 |
| A05 | Injection | SQL/Command Injection | - | 🔧 개발 중 |
| A06 | Insecure Design | - | - | ⏳ 예정 |
| A07 | Authentication Failures | - | - | ⏳ 예정 |
| A08 | Software or Data Integrity Failures | - | - | ⏳ 예정 |
| A09 | Logging & Monitoring Failures | - | - | ⏳ 예정 |
| A10 | Mishandling of Exceptional Conditions | - | - | ⏳ 예정 |

## 시작하기

### 요구사항
- Docker Desktop
- Git

### 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/qu1cks1lv37/owasp-arena-2025.git
cd owasp-arena-2025

# 2. 전체 챌린지 실행
docker-compose up --build
```

### 챌린지 접속 주소

| 챌린지 | 주소 |
|--------|------|
| A01 - Broken Access Control | http://localhost:5000 |
| A02 - Security Misconfiguration | http://localhost:5001 |
| A03 - Supply Chain Failures | http://localhost:5002 |
| A04 - Cryptographic Failures | http://localhost:5003 |

## 기술 스택

- Backend: Flask (Python)
- Frontend: React + TypeScript
- 챌린지 격리: Docker
- 스타일링: Tailwind CSS

## 👤 Author

**퀵실버 (qu1cks1lv37)**
- Korea Polytechnic University Seoul Gangnam Campus
- Cybersecurity Student

## 📄 License

MIT License