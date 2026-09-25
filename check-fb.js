const admin = require('firebase-admin');
const serviceAccount = require('./backend/serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

(async () => {
  const heroSnap = await db.collection('heroVideos').get();
  console.log('--- Hero Videos ---');
  heroSnap.forEach(doc => console.log(doc.data()));

  const reviewSnap = await db.collection('reviewImages').get();
  console.log('--- Review Images ---');
  reviewSnap.forEach(doc => console.log(doc.data()));
  
  process.exit(0);
})();
