// Live Sunbury weather via Open-Meteo (free, no API key, client-side).
// Same pattern as the weather bands on D&D / JD's / Moose 2070. Used by the
// "Tonight at Branch" band for a current-conditions chip and a weather-aware
// pizza nudge. Fails soft: callers render nothing on null.

import { company } from '../data/site'

export type Weather = { temp: number; code: number; label: string }

// WMO weather codes → short human label.
function labelFor(code: number): string {
  if (code === 0) return 'Clear'
  if (code <= 2) return 'Partly cloudy'
  if (code === 3) return 'Cloudy'
  if (code <= 48) return 'Foggy'
  if (code <= 57) return 'Drizzle'
  if (code <= 67) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Showers'
  if (code <= 86) return 'Snow showers'
  return 'Storms'
}

export const isCozyWeather = (w: Weather) =>
  w.temp <= 40 || (w.code >= 51 && w.code <= 99) // cold, rain or snow = pizza night

export async function fetchSunburyWeather(): Promise<Weather | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${company.geo.lat}&longitude=${company.geo.lng}` +
      `&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York`
    const res = await fetch(url)
    if (!res.ok) return null
    const j = (await res.json()) as { current?: { temperature_2m?: number; weather_code?: number } }
    const temp = Math.round(j.current?.temperature_2m ?? NaN)
    const code = j.current?.weather_code ?? 0
    if (!Number.isFinite(temp)) return null
    return { temp, code, label: labelFor(code) }
  } catch {
    return null
  }
}
