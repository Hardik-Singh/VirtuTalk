from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def root():
    data = {"message": "Hello, this is the root route!"}
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5003)
