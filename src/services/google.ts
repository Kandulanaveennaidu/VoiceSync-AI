/**
 * Represents a google user.
 */
export interface GoogleUser {
  /**
   * The ID of the user.
   */
  id: string;
  /**
   * The name of the user.
   */
  name: string;
  /**
   * The user's email.
   */
  email: string;
}

/**
 * Asynchronously retrieves user information from Google.
 *
 * @returns A promise that resolves to a GoogleUser object containing ID, name, and email.
 */
export async function getGoogleUser(): Promise<GoogleUser> {
  // TODO: Implement this by calling an API.

  return {
    id: '456',
    name: 'Example User',
    email: 'test@example.com',
  };
}
