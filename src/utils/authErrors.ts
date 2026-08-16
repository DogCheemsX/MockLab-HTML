/**
 * Helper utility to map Firebase Authentication error codes to user-friendly messages.
 */
export const formatAuthError = (error: any): string => {
  if (!error) return '';
  const code = error.code || '';
  
  switch (code) {
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/user-not-found':
      return 'No registered student account found with this email address.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Try logging in.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/too-many-requests':
      return 'Access temporarily restricted due to multiple failed login attempts. Please reset your password or try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/missing-password':
      return 'Please enter your password.';
    case 'auth/missing-email':
      return 'Please enter your email address.';
    default:
      if (typeof error.message === 'string') {
        const cleanMsg = error.message.replace(/^Firebase:\s*Error\s*\(auth\/[^)]+\):\s*/i, '');
        return cleanMsg || 'An error occurred during authentication. Please try again.';
      }
      return 'An error occurred during authentication. Please try again.';
  }
};
