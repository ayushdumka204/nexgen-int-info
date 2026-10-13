# In-page translation

The custom language menu now initializes the existing Google Translate widget
and dispatches a bubbling `change` event on its `.goog-te-combo` select.
There are no external translation links, popup fallbacks, cookie-driven
reloads, URL changes, or homepage redirects. The former
`VITE_GOOGLE_TRANSLATE_WIDGET_ENABLED` redirect gate has been removed.

The script is shared through a single promise. Widget initialization is shared
per host element, including React StrictMode's effect cleanup/replay.
Choices remain disabled while loading; unavailable languages are disabled once
Google publishes its real options. Loading failures display an in-page error
without navigating away.
If the main content remains unchanged after a translation request, the menu
reports that Google has not returned translated content instead of claiming
success. Cross-origin Google request errors are not available to React directly.

English restoration uses Google's English select option, followed by its native
"Show original" control when available. Older widgets that omit the English
option use that original-language control directly. This restores Google's
original DOM rather than re-translating translated text to English.
Google's widget, attribution, and original-language controls are retained.

## Deployment limitations

Google's widget eligibility and service access still apply. Its documentation
limits Website Translator signup to eligible academic, government, nonprofit,
and non-commercial websites:
https://support.google.com/translate/answer/2534559?hl=en&co=GENIE.Platform%3DDesktop

The live widget initialized during testing, but its
`translate-pa.googleapis.com/v1/translateHtml` request failed in this environment.
A reachable widget script is not proof of a working or authorized translation
service. Successful real Hindi/Thai text translation cannot be claimed here.

If Google does not permit or serve this commercial deployment, the owner must
provision a licensed in-page translation provider or a server-side Google Cloud
Translation API integration. No provider credentials or translation backend
are present in the repository. The client deliberately does not invent a
translation endpoint, expose API keys, or redirect as a substitute.

## Routing

This repository implements one homepage with anchor sections, not additional
page routes. Translation does not change its pathname, query parameters,
fragment, scroll position, or React component state.
