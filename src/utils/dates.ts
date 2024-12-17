export const parseTime = (time: string) => {
  const [hours, minutes, seconds] = time.split(':').map(Number)
  const date = new Date()

  date.setHours(hours, minutes, seconds)
  return date
}

export const formatAtendimentoTime = (date: Date) => {
  return date.toTimeString().slice(0, 5) // HH:mm
}
