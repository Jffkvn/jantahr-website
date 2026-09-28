export function formatUgandanPhone(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return ''
  const digits = trimmed.replace(/\D/g, '')
  if (trimmed.startsWith('+256') && digits.length === 12) {
    return `+${digits}`
  }
  if (digits.startsWith('0') && digits.length === 10) {
    return `+256${digits.slice(1)}`
  }
  if (digits.startsWith('256') && digits.length === 12) {
    return `+${digits}`
  }
  if (digits.length === 9) {
    return `+256${digits}`
  }
  if (trimmed.startsWith('+')) {
    return `+${digits}`
  }
  return trimmed
}
