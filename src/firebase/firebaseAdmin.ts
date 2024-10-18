import admin, { ServiceAccount } from 'firebase-admin';
import { bucketName, firebaseServiceAccount } from './firebase-secret';

const serviceAccount = firebaseServiceAccount as ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketName,
});

export const bucket = admin.storage().bucket();