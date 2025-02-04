.product-card {
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: scale(1.05); /* Збільшує картку при наведенні */
}
document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', function () {
    alert('Товар додано до кошика!');
  });
});
// Змінна для зберігання товарів у кошику
let cartItems = [];

// Функція для додавання товару до кошика
function addToCart(product) {
  // Перевіряємо, чи товар вже є у кошику
  const existingItem = cartItems.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  // Оновлюємо вміст кошика
  updateCart();
}

// Функція для оновлення вмісту кошика
function updateCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Очищаємо попередній вміст кошика
  cartItemsDiv.innerHTML = '';

  // Якщо кошик порожній
  if (cartItems.length === 0) {
    cartItemsDiv.innerHTML = '<p>У вашому кошику поки що немає товарів.</p>';
    cartTotalSpan.textContent = '0 грн';
    checkoutBtn.disabled = true;
    return;
  }

  // Розраховуємо загальну суму
  let total = 0;

  // Виводимо кожен товар у кошику
  cartItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Ціна: ${item.price} грн × ${item.quantity} шт.</p>
      <button class="remove-btn" data-name="${item.name}">Видалити</button>
    `;
    cartItemsDiv.appendChild(div);

    // Додаємо обробник події для кнопки "Видалити"
    div.querySelector('.remove-btn').addEventListener('click', function () {
      removeFromCart(item.name);
    });

    // Додаємо ціну до загальної суми
    total += item.price * item.quantity;
  });

  // Виводимо загальну суму
  cartTotalSpan.textContent = `${total} грн`;

  // Активуємо кнопку "Оформити замовлення", якщо кошик не порожній
  checkoutBtn.disabled = cartItems.length === 0;
}

// Функція для видалення товару з кошика
function removeFromCart(name) {
  cartItems = cartItems.filter(item => item.name !== name);
  updateCart();
}

// Додавання товарів до кошика при кліку на кнопку "Додати до кошика"
document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', function () {
    const card = button.closest('.product-card');
    const product = {
      name: card.querySelector('h3').innerText,
      price: parseInt(card.querySelector('p strong').innerText),
    };

    // Додаємо товар до кошика
    addToCart(product);

    // Показуємо повідомлення
    alert(`${product.name} додано до кошика!`);
  });
});

// Завантаження збережених даних кошика з localStorage
window.onload = function () {
  if (localStorage.getItem('cartItems')) {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    updateCart();
  }
};

// Збереження даних кошика у localStorage
window.onbeforeunload = function () {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
// Додавання товарів до кошика
document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', function () {
    const card = button.closest('.product-card');
    const product = {
      name: card.querySelector('h3').innerText, // Назва товару
      price: parseInt(card.querySelector('p strong').innerText), // Ціна товару
    };

    // Додаємо товар до кошика
    addToCart(product);

    // Показуємо повідомлення
    alert(`${product.name} додано до кошика!`);
  });
});

// Масив для зберігання товарів у кошику
let cartItems = [];

// Функція для додавання товару до кошика
function addToCart(product) {
  const existingItem = cartItems.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity++; // Збільшуємо кількість, якщо товар вже є
  } else {
    cartItems.push({ ...product, quantity: 1 }); // Додаємо новий товар
  }

  // Оновлюємо вміст кошика
  updateCart();
}

// Функція для оновлення вмісту кошика
function updateCart() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Зберігаємо кошик у localStorage
}
document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', function () {
    const card = button.closest('.product-card');
    const product = {
      name: card.querySelector('h3').innerText,
      price: parseInt(card.querySelector('p strong').innerText),
    };

    addToCart(product);
    alert(`${product.name} додано до кошика!`);
  });
});
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
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
