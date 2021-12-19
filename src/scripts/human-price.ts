export default function humanPrice(price: string): string {
  const numPrice = +price;
  return numPrice.toLocaleString('ru-RU');
}
