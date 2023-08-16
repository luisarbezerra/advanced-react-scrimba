import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyAgfv3J-JN-hCcirFHLCOR6CsziUpt01VA',
  authDomain: 'vanlife-2224b.firebaseapp.com',
  projectId: 'vanlife-2224b',
  storageBucket: 'vanlife-2224b.appspot.com',
  messagingSenderId: '233272735085',
  appId: '1:233272735085:web:fa5b46bd42f30a9e26d664',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, 'vans');

export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return vans;
}

export async function getVan(id) {
  const docRef = doc(db, 'vans', id);
  const snapshot = await getDoc(docRef);

  return { ...snapshot.data(), id: snapshot.id };
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where('hostId', '==', '123'));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return vans;
}

export async function loginUser(creds) {
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
