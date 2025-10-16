# Diabetes Risk Predictor 🩺

> **Note:** This project is for informational and educational purposes only. The predictions are not a substitute for professional medical advice, diagnosis, or treatment.

* **Demo video:**(https://youtu.be/WDubeC_Fvp0)

This project is a web application that predicts the risk of diabetes in a patient based on several diagnostic health metrics. It uses a machine learning model trained on the Pima Indians Diabetes Database and provides a simple, user-friendly interface for making predictions.

## ✨ Features

  * **Interactive Web Interface:** A clean and modern UI for users to input their health data.
  * **Machine Learning Model:** Utilizes a trained Logistic Regression model for prediction, which is loaded using `joblib`.
  * **Dark Mode:** A stylish dark mode toggle for user comfort.
  * **Responsive Design:** The interface is designed to work on different screen sizes.

## 📁 File Structure

Here is the file structure for the project:

```
diabitic/
├── static/
│   ├── style.css         # Styling for the web page
│   └── script.js         # JavaScript for dark mode and form handling
├── templates/
│   └── index.html        # The main HTML page for the user interface
├── app.py                # The Flask backend server
├── diabetes_model.joblib # The pre-trained Logistic Regression model
├── diabetes.csv          # The dataset used for training the model
└── diabitic.ipynb        # Jupyter Notebook with model training and evaluation code
```

## 🛠️ Technologies Used

  * **Backend:** Python, Flask
  * **Machine Learning:** Scikit-learn, Pandas, NumPy
  * **Frontend:** HTML, CSS, JavaScript
  * **Dataset:** Pima Indians Diabetes Database

## 🚀 Setup and Installation

To get this project running on your local machine, follow these steps:

**1. Clone the repository:**

```bash
git clone https://github.com/abhayshaw1601/diabitic.git
cd diabitic
```

**2. Create a virtual environment:**
It's recommended to use a virtual environment to keep dependencies isolated.

```bash
# For Windows
python -m venv venv
venv\Scripts\activate

# For macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

**3. Install the required packages:**
You should create a `requirements.txt` file with the necessary libraries.

  * Create a file named `requirements.txt` in the root directory and add the following:
    ```
    Flask
    numpy
    pandas
    scikit-learn
    joblib
    ```
  * Now, install them using pip:
    ```bash
    pip install -r requirements.txt
    ```

**4. Run the Flask application:**

```bash
python app.py
```

**5. Open the application:**
Open your web browser and navigate to `http://127.0.0.1:5000`.

## 📈 Model Training

The Jupyter Notebook `diabitic.ipynb` contains all the steps for data preprocessing, model training, evaluation, and selection. If you wish to retrain the model or experiment with different algorithms, you can use this notebook. The final selected model (`Logistic Regression`) is saved as `diabetes_model.joblib`.