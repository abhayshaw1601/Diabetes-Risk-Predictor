from flask import Flask, render_template, request, jsonify
import numpy as np
import joblib
import os
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


try:
    # Load the pre-trained model
    model_path = os.path.join(os.path.dirname(__file__), 'diabetes_model.joblib')
    model = joblib.load(model_path)
    
    # Load and fit scaler with the training data
    data_path = os.path.join(os.path.dirname(__file__), 'diabetes.csv')
    training_data = np.genfromtxt(data_path, delimiter=',', skip_header=1)
    X_train = training_data[:, :-1]  # All columns except the last one
    
    # Create and fit scaler with the training data
    scaler = StandardScaler()
    scaler.fit(X_train)
    
    print("Model and scaler loaded successfully!")
except Exception as e:
    print(f"Error loading model or preparing scaler: {e}")
    model = None
    scaler = None


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        data = request.json
        # Extract features in the correct order
        features = np.array([[
            float(data['pregnancies']),
            float(data['glucose']),
            float(data['bloodPressure']),
            float(data['skinThickness']),
            float(data['insulin']),
            float(data['bmi']),
            float(data['dpf']),
            float(data['age'])
        ]])
        
        # Transform the features using the pre-fitted scaler
        features_scaled = scaler.transform(features)
        
        # Get prediction and probability
        prediction = model.predict(features_scaled)
        probability = model.predict_proba(features_scaled)[0]
        
        print(f"Debug - Scaled features: {features_scaled}")
        print(f"Debug - Prediction: {prediction}")
        print(f"Debug - Probability: {probability}")
        
        return jsonify({
            'prediction': int(prediction[0]),
            'probability': float(probability[1])  # Probability of positive class
        })
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 400
    
if __name__ == '__main__':
    app.run(debug=True)