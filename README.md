# 🛡️ OWASP Top 10 2025 Arena

**실전 웹 해킹 학습을 위한 CTF 플랫폼**

OWASP Top 10 2025 취약점을 직접 체험하고 학습할 수 있는 인터랙티브 CTF 환경입니다. Burp Suite, sqlmap, gobuster 등 실제 펜테스팅 도구를 사용하여 10가지 웹 보안 취약점을 공략하세요.

🌐 **Live Demo**: [https://owasp-top10-arena.vercel.app](https://owasp-top10-arena.vercel.app)

---

## ✨ Features

- 🎯 **OWASP Top 10 2025 기반 챌린지** - 최신 웹 보안 취약점 10가지
- 🐳 **Docker 컨테이너 환경** - 독립된 챌린지 환경 (포트 5000-5009)
- 🔧 **실전 도구 활용** - Burp Suite, sqlmap, gobuster 등 프로 도구 필수
- 📊 **진행상황 추적** - Supabase 기반 실시간 진행률 저장
- 🏆 **리더보드 시스템** - 사용자 간 점수 경쟁
- 💡 **단계별 힌트** - 3단계 힌트로 학습 가이드

---

## 🎮 Challenges

| ID | Category | Title | Difficulty | Points | Tools |
|----|----------|-------|------------|--------|-------|
| A01 | Broken Access Control | IDOR via POST Body | Easy | 100 | Burp Suite |
| A02 | Security Misconfiguration | Default Credentials | Easy | 100 | Browser |
| A03 | Supply Chain Failures | Malicious Package | Medium | 200 | curl, base64 |
| A04 | Cryptographic Failures | Weak Hash Cracking | Easy | 100 | crackstation, hashcat |
| A05 | Injection | SQL Injection | Medium | 200 | sqlmap, Burp Suite |
| A06 | Insecure Design | Token Bruteforce | Hard | 300 | Burp Intruder |
| A07 | Authentication Failures | JWT alg:none Attack | Easy | 100 | jwt.io, curl |
| A08 | Data Integrity Failures | Pickle Deserialization | Medium | 200 | Python, curl |
| A09 | Logging Failures | Unprotected Logs | Easy | 100 | gobuster |
| A10 | Exception Handling | Error Information Disclosure | Medium | 200 | Burp Suite |

**Total: 1500 Points**

---

## 🛠️ Tech Stack

### Frontend
- **React** + **TypeScript** - UI 프레임워크
- **Tailwind CSS** - 스타일링
- **Vite** - 빌드 도구
- **React Router** - 라우팅
- **Supabase** - 인증 및 데이터베이스

### Backend
- **Flask** - 각 챌린지 서버
- **Docker** - 컨테이너 환경
- **SQLite** - 챌린지 내부 DB

### Deployment
- **Vercel** - 프론트엔드 배포
- **Docker Compose** - 로컬 챌린지 실행

---

## 🚀 Quick Start

### Prerequisites

필수 도구를 설치하세요:
- **Docker Desktop** - 챌린지 컨테이너 실행
- **Node.js 18+** - 프론트엔드 개발
- **Python 3.9+** - 백엔드 개발

### Installation
```bash
# 1. 레포지토리 클론
git clone https://github.com/yeonjuyi/owasp-top10-arena.git
cd owasp-top10-arena

# 2. 프론트엔드 설치 및 실행
cd frontend
npm install
npm run dev
# → http://localhost:3000

# 3. 챌린지 서버 실행 (Docker)
cd ../challenges
docker-compose up -d
# → http://localhost:5000-5009
```

### Environment Variables

프론트엔드 `.env` 파일 생성:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🔧 Required Tools

챌린지 해결에 필요한 도구:

### Essential
- **Burp Suite Community** - HTTP 프록시 & 인터셉터
  - 설치: https://portswigger.net/burp/communitydownload
- **curl** - 커맨드라인 HTTP 클라이언트
  - Windows: `choco install curl` 또는 Git Bash 사용
  - Linux/Mac: 기본 설치됨

### Optional
- **sqlmap** - SQL Injection 자동화 도구
```bash
  pip install sqlmap
```
- **gobuster** - 디렉토리 브루트포스
```bash
  # Windows
  choco install gobuster
  # Linux
  sudo apt install gobuster
```
- **hashcat** - 해시 크랙 도구
```bash
  # Windows
  choco install hashcat
  # Linux
  sudo apt install hashcat
```

---

## 📖 How to Play

### 1. 회원가입 & 로그인
Supabase 인증으로 계정 생성

### 2. 챌린지 선택
10개 챌린지 중 하나 선택

### 3. 챌린지 열기
"챌린지 열기" 버튼 클릭 → Docker 컨테이너 접속

### 4. 취약점 공략
힌트를 참고하여 실전 도구로 취약점 발견

### 5. Flag 제출
`OWASP{...}` 형식의 Flag를 입력하여 점수 획득

### 6. 리더보드 확인
다른 참가자들과 점수 비교

---

## 🏗️ Project Structure
```
owasp-top10-arena/
├── frontend/                # React 프론트엔드
│   ├── src/
│   │   ├── components/     # 재사용 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── services/       # API 서비스
│   │   └── data/           # challenges.json
│   └── package.json
├── challenges/              # Flask 백엔드 챌린지
│   ├── a01-broken-access/
│   ├── a02-misconfiguration/
│   ├── ...
│   └── docker-compose.yml
└── README.md
```

---

## 🐳 Docker Commands
```bash
# 모든 챌린지 시작
docker-compose up -d

# 특정 챌린지만 시작
docker-compose up -d a01

# 로그 확인
docker-compose logs -f a01

# 모든 챌린지 중지
docker-compose down

# 재빌드
docker-compose up -d --build
```

---

## 🎓 Learning Resources

- [OWASP Top 10 2025](https://owasp.org/www-project-top-ten/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [HackTheBox Academy](https://academy.hackthebox.com/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)

---

## 📸 Screenshots

> 스크린샷 추가 예정

---

## 🤝 Contributing

Contributions are welcome! 

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- OWASP Foundation for security guidelines
- PortSwigger for Burp Suite
- All contributors and testers

---

## 📧 Contact

**Author**: 퀵실버 (qu1cks1lv37)
- GitHub: [@yeonjuyi](https://github.com/yeonjuyi)
- Email: [Qu1cks1lv37@gmail.com]

---

⭐ **If you found this project helpful, please give it a star!**