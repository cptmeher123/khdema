# خدمة Khdema

> Artisan & Home Service Booking App — Tunisia 🇹🇳

Connect homeowners with trusted local artisans (plumbers, electricians, painters) across Tunisia. No payment gateway, no friction — cash-first, WhatsApp-native, Arabic-first.

## Why Khdema?

Tunisia has millions of skilled artisans operating informally — found only through word-of-mouth and handwritten stickers on walls. Khdema makes that invisible network searchable, trustworthy, and bookable.

## Monorepo Structure

```
khdema/
├── apps/
│   ├── client/          # Homeowner app (React Native)
│   └── artisan/         # Artisan app (React Native)
├── packages/
│   └── shared/          # Shared components, types, constants
└── docs/                # Design decisions, wireframes, specs
```

## Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Node.js + PostgreSQL *(coming soon)*
- **Notifications:** Firebase Cloud Messaging
- **Maps:** OpenStreetMap / Mapbox
- **Comms:** WhatsApp Business API

## MVP Scope (v1)

- 3 service categories: Plombier, Électricien, Peintre
- Tunis only
- Cash payment on completion
- WhatsApp contact bridge
- Artisan availability toggle
- Rating & review system

## Design Principles

| Principle | Rationale |
|-----------|-----------|
| Cash-first | No payment gateway needed at launch |
| WhatsApp bridge | Don't replace existing behaviour |
| Icon-heavy UI | Low text-literacy artisan users |
| Arabic + French | Tunisian dialect labels, French for pro terms |
| Trust signals | Verified badge, ratings, years of experience |

## Status

🚧 **In development** — wireframes complete, prototype in progress.

---

*Built with ❤️ for Tunisia*
