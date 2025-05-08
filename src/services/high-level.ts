/**
 * Represents a lead in HighLevel.
 */
export interface Lead {
  /**
   * The ID of the lead.
   */
  id: string;
  /**
   * The name of the lead.
   */
  name: string;
  /**
   * The email of the lead.
   */
  email: string;
}

/**
 * Asynchronously retrieves lead information from HighLevel.
 *
 * @returns A promise that resolves to a Lead object containing ID, name, and email.
 */
export async function getLead(): Promise<Lead> {
  // TODO: Implement this by calling an API.

  return {
    id: 'abc',
    name: 'Example Lead',
    email: 'lead@example.com',
  };
}
