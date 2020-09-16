function deepClone<X>(value: X): X {
  return JSON.parse(JSON.stringify(value));
}

export default deepClone;