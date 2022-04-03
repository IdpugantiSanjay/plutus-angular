export function* range(from: number, to: number, step = 1) {
  for (let i = from; i < to; i += step) {
    yield i
  }
}
