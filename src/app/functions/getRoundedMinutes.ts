export const getRoundedMinutes = (date: Date): string => {
  const minutes = date.getMinutes()
  const rounded = Math.round(minutes / 15) * 15
  return (rounded == 60 ? '00' : rounded).toString().padStart(2, '0')
}
