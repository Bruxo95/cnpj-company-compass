
/**
 * Cleans up all Supabase auth-related keys from localStorage and sessionStorage
 * This prevents "limbo" auth states and ensures clean logins
 */
export const cleanupAuthState = (): void => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  if (typeof sessionStorage !== 'undefined') {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  }
};

/**
 * Formats a CNPJ string to the standard format (XX.XXX.XXX/XXXX-XX)
 */
export const formatCNPJ = (cnpj: string): string => {
  // Remove any non-digit characters
  const digits = cnpj.replace(/\D/g, '');
  
  // Check if it has the proper length
  if (digits.length !== 14) return cnpj;
  
  // Format to XX.XXX.XXX/XXXX-XX
  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};
