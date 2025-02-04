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
