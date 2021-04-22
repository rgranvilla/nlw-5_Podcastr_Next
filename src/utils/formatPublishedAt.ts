import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formatPublishedAt(publishedAt: string) {
  const date = format(parseISO(publishedAt), "d MMM yy", {
    locale: ptBR,
  })

  const [day, month, year] = date.split(' ');
  const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1)

  return `${day.length === 1 ? `0${day}` : `${day}`
    } ${monthCapitalized} ${year}`;
}