const CartItem = () => {
  return (
    <tr class="cart-item">
      <td></td>
      <td class="cart-image">
        <img src="img/products/product1/1.png" alt="" />
        <i class="bi bi-x delete-cart" data-id="1"></i>
      </td>
      <td>Analogue Resin Strap</td>
      <td>$108.00</td>
      <td class="product-quantity">1</td>
      <td class="product-subtotal">$108.00</td>
    </tr>
  );
};

export default CartItem;
