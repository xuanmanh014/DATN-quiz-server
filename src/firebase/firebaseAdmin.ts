import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: "datn-f1240",
        clientEmail: "firebase-adminsdk-qv00l@datn-f1240.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxbmzDhfMatESa\nVp5gjvHenr5aCf6+DA8AVp8WIFLbrmiPTiOH+WuVhRA8GeSja3P35iBUe2h/7qrb\nhSu4d7b0KrEnhE1XpjsQn/BOPS7UIqqrqhimG+uJnyYpV2KD+zGw+WQtEz2YDEmP\nefu+HQp5ocGkGIa5ur3A57tTosnS7vS5pKOSSiH/KF4bJFvLvANKRHNJwM3WAttf\n48Ozj/WJmUkYaSzTfsTnRfi6nqG8mqyiktkXfmxgEJYXOfjBHw3I1fE5wRI4j17c\nC8IsJ2fVaiS/pGagj2R+OT05S/ULy3+t3cbQjOIJtnrc/hvuJYBeh3ophj2wSJHo\nmJtTHDYrAgMBAAECggEAO/+0zMtTgVC7MBuhU9KSrK6ufMELgRWPzxP7mN5WVo4c\nMnWAY18vB7Em48P3wmE4JniNrzPKCxTYdwIJ3kexONDk9hFxm/WM3JrRBov+9WJB\np2oOCsG/PNrx6yHvIOVFEOzMeMecWPmyuE9OFyQ34hiWZBidGloxB3X1LRuLtwVh\nBMhCf1BqNoue7/WI48O1l6CbjKP3yXCQ0tVytEqZwtoUdp6uIvNMvIuJH0/YPahb\nYs/uHt7BXg3sdG43PSkVRUIJs+OfTimxr+DZDps3HbIcqkWj3FMicMqCUrsu7bnx\nbJULCVLjRYNEVQGTZprcrvrivcQbqWeBgfaQeiVEDQKBgQDtfqRVXhfndAuHOq8C\nNLC0aaGaUS+aFgdt4SGFkuonzRXcdc1Et/tOHYHCTiIb/Sy7RVfvV95Zv0uq3XeX\nFW2WiBPoAN9RMvFxHFdlaWM05pp4mCVEVX3DDoadbCXaiRPL8Wl9B4QOGPFVY7PZ\nOPSEmYCzXN2HGvs6AM1qqzhUDQKBgQC/Qa+zgqBmw2TPxBCiNJnAin5pcA/pf17D\nKae+MmwInvvPpampYAy5K8dBJrKxYj9lMg7rcuygxa9FZ5Oc8XSGvtV9Q6fcb7Bs\nq7tCZpH52JbStASTe01vjrnQUijFJsBUUecqy0JQKsyHlXclL4fqztgxO9sr2Ulz\nltEATegNFwKBgGFk2geYOr1UPZYLXtHMwdp6pycdvCO4fPt2o8SfZx9DX3+1X6Sa\nvpheSWRhnmNUBBAYc+NXaXvskx9TC0QOKY7d5yvxj6NA/Pqh4MVZ3rFHEHn8Cuxn\nEtf3EQVl4HAqXs/4BIadmm4dlHqsFIk0bjIisUDdCIvraLN0uMjRxpvRAoGAIymf\ndQByHxKTaUNhz4CeN/D+dsIcmtBJCtaQuX4psJgSMcYCYFqBXFX5JzhHKCepAiDm\n71DMwm414Cu/zt3xj4hsVcBnjzaVmBUms3mKIwY4DHr+UGMeBIGYFf3U8xJBz/7S\n4mJGSdjki5TmN9b6RShMRRj9HZ2wTGkQ+d5Y6HcCgYA3Q0vNawqfOaimMCBnJhhL\nDRMfBGodPmmcDSqnvoIx167fT14LitVqiq1oYBnY7AWFOg6hkxL7caohsQz8A7KF\nNEF5u1KPOvztY8jiIfLXugurUSsdBEinPC8fN2ocgYboFtv8VxjVHXlY1P0PkFwL\n9fSYsY68Jb1ot4iz8jeY+Q==\n-----END PRIVATE KEY-----\n",
    }),
    storageBucket: 'gs://datn-f1240.appspot.com',
});

export const firebaseAdmin = admin;