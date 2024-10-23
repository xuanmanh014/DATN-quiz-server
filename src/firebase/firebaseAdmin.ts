import admin, { ServiceAccount } from 'firebase-admin';

const serviceAccount = {
    "type": "service_account",
    "project_id": "datn-f1240",
    "private_key_id": "3a31308722cc61c9aaf2e2f96403fa19dff59022",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClE37+wWCOKxaj\nMvctHiWGqOVGyHLcMDqj92gJwNVSp/qUxQgIZg6WTxsJJPuAx5AFgA102+wz6+UM\nLVWS93es3zRvLHrZPSWkhMfdAAlhNoIUxeQagGQZYlZGYK6MfjedSKeSBgIjltJT\nmQeDGkmXQlmywyio/sdxzey1TkfbkN9L+MK5slRfWscGcJeQANwy5LANNexbseYZ\nHqsLN5yLsjAq6T6lWM21Mz3cJFlnlJQK06qMaiN86ulCZmnWVnqxhr3BQulDo4OC\n58pJH3d2RQXAAncBMbOob55RPYndk6bl+XDDSxhQxXSj4JGEZf1wmNb5AcH5Zx0p\n4JJ9H1P7AgMBAAECggEABW8yX5WjJZsCiEXdwET9TEUUIzPnIBuQWqSC7stD2pBA\nHhSscoZVlZouFCt9AhzPv3abOs0gpgbuh+uYJRnzfSPt+Hj45Fzwd82NPNfK90HR\nn3hyTXMLmJBVscRuCp7/GrTxG0wKVvyYmPrxNd4wLQQYqttk48dbboIueDuG/xHk\nzuYA5OLllAto6sq2BrOUsznj/kfPizrE87b/wXVeioSuCwjjCwwiR6qLtMh4jM/S\nY0lqdhR3+4fIBj3K4wjA1Gpu8RU1OxZBHjqyOOCbb8pV+SWRlSQWe1qd8enCRoa0\nz/D5YMupisEoPWs47eXCu6H5SkfwrV0bo3Nq3ZMrwQKBgQDcHKvTkjx/JOjfLQC4\noD+SaAtsOn2xh0qAgk4kE6ZYAUoJQOLwPAQLleSj6mBrdUbQIaY4BgT3N9LR5kf7\n5DGifYMN88X7sHtG/ecEFr3bhnLFQODMA6UAOC6Eq3t/3yoAsIwGx3KVy2zwwfa7\nxfDjmckGYR0IbHMo4wMTnK4NOwKBgQC//apXSahxn6joPaBsNOsveUMUdYnqYFJB\nKeTwhDgZEQ4VvjCJ3abyrR8YRhvQXh4pHIT8Z1DQ564+ZRlfEzt28dUhl3tZKSPS\nYkJHKr+MG8A+inVLCESLKWev6+sws3vSoLe2yAw0KJezN5Zg6b6IjsNdd4hL/sT3\nWtoivcpoQQKBgEB9AfaltKXHqZahd8Gf6aA6bYZTCLp3meNWyhAV1bmY/xkA8rxR\nyRmf2/IOXBt/q7SU9z8YvGG18EVhA5wQOl6SCVCQKGRaS3P8Na/j/dIQbRXPsUz0\nkGYlD7P9DdzkBElZcF0YGEE87XkISwKutqnoR5Zf44KxS3giMqePUws7AoGACidW\nPOuOVwQEoNOxikd6MLaPD6PvuU+CyiN3EilL9jdqsUevtXrde3Qgct4yVmDD45S4\ni8jDA2ldU7txDhAsUuwTQ4WJZnvAgz3jF3RxUO2eyy/zaBZ12Y5FB47Ij3jOkaMi\nVC5cRt3mt/m2oEV8aCh0uJq7wJkmvZY2dyPmcoECgYEAql8ZZ6v4sDRt7BpVcZZ4\n9iSa2VxY5MfF74BG+hs5oClMDZ9Kk+AjThqZDr/SGsNrTOCYtrEs0vAQE0ew8mO3\nDhF4GdoC8ZUeCoAkhUbcdBcu6xNtnOKMYqK3KEBFmvNgiqNzVaWvpDz9OaBgYyut\nSBdy6DpKA7uoicGG30BDlUE=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-qv00l@datn-f1240.iam.gserviceaccount.com",
    "client_id": "105568623640200469810",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qv00l%40datn-f1240.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
} as ServiceAccount

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://datn-f1240.appspot.com',
});

export const bucket = admin.storage().bucket();