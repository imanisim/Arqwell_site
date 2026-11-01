// ARQWELL public client configuration. Safe to commit ONLY the URL and publishable key.
// The database and registration pages work in preview-only mode until these are set.
// NEVER store your Supabase service-role/secret key or Resend/Stripe secret here.
window.ARQWELL_CONFIG = {
  supabaseUrl: '', // e.g. https://example.supabase.co
  supabasePublishableKey: '', // e.g. sb_publishable_...
  previewLibraryWhenUnconfigured: true,
};
