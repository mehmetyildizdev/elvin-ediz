# Newsroom Worker

Runs daily at 06:15 UTC, fetches a small Google News RSS feed, and overwrites `NEWS_CACHE`. The Studio reads `/news`; clicking **Make a post** sends the selected title to the configured AI provider and writes a Sanity **draft**.

Configure these as Worker secrets, never as `vars`: `SANITY_WRITE_TOKEN`, `AI_API_KEY`, and optionally `AI_API_URL`, `AI_MODEL`, and `APPOINTMENT_WEBHOOK_URL`.

The Sanity token needs Editor write permission for the production dataset. Set `ALLOWED_ORIGINS` to the deployed Studio and website URLs. Protect `/news` and `/make-post` with a Cloudflare Access application; leave `/appointment` public so visitors can submit the consultation form.
