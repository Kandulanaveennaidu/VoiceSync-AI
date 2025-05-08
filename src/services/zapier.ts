/**
 * Represents an organization using Zapier.
 */
export interface Organization {
  /**
   * The ID of the organization.
   */
  id: string;
  /**
   * The name of the organization.
   */
  name: string;
}

/**
 * Asynchronously retrieves organization information from Zapier.
 *
 * @returns A promise that resolves to an Organization object containing ID and name.
 */
export async function getOrganization(): Promise<Organization> {
  // TODO: Implement this by calling an API.

  return {
    id: '123',
    name: 'Example Org',
  };
}
