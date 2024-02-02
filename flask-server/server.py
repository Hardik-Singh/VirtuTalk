from flask import Flask, jsonify
from flask_cors import CORS
from deepface import DeepFace

app = Flask(__name__)
CORS(app)

@app.route("/")
def root():
    objs = DeepFace.analyze(img_path = "test.jpeg", 
        actions = ['age', 'gender', 'race', 'emotion']
    )   
    print("Dominant Emotion:", objs[0]['dominant_emotion'])
    return jsonify(objs[0]['dominant_emotion'])

if __name__ == "__main__":
    app.run(port=5003)
