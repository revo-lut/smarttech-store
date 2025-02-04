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
