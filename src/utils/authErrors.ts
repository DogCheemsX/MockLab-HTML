/**
 * Helper utility to map Firebase Authentication error codes to user-friendly messages.
 */
export const formatAuthError = (error: any): string => {
  if (!error) return '';
  const code = error.code || '';
  const message = typeof error === 'string' ? error : (error.message || '');
  
  if (
    code === 'auth/invalid-login-credentials' ||
    code === 'auth/invalid-credential' ||
    code === 'auth/wrong-password' ||
    message.includes('auth/invalid-login-credentials') ||
    message.includes('auth/invalid-credential') ||
    message.includes('auth/wrong-password')
  ) {
    return 'Invalid email or password. Please check your credentials and try again.';
  }

  if (
    code === 'auth/user-not-found' ||
    message.includes('auth/user-not-found')
  ) {
    return 'No registered account found with this email address. Please check your email or create a new account.';
  }

  if (
    code === 'auth/invalid-email' ||
    message.includes('auth/invalid-email')
  ) {
    return 'Please enter a valid email address.';
  }

  if (
    code === 'auth/email-already-in-use' ||
    message.includes('auth/email-already-in-use')
  ) {
    return 'An account with this email address already exists. Try logging in.';
  }

  if (
    code === 'auth/weak-password' ||
    message.includes('auth/weak-password')
  ) {
    return 'Password should be at least 6 characters long.';
  }

  if (
    code === 'auth/too-many-requests' ||
    message.includes('auth/too-many-requests')
  ) {
    return 'Access temporarily restricted due to multiple failed login attempts. Please reset your password or try again later.';
  }

  if (
    code === 'auth/network-request-failed' ||
    message.includes('auth/network-request-failed')
  ) {
    return 'Network error. Please check your internet connection and try again.';
  }

  if (
    code === 'auth/missing-password' ||
    message.includes('auth/missing-password')
  ) {
    return 'Please enter your password.';
  }

  if (
    code === 'auth/missing-email' ||
    message.includes('auth/missing-email')
  ) {
    return 'Please enter your email address.';
  }

  if (message) {
    const cleanMsg = message.replace(/^Firebase:\s*Error\s*\(auth\/[^)]+\)[:.]?\s*/i, '').trim();
    return cleanMsg || 'An error occurred during authentication. Please try again.';
  }

  return 'An error occurred during authentication. Please try again.';
};

