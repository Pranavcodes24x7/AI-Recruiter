from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    print("\n" + "="*50)
    print("AI RECRUITER LOCAL FLASK SERVER")
    print("Running on http://localhost:8080")
    print("Press Ctrl+C to stop")
    print("="*50 + "\n")
    app.run(host='0.0.0.0', port=8080, debug=True)
