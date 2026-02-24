from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'super-secret-key-dont-tell'

CORS(app, origins=[
    "https://*.vercel.app",
    "http://localhost:3000"
], supports_credentials=True)

USERS = {
    1: {
        'id': 1,
        'username': 'admin',
        'email': 'admin@owasp.local',
        'role': 'Administrator',
        'secret': 'OWASP{p0st_b0dy_1d0r_pwn3d}'
    },
    2: {
        'id': 2,
        'username': 'alice',
        'password': 'alice123',
        'email': 'alice@owasp.local',
        'role': 'User',
        'secret': 'Nothing interesting here...'
    },
    3: {
        'id': 3,
        'username': 'bob',
        'password': 'bob123',
        'email': 'bob@owasp.local',
        'role': 'User',
        'secret': 'Just a regular user'
    }
}

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        for uid, u in USERS.items():
            if u.get('username') == username and u.get('password') == password:
                session['user_id'] = uid
                return redirect(url_for('dashboard'))
        return render_template('index.html', error='Invalid credentials')
    return render_template('index.html', error='')

@app.route('/dashboard')
def dashboard():
    uid = session.get('user_id')
    if not uid:
        return redirect(url_for('login'))
    u = USERS[uid]
    return render_template('dashboard.html', user=u)

# ── 취약한 API ──────────────────────────────────────────────
@app.route('/api/profile', methods=['POST'])
def api_profile():
    """
    [VULNERABILITY] 세션의 user_id가 아닌 body의 user_id를 신뢰함.
    Burp Suite로 body의 user_id 변조 → 타 유저 데이터 접근 가능
    """
    if not session.get('user_id'):
        return jsonify({'error': 'Not authenticated'}), 401

    data = request.get_json(silent=True)
    if not data or 'user_id' not in data:
        return jsonify({'error': 'Missing user_id in body'}), 400

    target_id = int(data['user_id'])
    user = USERS.get(target_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # 핵심 취약점: 세션 검증 없이 요청된 user_id 그대로 반환
    return jsonify({
        'id':       user['id'],
        'username': user['username'],
        'email':    user['email'],
        'role':     user['role'],
        'secret':   user['secret']
    })

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    print("""
    ╔══════════════════════════════════════════════════════╗
    ║  OWASP Arena 2025 - A01 (고도화)                   ║
    ║  Broken Access Control: IDOR via POST body          ║
    ║                                                      ║
    ║  🎯 alice/alice123 로그인 후 POST /api/profile      ║
    ║  🔧 Burp Suite로 body.user_id → 1 변조             ║
    ║  🚩 Flag: OWASP{p0st_b0dy_1d0r_pwn3d}             ║
    ║  🌐 http://localhost:5000                           ║
    ╚══════════════════════════════════════════════════════╝
    """)
    app.run(host='0.0.0.0', port=5000, debug=False)