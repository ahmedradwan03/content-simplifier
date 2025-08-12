import { createContentsTable } from './content.migration';
import { createUsersTable } from './users.migration';

export const runMigrations = async () => {
    await createUsersTable();
    await createContentsTable();
};
