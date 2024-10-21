import admin, { ServiceAccount } from 'firebase-admin';

const serviceAccount = {
    "type": "service_account",
    "project_id": "datn-847e3",
    "private_key_id": "afa339bdb0213257ed4730e9fa8498ee9b653865",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD4SlRhDNglKNGe\nbzv/YVvug2rdXNogFva3glEs6BJU2f61Ddlt5o8KurtDcsv08kEcag58jIP77zjE\nLs1z/RY9C7AetJBFWjXEeAo34sbNIzedyROjkUYkmav9zIKgvSL/ZvDFKYoX7KGT\nKLWFptt6G5HBCMTHtMOguKGEByRfWj0UU9og8yEUjaxSUf1Ux93C8LvV6x3/mIfn\nIn+7oiysFWaPmdipGmGIx616ZNRBCZBarADZIR5NItfl1Xi6Mwgz1R8J60v2t3XK\n2+1QxUdoOF4rFRWmR8oi35I99hHqYdOdiAzNYgiLbjSs9r7rm4dglhOZiyBCzQG7\nEg5Mm5n3AgMBAAECggEAOwj9WBgEOo2ija+4Dcg54hO4MIr3yCJ9pfNj1rAVT7yH\nbcgttw5XW387sFVWvlZtedKTwDRu21OtZSQVsKrwAzLIvPxEw2CoIR9Dmrceer8R\nZcBeHYmYqnIpbU6Xjp15+U0iGVb/oSGf50wKIQ2j6LwuYz3w/+TwkMHlkW1bThpA\nQGUsuvyVDK9/qHXVC6IAUmFZ6HHP/Rr4ZQay6rUVbYeK9VjOiWDtnfESwanaNPT6\nmJxrLC0ZanJC1J1pUBtmglmyWqxWEu1bZRvthyKEiCSS9uW/tZD2PBC1I0uGSe7E\nqF6TF7byzt7wK5AvWPYI2wtZUaYNd2K8ttejeLJLKQKBgQD8qWvXf3um68t9HTxT\niXpjHNs/7GQhG5SlbGGn0NPjVm+HRGWXEFosfwXxqepqhE3CiaFXf+I8tWN2u2Gq\njz40ewxERt6eo0U0sjcIWpASwl9t4xsKItZ4p9vyI77EarjNC3RfQjq4xB9jCfSJ\nVPWl1S8hO2HT2WkBNjtUmRP5bwKBgQD7kh9uLbBJd+lBH57mcw4hfgLynvyaFwTJ\ny6NtxeP6c0tCkN+zH8Mn/Nc4F+7WSOI4uYpIea36jBSOyDillrEyShfKf+ka2gf/\nGDYv+3j0bwXtQj1X5Ljo2ITbuvOde4C7mrCdEa3e03o9Pp+fS+Qj+xjv+CIRZp56\ncW5CKSFT+QKBgQCGKbCKDberOyoilZOjCC1k073Yg73nlq2n6ZUxd0IMRamTOk53\nmMdJOWn+mStQxFBGLK7vt4h6lBbsxTNnTgjJ9UzeNIOh2TC2equeU/iM/YmO4DlL\neJRKHVg9i52QztqyhpKUwqZL1liUToT7J5IJLNqJ2u5nf9qyOgnnMiHZIQKBgQC9\nj9rdI9JNWezKZLBQh+vi8tf3yDMhTS0PfcHVCqOB6fSQ4SefCtT8QbpOi0It99d2\n1OBNQlsFix5GhLqik81LzqbksMOOtzIFV1Ilj8ERtsLph9s/apqm4dgi1lmRliln\ns+VXRaYVXJckpRaUaxQqxJ+C2x+YqxHJw8VIV0PEyQKBgQCSwnJcLmSRNI9vhB5A\nUWwnKYbU6mREihbn980Yx9DvKS+Fu3c4UgPQSRh4QL3LJ/ywGN/uQv+IV3g6Fbvi\nQhGuwY65Ni0D6wJJYRUO1aupQjvtFHJZaz8kTHdIt7orhhTyELVGwH2Og9SCkSuk\n2vTmqJNaKNdrhmwziDvLA648RA==\n-----END PRIVATE KEY-----\n",
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