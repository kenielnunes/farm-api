
export function removeSpecialCharacters(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // Remove caracteres especiais, mantendo apenas letras, números e espaços
  return text.replace(/[^a-zA-Z0-9\s]/g, '');
}
