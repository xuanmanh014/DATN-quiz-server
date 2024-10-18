import admin, { ServiceAccount } from 'firebase-admin';

const serviceAccount = {
    "type": "service_account",
    "project_id": "datn-847e3",
    "private_key_id": "19b8193b245259a71df96604a395b12511c8d435",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC3WApjoe9f46TD\nsThwD2w7N02Ym9IhgPXkDmWhwckwwGDJQTHeihAf/tjnQbfQNHBNAZQax7twM9d7\noAbB6gocRQBh/o96VHySgPISfhX1i3g8X2qN/d1/jo+2Fvh25+FvNlV19x9y35Yk\nOfxVQGk+SIgwtpIVj5cAVItjNNZ6Sbtdm3GDHzr44t0e9b6GfMhY1iKymy2cFQiT\nHM1PkBweSTl3lgvMyDA+tGuwjR0Hs96hlk+JtMkuB7kWjv7ZAV98RCLdplPVjqyI\nPsquE4iwtusmqxzUnTEMZpjaU3r2ppskS8KRwJ83PIVkkjCy8GVIBNROx2TF4F4O\nUqXxa5E7AgMBAAECggEAQnp+0d9+n0M4k+hncWJ2OQZ1cVdWmuVaw0VhHoTYgX/P\n2El2Xp2q+R774OZYUvsgmRtwa0FuumFhyaadrKRC5Ds0x1N5DL8jqC9vFrt3FOBs\nSV/DkBazwLOdckXj86FigWOvGyXu1kUx+JK55uODBZ1hHGCmmYDGHM2K+P7IofAK\ne1D68+EIWUovgvvUnfMwLPWlIuN8jQPi0hFjHHYShfyxeOMVkK9Wmv9oKzDBVgX5\nbeWl7s1KEkb+tKwR2iMxLmHlVBXcITia48ajvmDxCe8XtegmoOzauiK9IG23IDCX\n2bXT9GbWKDqEw+HfHJopx5eixsVMKS5pW6O46/CC6QKBgQDsAxFzGgZUmFIbux5W\nIuZMNnY3zH9v9mB8xiF6/rEJBu4E9Lmg79fNU1mtqbmvry08H2q1HMI50tFkF4nr\n6h3NEnMNDGQ5oMm+Lf3ohOBbZB/a/sElIAC4SGxZCejB4t2BIqN32c357SNl+lGj\na9jM4aaqv7qMZkeJ+Yd/2kb6/wKBgQDG3xXuzUlrVbCPQtyHfkDTt7OtUHmJepC0\nt53UwfRBKrwSSirO3GmD9Oj3YD4290Cw96DIlU/NVpyGfbwfvXYzUv+jgTkjCgZP\nv2KY9TZqRqcY5JK1/TSiUTqPwlaVCBxP7B1ggoxOcnqhMZQ8qyu8nxrhc0xJ1z9B\nZ9TT5UqVxQKBgH/GNXdEWrMH+EQNLSJjKJ2QSrZw33mlQJ2swsmNBBmoB8rlF26b\nCxGdk4qiveXwiCPpumKtXDXj/fsbh08S4+l3mJQy5jwQ4cg1rCZrce/oqBpvG/BW\ngC1FAGvAIqR9h4B3WVr0r0Ak86otOG+qXqilbg85V+zVHtwDHSnJ6e3PAoGAf0ms\nhSN6OawoDRoTgtnJbnmnFGhs0hTT6AeaiuH1j3xl0iMMkUi8dIxeTG+agp3xFxP4\nIkqHQHuORfrWXU5sCF+4ZhPA2W+CKKrr1dElmhJMw38RdFBzzuzE2dzehBcj3/fV\nub71RQS6/s93/PjmTp1bnC+rBZwyzY9Cxrl86q0CgYBZXhFcBg9r0i9IQkCo4SUC\nh024f/g9F0OF++5/UnyXQchMeX+borzt5T5vWebjCEkLS7GSiJ9R2wywigaUy6mA\nzbk23WxStDZeyF8bAbKqzXOvN7OmKDrvbYa3eLvrgjQWEKYUN/8lazddFe9Kq6qZ\n1nYQqmaWZALithAiZ0lseg==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-gf145@datn-847e3.iam.gserviceaccount.com",
    "client_id": "100533812967985625190",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gf145%40datn-847e3.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
} as ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://datn-847e3.appspot.com',
});

export const bucket = admin.storage().bucket();