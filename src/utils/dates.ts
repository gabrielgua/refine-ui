import { formatDate } from 'date-fns'

export const parseTime = (time: string) => {
  const [hours, minutes, seconds] = time.split(':').map(Number)
  const date = new Date()

  date.setHours(hours, minutes, seconds)
  return date
}

export const formatAtendimentoTime = (date: Date) => {
  return date.toTimeString().slice(0, 5) // HH:mm
}

export const parseLocaleDate = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo', // UTC-3
  }).format(date)

  const [day, month, year, time] = formattedDate.replace(/\s/g, '').split(/\/|,/)
  return `${year}-${month}-${day}T${time}`
}

export const formatDateDefault = (date: Date) => {
  return formatDate(date, 'dd/MM/yyyy HH:mm')
}
