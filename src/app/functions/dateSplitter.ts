export function splitDateTime(dateTime: string | Date): [string, string] {
  return [new Date(dateTime).toDateString(), new Date(dateTime).toTimeString()]
}
