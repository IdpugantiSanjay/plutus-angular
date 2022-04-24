export function stringify<T extends Record<string, any>>(obj: T): { [K in keyof T]: string } {
  const temp = {} as { [K in keyof T]: string | object }
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      temp[key as keyof T] = stringify(obj[key])
    } else {
      temp[key as keyof T] = value.toString()
    }
  }
  return temp as { [K in keyof T]: string }
}
