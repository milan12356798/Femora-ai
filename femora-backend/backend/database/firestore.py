import firebase_admin
from firebase_admin import credentials, firestore
import os
import logging

logger = logging.getLogger(__name__)

class MockFirestoreClient:
    def collection(self, name):
        return self
    def document(self, name):
        return self
    def get(self):
        class MockSnapshot:
            exists = False
            def to_dict(self): return {}
        return MockSnapshot()
    def add(self, data):
        logger.info(f"Mock DB Add: {data}")
        return None
    def set(self, data):
        logger.info(f"Mock DB Set: {data}")
        return None
    def stream(self):
        return []

def get_db():
    if not firebase_admin._apps:
        cred_path = os.getenv("FIREBASE_CREDENTIALS", "serviceAccountKey.json")
        try:
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        except Exception as e:
            logger.warning(f"Failed to initialize Firebase (missing serviceAccountKey.json). Using Mock DB. Error: {e}")
            return MockFirestoreClient()
    
    try:
        return firestore.client()
    except Exception as e:
        logger.warning(f"Firestore client failed. Using Mock DB. Error: {e}")
        return MockFirestoreClient()

db = get_db()
