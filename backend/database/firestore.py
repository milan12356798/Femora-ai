import firebase_admin
from firebase_admin import credentials, firestore
import os

# Initialize Firebase Admin SDK
# Ensure you have your serviceAccountKey.json path in environment variables
# export FIREBASE_CREDENTIALS="path/to/serviceAccountKey.json"

def get_db():
    if not firebase_admin._apps:
        cred_path = os.getenv("FIREBASE_CREDENTIALS", "serviceAccountKey.json")
        try:
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        except Exception as e:
            print(f"Failed to initialize Firebase: {e}")
            # Mock or handle gracefully in production
    return firestore.client()

db = get_db()
