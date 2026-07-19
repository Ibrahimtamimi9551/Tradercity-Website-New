export function formatUsd(amount: number, compact = false) {
  if (compact && Math.abs(amount) >= 1000) {
    return `$${(amount / 1000).toFixed(amount >= 10000 ? 0 : 1)}k`;
  }
  return `$${amount.toLocaleString(undefined, {
    maximumFractionDigits: amount % 1 === 0 ? 0 : 1,
  })}`;
}

export function formatPercent(value: number) {
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}%`;
}

export function formatCount(value: number) {
  return value.toLocaleString();
}
