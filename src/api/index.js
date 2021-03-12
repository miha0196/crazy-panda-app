import { db } from './mockDatabase';

export const fetchTableItems = () => new Promise(resolve => resolve(db.names));
