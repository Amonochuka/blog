# Project page content

Project entries are currently maintained in [`src/content/projects.ts`](../src/content/projects.ts). Each entry can include its location, year, short description, why it matters, photos, people involved, outcomes, and a story behind the work. Fields without verified content are left out of the page.

## Link a published story to a project

In **Admin → Stories**, edit the published story and add this tag:

```text
project:<project-id>
```

For example, a story about Hospital Reading Corners can use `project:hospital-reading-corners`. After the story is published, it appears under **Related stories** on that project page. Project IDs are the `id` values in `src/content/projects.ts`.

Adding or changing project entries and their photos currently requires editing the project content file. There is not yet a project editor in Admin.
