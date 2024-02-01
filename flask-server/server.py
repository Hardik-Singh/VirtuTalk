from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def root():
    data = {"api_key": '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'}
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5003)
