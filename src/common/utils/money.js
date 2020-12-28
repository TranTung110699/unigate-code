export const displayPrice = (price) => `${price},000đ`;

/**
 *
 * @param {number} price
 */
export const displayVNMoney = (price = 0, showFree = false) =>
  showFree && price === 0
    ? 'Miễn phí'
    : new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
