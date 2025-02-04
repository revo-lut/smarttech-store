// Конфігурація Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Ініціалізація Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Елементи сторінки
const loginForm = document.getElementById('login-form');
const adminDashboard = document.getElementById('admin-dashboard');
const ordersList = document.getElementById('orders-list');
const addProductBtn = document.getElementById('add-product-btn');

// Обробник форми входу
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('admin-email').value;
  const password = document.getElementById('admin-password').value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    showAdminDashboard();
  } catch (error) {
    alert('Невірний email або пароль.');
  }
});

// Показати панель управління
function showAdminDashboard() {
  adminDashboard.style.display = 'block';
  loginForm.style.display = 'none';

  // Отримати список замовлень
  db.collection('orders').onSnapshot(snapshot => {
    let ordersHTML = '';
    snapshot.forEach(doc => {
      const order = doc.data();
      ordersHTML += `
        <div class="order-item">
          <h4>Замовлення №${doc.id}</h4>
          <p>Товари: ${order.items.map(item => `${item.name} × ${item.quantity}`).join(', ')}</p>
          <p>Загальна сума: ${order.total} грн</p>
          <p>Клієнт: ${order.customerName} (${order.customerEmail})</p>
        </div>
      `;
    });
    ordersList.innerHTML = ordersHTML;
  });
}

// Додавання нового товару
addProductBtn.addEventListener('click', () => {
  const productName = prompt('Введіть назву товару:');
  const productPrice = parseInt(prompt('Введіть ціну товару:'));

  if (productName && productPrice) {
    db.collection('products').add({
      name: productName,
      price: productPrice
    }).then(() => {
      alert('Товар додано!');
    }).catch(error => {
      alert('Помилка: ' + error.message);
    });
  }
});

// Вихід з адмін-кабінету
auth.onAuthStateChanged(user => {
  if (!user) {
    adminDashboard.style.display = 'none';
    loginForm.style.display = 'block';
  }
});
