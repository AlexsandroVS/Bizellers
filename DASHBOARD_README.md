# Dashboard de Leads - Bizellers

Dashboard interactivo con sistema drag & drop para gestionar leads de la landing page.

## 🚀 Características

- **Autenticación segura** - Login protegido para acceder al dashboard
- **4 Columnas Kanban** - Nuevo Lead, Contactado, En Negociación, Cerrado/Ganado
- **Drag & Drop** - Mueve leads entre columnas arrastrando
- **KPIs en tiempo real** - Métricas de conversión y tasa de contacto
- **Modal de detalles** - Ver información completa de cada lead
- **Acciones rápidas** - Enviar WhatsApp y Gmail directamente
- **Validación de teléfonos LATAM** - Soporte para +51, +52, +54, +55, etc.
- **Exportación de datos** - CSV y Excel
- **Notas internas** - Agrega comentarios sobre cada lead
- **Responsive** - Funciona en desktop y mobile

## 📋 Requisitos Previos

1. Node.js 18+
2. pnpm instalado
3. Base de datos PostgreSQL en Neon (o compatible)
4. Cuenta de Gmail para envío de emails

## 🔧 Instalación

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env` y configura tus variables:

```bash
cp .env.example .env
```

Edita el `.env` con tus datos:

```env
# Database (obtén esto de Neon)
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Email (configura una App Password de Gmail)
EMAIL_USER="tu-email@gmail.com"
EMAIL_PASS="tu-app-password-de-gmail"
VITE_CONTACT_EMAIL="contacto@bizellers.com"

# Dashboard (cambia esto por seguridad)
DASHBOARD_USERNAME="admin"
DASHBOARD_PASSWORD="tu-password-super-seguro"
```

### 3. Aplicar migración de base de datos

**IMPORTANTE**: Esta migración borrará la tabla `leads` existente y la recreará con los nuevos campos.

#### Opción A: Ejecutar SQL manualmente en Neon

1. Ve a tu proyecto en [Neon Console](https://console.neon.tech)
2. Abre el SQL Editor
3. Copia y pega el contenido de `prisma/migrations/20250130000000_add_dashboard_fields/migration.sql`
4. Ejecuta el script

#### Opción B: Usar Prisma (si tienes acceso directo a la BD)

```bash
pnpm prisma:migrate
```

### 4. Generar cliente de Prisma

```bash
pnpm prisma:generate
```

## 🎯 Uso

### Iniciar desarrollo

```bash
pnpm dev
```

### Acceder al dashboard

1. Ve a `http://localhost:5173/login`
2. Ingresa las credenciales del `.env`:
   - Usuario: el valor de `DASHBOARD_USERNAME`
   - Contraseña: el valor de `DASHBOARD_PASSWORD`
3. Serás redirigido a `/dashboard`

### Probar con leads de prueba

Llena el formulario de contacto en la landing (`/`) y los leads aparecerán automáticamente en la columna "Nuevo Lead" del dashboard.

## 📱 Validación de Teléfonos

El sistema valida teléfonos de los siguientes países LATAM:

- 🇵🇪 Perú: +51
- 🇲🇽 México: +52
- 🇦🇷 Argentina: +54
- 🇧🇷 Brasil: +55
- 🇨🇱 Chile: +56
- 🇨🇴 Colombia: +57
- 🇧🇴 Bolivia: +591
- 🇪🇨 Ecuador: +593
- Y más...

Ejemplo de formato válido: `+51 999 999 999`

## 📊 Estructura de Columnas

1. **Nuevo Lead** - Leads recién llegados del formulario
2. **Contactado** - Ya se hizo primer contacto
3. **En Negociación** - Propuesta enviada, en conversaciones
4. **Cerrado/Ganado** - Servicio concretado

## 🔐 Seguridad

- Las credenciales nunca se exponen en el frontend
- Los tokens se guardan en localStorage
- Las APIs verifican autenticación en cada request
- Los teléfonos se sanitizan antes de guardar

## 📤 Exportación de Datos

- **Excel (.xlsx)**: Formato recomendado, mantiene formato
- **CSV (.csv)**: Para importar en otros sistemas

Ambos incluyen todos los campos del lead.

## 🛠️ Scripts Disponibles

```bash
pnpm dev              # Iniciar desarrollo
pnpm build            # Build para producción
pnpm preview          # Preview del build
pnpm prisma:generate  # Generar cliente Prisma
pnpm prisma:studio    # Abrir Prisma Studio
```

## 🐛 Troubleshooting

### Error: "Prisma Client not generated"
```bash
pnpm prisma:generate
```

### Error: "Cannot find module '@prisma/client'"
```bash
pnpm install
pnpm prisma:generate
```

### Error al conectar a la BD
- Verifica que `DATABASE_URL` en `.env` sea correcta
- Asegúrate de que la BD en Neon esté activa
- Verifica que hayas aplicado la migración

### Los leads no se guardan
- Verifica las variables `EMAIL_USER` y `EMAIL_PASS`
- Revisa la consola del navegador y terminal para errores
- Asegúrate de que el formulario tenga teléfono con código de país

## 📞 Soporte

Si tienes dudas o problemas, contacta al equipo de desarrollo.
