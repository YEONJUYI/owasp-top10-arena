# 🎯 OWASP Arena

OWASP Top 10 2025 기반 웹 보안 워게임 플랫폼

## 프로젝트 소개

실습을 통해 OWASP Top 10 취약점을 학습할 수 있는 CTF 스타일 워게임 플랫폼입니다.
각 챌린지는 실제 취약점 원리에 맞게 설계되어 있으며, Docker로 격리된 환경에서 실행됩니다.

## 챌린지 현황

| # | 카테고리 | 취약점 원리 | 풀이 방식 | 상태 |
|---|---------|-----------|---------|------|
| A01 | Broken Access Control | IDOR | URL 파라미터 조작으로 타 유저 프로필 접근 | ✅ 완료 |
| A02 | Security Misconfiguration | 기본 크리덴셜 노출 | robots.txt 분석 → 숨겨진 관리자 페이지 접근 | ✅ 완료 |
| A03 | Software Supply Chain Failures | 악성 패키지 백도어 | package.json 분석 → 숨겨진 API 키 추출 → 백도어 엔드포인트 공격 | ✅ 완료 |
| A04 | Cryptographic Failures | Base64 ≠ 암호화 | 세션 쿠키 Base64 디코딩 → 권한 변조 → 재인코딩 | ✅ 완료 |
| A05 | Injection | SQL Injection | 로그인 폼에 `' OR '1'='1` 입력으로 인증 우회 | ✅ 완료 |
| A06 | Insecure Design | 취약한 비밀번호 재설정 | 4자리 숫자 토큰(0000~9999) 브루트포스 공격 | ✅ 완료 |
| A07 | Authentication Failures | JWT alg:none 공격 | JWT 헤더의 alg를 `none`으로 변조 → 서명 검증 우회 → role을 admin으로 변조 | ✅ 완료 |
| A08 | Software or Data Integrity Failures | 서명 없는 역직렬화 | 세션 쿠키 Base64 디코딩 → role을 admin으로 변조 → 재인코딩 후 적용 | ✅ 완료 |
| A09 | Logging & Monitoring Failures | 민감 정보 로그 노출 | 인증 없이 접근 가능한 `/logs` 엔드포인트에서 패스워드·플래그 탈취 | ✅ 완료 |
| A10 | Mishandling of Exceptional Conditions | 예외 처리 미흡 | 비정상 입력으로 예외 유발 → 스택 트레이스·DB 스키마·힌트 노출 → SQL Injection으로 플래그 추출 | ✅ 완료 |

## 시작하기

### 요구사항
- Docker Desktop
- Git

### 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/qu1cks1lv37/owasp-top10-arena.git
cd owasp-top10-arena

# 2. 전체 챌린지 실행
docker-compose up --build
```

### 챌린지 접속 주소

| 챌린지 | 주소 |
|--------|------|
| A01 - Broken Access Control | http://localhost:5000 |
| A02 - Security Misconfiguration | http://localhost:5001 |
| A03 - Software Supply Chain Failures | http://localhost:5002 |
| A04 - Cryptographic Failures | http://localhost:5003 |
| A05 - Injection | http://localhost:5004 |
| A06 - Insecure Design | http://localhost:5005 |
| A07 - Authentication Failures | http://localhost:5006 |
| A08 - Software or Data Integrity Failures | http://localhost:5007 |
| A09 - Logging & Monitoring Failures | http://localhost:5008 |
| A10 - Mishandling of Exceptional Conditions | http://localhost:5009 |

## 기술 스택

- Backend: Flask (Python)
- Frontend: React + TypeScript
- 챌린지 격리: Docker
- 스타일링: Tailwind CSS

## 👤 Author

**퀵실버 (qu1cks1lv37)**
- Korea Polytechnic University Seoul Gangseo Campus
- Cybersecurity Student

## 📄 License

MIT License