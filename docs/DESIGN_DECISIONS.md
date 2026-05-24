# Design Decisions

## Why two separate apps?
Artisans and homeowners have fundamentally different mental models and use patterns. One app trying to serve both creates cognitive overhead. Separate apps also allow independent App Store optimization and feature velocity.

## Why cash-first?
- Reduces friction to zero for artisan onboarding
- Tunisian digital payment penetration is low
- Trust in online payments is low (fear of fraud)
- Artisans are accustomed to cash; changing this is a V2+ problem

## Why WhatsApp bridge?
WhatsApp is the de-facto communication layer in Tunisia. Fighting this would kill adoption. The app facilitates the match; WhatsApp handles the relationship.

## Why no map/GPS tracking?
Scope constraint for V1. Adds complexity, privacy concerns, and requires consistent GPS usage from artisans. Zone-based filtering is good enough for V1.

## Architecture: Monorepo
Single repo with `apps/client`, `apps/artisan`, `packages/shared` allows:
- Shared types, constants, mock data
- Consistent design tokens
- Single CI/CD pipeline

## Language strategy
- UI labels: French (dominant language for service/professional contexts in Tunisia)
- Arabic labels: Tunisian dialect where relevant (category names)
- No English in production UI
