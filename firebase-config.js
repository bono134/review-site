/**
 * firebase-config.js
 * Firebase 초기화 설정 파일
 * 예비도서, 어워드 등 모든 페이지에서 공통으로 import해서 사용합니다.
 *
 * 사용법 (각 페이지 스크립트):
 *   import { db, collection, addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from './firebase-config.js';
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
    getFirestore,
    collection,
    collectionGroup,
    addDoc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    where,
    limit,
    serverTimestamp,
    Timestamp
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// Firebase 프로젝트 고유 설정
const firebaseConfig = {
    apiKey: "AIzaSyCjkT-j0eslZs0K_59emmtM3wepyNRJ38M",
    authDomain: "my-review-220d1.firebaseapp.com",
    projectId: "my-review-220d1",
    storageBucket: "my-review-220d1.firebasestorage.app",
    messagingSenderId: "373222913403",
    appId: "1:373222913403:web:d12feef01d0ba66ed8b9de"
};

// Firebase & Firestore 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 초기화된 인스턴스 및 자주 쓰는 Firestore 함수들을 한 번에 export
export {
    app,
    db,
    collection,
    collectionGroup,
    addDoc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    where,
    limit,
    serverTimestamp,
    Timestamp
};
