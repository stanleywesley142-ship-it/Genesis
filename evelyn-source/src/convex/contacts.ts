/**
 * convex/contacts.ts — contacts backend.
 */
export interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}
const CONTACTS: Contact[] = [];
export function addContact(c: Omit<Contact, "id">): Contact {
  const contact: Contact = { id: `c_${CONTACTS.length + 1}`, ...c };
  CONTACTS.push(contact);
  return contact;
}
export function listContacts(): Contact[] { return CONTACTS; }
export function searchContacts(q: string): Contact[] {
  const s = q.toLowerCase();
  return CONTACTS.filter((c) => c.name.toLowerCase().includes(s));
}
