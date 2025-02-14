import {TGetDateFormatted} from "./types"

const getDateFormatted: TGetDateFormatted = (time) => {
  if (!time) return ""
  const date = new Date(time)
  if (!date) return ""
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const formattedMonth = month < 10 ? `0${month}` : month
  const formattedDay = day < 10 ? `0${day}` : day

  return `${year}-${formattedMonth}-${formattedDay}`
}

export default getDateFormatted