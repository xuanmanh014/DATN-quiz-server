import admin, { ServiceAccount } from 'firebase-admin';

const serviceAccount = {
    "type": "service_account",
    "project_id": "datn-847e3",
    "private_key_id": "12c83df923f392c088e0b62449cd713f03bcb4a5",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCnIoq/Q75hvxdH\nqpR+iu+Jsu29SBzcUVGxRtUWOxOfM1SEepy59+M/IBUoRVl7ahZ2fGnC/oTHwldd\nUJuNGMbTOB2Tey1kKRk7B7IK/8Pt1vSo/NqInn39aZE5jj5fxCQhFBNBWdBILnTL\n10UVylBb80JjZZzc1cfWlQ8Z44WZ+UXFeHC99L/dcWmW+nMWoe+KXzcpd7h/THbU\nuNGcz8GTc79Os3kQdAXcCZZHhSdH/ojYjhT33spdVoQktJD98riQuyY8OGmrm6dB\nVFjIO+9C86lvcQDEdM6shGlaWAsmKbMRRhIL6wiAsIk1tbWriM5EMm3h2/5ED7wI\nYA/EzwJzAgMBAAECggEAEoaZUIgRc0OQ213Eu0i/3R3bN6Q6/A97eaX7T/fZE0gc\n8dj8GapTeGzK9j1xpLoRUVg1tOqCDKO1trSM+Wp/Uhb3QvYKsFPUkHQoP7XdTDYL\nxSt54bOHuEOFAxc0QhM7WftKrcS8ed5vDc/dFYQ+Z2LNv2IaWBQjjt0o4QVqNV3R\nM2H8K0773sfHXRsBERMoOtWvcKaufV7K5Bt7fYZhK6wfE7UqXgH3cM/iXHkTloAw\nEccYlir8jYiJwtWYBkSHMFQZqeAAqL/J+WFMwYhIhkmDo2YhIqZrkwJlj8GAqGlM\nXu8Rskghu3GlnOYJgDuXKqIZH6AYsK/graawB2DrmQKBgQDTGbZU8L+Ye6vSs6/m\nMKirrnr/2TDwGMvslmy+wfz7vhKwjEncFeCeh7wEzxB0Y9lPrTZ+4XWfV18L+OLS\npvTGF0i7RrnizyDV+TqNB0HMCz8dos5hYdZrvggKRHKzLJYAQ9JYu3F7MSnTTSlg\nX9QLS/THwElOQ8RNkaEtqn98bwKBgQDKru9imfxc8b4K9oUINuPf/7j0TygAQUot\njVoyIvEsN7O6t2iuu+f3J4Aq8VzowPutjwg8JN/hVxloVcFEgYUOOcHBr+faphlv\nDFWtQMgqDsQXAMmyilnA0jNJIA3/LuXLHEUaDKR/heOjY0fApBwnyQ5UTOBDvNj0\n+Hom1N1kPQKBgQCcx67b3MVfGRJedSdBXYgXoYkmNQccej4RoxJ2hho+WUcGKdq9\nAt6EvqhMJgDBgFqnyyv7BbVWtwwXFyxWaLrH2AkjVX6+zThE0knC7c3XHc8tUnnW\nZ1RZRpQwE+/f1FA/OB+j2OqKJNQ8Y0VEl0cjcLEGHXAUGU5UkcDT6pmuLwKBgQCP\nMjTStvRDPlAEMtMeUJmCgotLoDkkpPwhXsKgtWsq0FfczQPan8ttJK06qbf4gY/O\nuUUaKPs7m2vJ+PxIyDEXMdsgWoU2Ry+k81P8yc4hWLlVfysBRxnOTzQIr+rzpVCY\nxWpU0yXNKuz/XH8vLULvIO9Mw9uWP/AQcxTqJm4cCQKBgQCEcrLPitOgZDA5VlrV\nRe9TDLrvqSz5L+7BO3FR4sqaR0crPo6ZfPhBgJZ4znVDQ2O6v+lg3XS1aAytBIG5\nCMgE6l6rEoN8dGG39V4zy2D/t+EoKzkAELK4aDAP0bhvWuqB11/l4T1+j+mUztCN\n+p8o3rV1qi4ldjE6Q9BCjCcGrA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-gf145@datn-847e3.iam.gserviceaccount.com",
    "client_id": "100533812967985625190",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gf145%40datn-847e3.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
} as ServiceAccount

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://datn-847e3.appspot.com',
});

export const bucket = admin.storage().bucket();