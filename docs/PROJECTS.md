# Project page content

Project entries are managed in **Admin → Projects**. Each entry supports its location, year, short description, why it matters, photos, people involved, outcomes, and story behind the work. Fields without verified content are left out of the public page. Existing projects are seeded by [`project-cms-migration.sql`](../supabase/project-cms-migration.sql).

## Link a published story to a project

In **Admin → Stories**, edit the published story and add this tag:

```text
project:<project-id>
```

For example, a story about Hospital Reading Corners can use `project:hospital-reading-corners`. After the story is published, it appears under **Related stories** on that project page. Use the project’s URL slug shown in Admin.

Project slugs are kept stable after creation because published stories may reference them. The first photo is the project card image; use **Make first** in Admin to change it.
