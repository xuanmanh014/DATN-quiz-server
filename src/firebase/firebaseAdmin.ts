import admin, { ServiceAccount } from 'firebase-admin';

const serviceAccount = {
    "type": "service_account",
    "project_id": "datn-f1240",
    "private_key_id": "3728982afac9d3bb409356ad953d43dbf7b6707c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSZ2RGfagAFhDH\nUKjO9xH2LAIL3XncD6EynYxoG4Q3mH7FSrxVCojTakiuUqTgKU7RXtBgIOhOF1Ge\nVOjkWuwzYUPDUJRyPAIk24ebvoCZmKg/+uzXj2ZW7yL2NvRwED4CCayAToq6F39X\nEqpaO7QdNRuExrKorwyMyA4W7UnAJPafCrbdsalfqzGEvC7pRufm+PqaG/T4SdfG\n9Ugvt9hvPgSwJ3SCEBU6H36NlvD/rMkVNsYifxxHQE618fm6aPWzn+aNQxPIs3Kc\nil27+VH30R8vqqNXLfVW8rjmlIKYh/RxS610MH83rTTiFs3IaRdxCoepqQpPEmRP\n6ukSCKd1AgMBAAECggEAAJEpncOcfszsaWE3binIe4bFxpb9Lawv0yWHZtsobXCy\nmQAGRQwNO0hk71aUReaoY/41L2d2juA0lDjpoqzJemoiMY5NLONs8giZo1xJsjlE\nTuR2vgpTpVA4IfJU4F7nu+lJWOvfn1iPnojiI7Gp1m0fZf8WWmSR11+/p44UDuGe\n7x6fAwkOhLNz2JEZK7YGZE9ZYASiQrSB1RGp4n3roGKA44x7FuXTl3jst8Plu3NK\nZ4M+gfreDhR1GgOK/YX4fsmN4IBoCHtAOWxGuZsrQFm3zZzNthzvUjLQ8LaT0/iP\nov9cl2cEQVi8w13dCkafKTcFFnxmYyHfMdMg85nzYQKBgQDMMWamxytOGa+aWZ0J\nhbXTIm0CEs2NPK0WjKWXvBqChxam5zLgXdNbzEnq+Wds+V44xg+jhUso7+8DOnLo\nisYYUT6eSIDDZUtjRY9NJY3MK1XW5ZXQD3A3fjUF5nsixfEPGzAi8vOk52PEq4mY\nX8vFUpmrMXoBxZTN5M+/z6liBQKBgQC3jIN9MCxf41f+BQWGZpAjDcI+wXTI4gC6\n7oHTl/NHJLPy/uAZuhbqNa0LESC5933xfr2N9xaq8p6Z10ugquKNSBuyG8uxJxy3\na/3F6AzdL4RfUgq/3bKLyiWbRSp6VPhyeOdX+tNNQauo7CDikXcPYlWpXU0/zlBg\nxIooWtf6sQKBgHt4v9bHhsMiOxI9b/0LEmiKX5oqXosyDoQdJiC7iNg28ZaZJSWQ\n9raCsIvaphS6MaRo95nshwdJFqFAHa3KBIE913yE4P/GZ7CupjmDJNw5tB1PFKkM\nPNIBifR4aysawGpfCVuIx5WGqciJ5ZjzDFfUW8GuGFWr8RATdSBKZOU1AoGBAK7p\nW2BQKOlTp8WtGV/DmzWcZfARwO2x2UpKATQXiEDSrB0zX3GE0VNtxTJXpx0wyTb6\nNT71KQfM3vDxpuM8FVrXTXVEYa62+/mbEqGnCaM6JeYEM7Q1W3E1OPMnTVx4Xq4P\noz5HC1eC7keyhYADaTci2UjlXbkhLZ2ZjaL5NvpxAoGAEBkES2hrr7HuHU9YjOGa\ndPDM4Qm0sPKHWlSBDRuoUIlX2Cxcfi0/sbbCJhuzZf6JwvtXSpmvUySCeqOU8wA4\nJZGk8OVGp9OLHP1gosSMxkS7jGtgZFwxC4ZuBSCdSo4CpBDqvbNbioWsK/kpsl2P\nMEp/bUK/BV26Kcy/AlUozuA=\n-----END PRIVATE KEY-----\n",
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