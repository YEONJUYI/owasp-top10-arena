from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)

CORS(app, origins=[
    "https://*.vercel.app",
    "http://localhost:3000"
])

FLAG = 'OWASP{sql_1nj3ct10n_byp4ss_succ3ss}'
DB_PATH = 'shop.db'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # 상품 테이블
    c.execute('''CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        price INTEGER,
        description TEXT
    )''')

    # 비밀 테이블 (플래그 저장)
    c.execute('''CREATE TABLE IF NOT EXISTS secrets (
        id INTEGER PRIMARY KEY,
        key TEXT,
        value TEXT
    )''')

    c.execute("DELETE FROM products")
    c.execute("DELETE FROM secrets")

    c.execute("INSERT INTO products VALUES (1, '노트북', 1200000, '고성능 개발자용 노트북')")
    c.execute("INSERT INTO products VALUES (2, '마우스', 35000, '무선 게이밍 마우스')")
    c.execute("INSERT INTO products VALUES (3, '키보드', 85000, '기계식 키보드')")
    c.execute("INSERT INTO products VALUES (4, '모니터', 450000, '4K UHD 모니터')")
    c.execute("INSERT INTO products VALUES (5, '웹캠', 95000, 'FHD 화상회의용 웹캠')")

    c.execute("INSERT INTO secrets VALUES (1, 'flag', ?)", (FLAG,))

    conn.commit()
    conn.close()

@app.route('/')
def index():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT * FROM products")
    products = c.fetchall()
    conn.close()
    return render_template('index.html', products=products)

@app.route('/search')
def search():
    q = request.args.get('q', '')

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # 취약점: 입력값을 그대로 쿼리에 삽입
    query = f"SELECT * FROM products WHERE name LIKE '%{q}%' OR description LIKE '%{q}%'"

    try:
        c.execute(query)
        results = c.fetchall()
    except Exception as e:
        conn.close()
        return jsonify({'error': str(e)}), 500

    conn.close()
    return render_template('search.html', results=results, q=q)

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5004, debug=False)