# A01: Broken Access Control - IDOR Challenge

## 📋 설명
사용자 ID를 조작하여 다른 사용자의 프로필에 접근하는 IDOR(Insecure Direct Object Reference) 취약점 실습

## 🎯 목표
Admin 계정의 비밀 메시지를 찾아 Flag를 획득하세요.

## 💡 힌트
1. URL의 `user_id` 파라미터를 확인하세요
2. Admin의 ID는 1입니다

## 🚩 Flag
`OWASP{admin_pr0f1le_h4ck3d}`

## 🔧 실행 방법

### Python으로 직접 실행
```bash
pip install -r requirements.txt
python app.py
```
http://localhost:5000 접속

### Docker로 실행
```bash
docker build -t owasp-a01 .
docker run -p 8001:5000 owasp-a01
```
http://localhost:8001 접속

## 🎓 학습 포인트

### 취약점
- 권한 검증 없이 URL 파라미터로 다른 사용자 데이터 접근
- IDOR (Insecure Direct Object Reference) 취약점

### 공격 시나리오
1. 일반 사용자로 로그인 (user_id=2)
2. URL의 user_id를 1로 변경
3. Admin 프로필 접근 성공

### 보안 대책
```python
# 현재 로그인한 사용자 확인
current_user_id = session.get('user_id')
requested_user_id = request.args.get('user_id', type=int)

# 본인 또는 관리자만 접근 가능
if requested_user_id != current_user_id and not is_admin(current_user_id):
    return "Access Denied", 403
```

## 📚 참고 자료
- [OWASP Top 10 - A01:2021 Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
- [PortSwigger - Access Control Vulnerabilities](https://portswigger.net/web-security/access-control)
```

---

### `challenges/a01-broken-access/.dockerignore`
```
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
*.so
.env
venv/
ENV/
.vscode/
.idea/
*.log