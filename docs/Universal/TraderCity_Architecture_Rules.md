# TraderCity Architecture Rules

## IMPORTANT

TraderCity already has an established backend architecture.

Do NOT invent a new backend architecture.

Assume the following already exists:

### Backend
- NestJS Modular Monolith
- Domain Driven Design (DDD)
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ

### Authentication
- JWT Access Token
- Refresh Token Rotation
- RBAC

### Community
- Discord Integration Service

### Payments
- Stripe
- Crypto (USDT)

### User Roles
- Guest
- Free Member
- VIP Member
- Analyst
- Admin

## Frontend Requirements

Frontend code must be designed to integrate with this architecture.

Do not create mock architectures, fake databases, or local-storage based solutions.

Generate files that are compatible with this architecture.

Assume backend modules already exist.

Do not invent alternative architectures.

Do not create local state solutions for backend-driven data.

Design all APIs and hooks around future NestJS service integration.
