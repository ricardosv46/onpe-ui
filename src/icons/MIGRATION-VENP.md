# Migración de íconos desde VENP (2026-08-04, completada 2026-08-05)

Checklist para ir depurando `VENP/frontend/src/shared/icons`: cada fila es un ícono copiado desde VENP a esta librería. `src/shared/icons` en VENP ya fue eliminado por completo — todos los consumos migraron a `@votodigital-onpeui/react/icons`.

## Actions

| Nombre nuevo (ONPE UI) | Origen en VENP | Borrado en VENP |
| --- | --- | --- |
| `IconAdd` | `src/shared/icons/AddIcon.tsx` | [x] |
| `IconAttach` | `src/shared/icons/AttachIcon.tsx` | [x] |
| `IconDelete` | `src/shared/icons/DeleteIcon.tsx` | [x] |
| `IconEdit` | `src/shared/icons/EditIcon2.tsx` y `src/shared/icons/EditIcon.tsx` (dos diseños distintos, se unificaron en uno solo por decisión del usuario) | [x] |
| `IconEraser` | `src/shared/icons/EraserIcon.tsx` | [x] |
| `IconHash` | `src/shared/icons/HashIcon.tsx` | [x] |
| `IconPassword` | `src/shared/icons/PasswordIcon.tsx` | [x] |
| `IconResend` | `src/shared/icons/ReenvioIcon.tsx` | [x] |
| `IconReload` | `src/shared/icons/ReloadIcon.tsx` | [x] |
| `IconRemove` | `src/shared/icons/RemoveIcon.tsx` | [x] |
| `IconUpload` | `src/shared/icons/UploadIcon.tsx` | [x] |
| `IconCloseRadius` | `src/shared/icons/CloseIcon.tsx` (SVG idéntico al ya existente `IconCloseRadius`, no era el ícono simple `IconClose`) | [x] |

## Status

| Nombre nuevo (ONPE UI) | Origen en VENP | Borrado en VENP |
| --- | --- | --- |
| `IconCheckFilled` | `src/shared/icons/BulletCheckIcon.tsx` | [x] |
| `IconCheckList` | `src/shared/icons/CheckListIcon.tsx` | [x] |
| `IconLoadingSpin` | `src/shared/icons/LoadingSpin.tsx` | [x] |
| `IconCheck` | `src/shared/icons/ConfirmIcon.tsx` (SVG idéntico al ya existente `IconCheck`) y `src/shared/icons/CheckGreenIcon.tsx` (diseño distinto — círculo relleno; reutilizado por decisión del usuario en vez de crear un ícono nuevo) | [x] |
| `IconInfo` | `src/shared/icons/InfoIcon.tsx` (diseño similar, redibujado; reutilizado por decisión del usuario) | [x] |
| `IconWarningStrong` | `src/shared/icons/WarningIcon.tsx` (diseño distinto; reutilizado por decisión del usuario en vez de crear un ícono nuevo) | [x] |

## Navigation

| Nombre nuevo (ONPE UI) | Origen en VENP | Borrado en VENP |
| --- | --- | --- |
| `IconArrowDownBadge` | `src/shared/icons/ArrowDownIcon.tsx` (SVG idéntico) y `src/shared/icons/ArrowDownIconSmall.tsx` (diseño mini distinto, sin equivalente; reutilizado por decisión del usuario) | [x] |
| `IconArrowLeft` | `src/shared/icons/ArrowLeftIcon.tsx` | [x] |
| `IconArrowLeftPaginator` (fusionado, no se creó archivo nuevo) | `src/shared/icons/ArrowLeftPaginatorIcon.tsx` (era duplicado de `IconArrowLeftPaginator`, ya existente en Actions/IconPaginatorArrows.tsx — ese archivo se movió a Navigation) | [x] |
| `IconArrowLR` | `src/shared/icons/ArrowLRIcon.tsx` | [x] |
| `IconArrowRight` | `src/shared/icons/ArrowRightIcon.tsx` | [x] |
| `IconArrowRightPaginator` (fusionado, no se creó archivo nuevo) | `src/shared/icons/ArrowRightPaginatorIcon.tsx` (era duplicado de `IconArrowRightPaginator`, ya existente en Actions/IconPaginatorArrows.tsx — ese archivo se movió a Navigation) | [x] |

## Search

| Nombre nuevo (ONPE UI) | Origen en VENP | Borrado en VENP |
| --- | --- | --- |
| `IconSearchBadge` | `src/shared/icons/LupaIcon.tsx` | [x] |
| `IconCloseRadius` (fusionado, no se creó archivo nuevo) | `src/shared/icons/CleanSearchIcon.tsx` (era duplicado de `IconCloseRadius` en Actions) | [x] |
| `IconSearch` | `src/shared/icons/SearchIcon.tsx` | [x] |

## Contact

| Nombre nuevo (ONPE UI) | Origen en VENP | Borrado en VENP |
| --- | --- | --- |
| `IconMail` | `src/shared/icons/MailIcon.tsx` | [x] |
| `IconPhoneOutline` | `src/shared/icons/PhoneIcon.tsx` | [x] |
| `IconUbicacion` | `src/shared/icons/UbicacionIcon.tsx` | [x] |

## Users

| Nombre nuevo (ONPE UI) | Origen en VENP | Borrado en VENP |
| --- | --- | --- |
| `IconInitials` | `src/shared/icons/InitialsIcon.tsx` | [x] |
| `IconUserAdd` | `src/shared/icons/UserAddIcon.tsx` | [x] |
| `IconUserCheck` | `src/shared/icons/UserCheckIcon.tsx` | [x] |
| `IconUser` | `src/shared/icons/UserIcon.tsx` | [x] |
| `IconUserHeader` | `src/shared/icons/UserIconHeader.tsx` | [x] |
| `IconUserInfo` | `src/shared/icons/UserInfoIcon.tsx` | [x] |
| `IconUserProfileBlue` | `src/shared/icons/UserProfileBlueIcon.tsx` | [x] |
| `IconUserProfileNew` | `src/shared/icons/UserProfileNew.tsx` | [x] |
| `IconUserProfileNewGray` | `src/shared/icons/UserProfileNew2.tsx` | [x] |

## Documents

| Nombre nuevo (ONPE UI) | Origen en VENP | Borrado en VENP |
| --- | --- | --- |
| `IconDomainReport` | `src/shared/icons/DomainReportIcon.tsx` | [x] |
| `IconDownload` | `src/shared/icons/DownloadIconPadron.tsx` | [x] |
| `IconExcel` | `src/shared/icons/ExcelIcon.tsx` | [x] |
| `IconPdf` | `src/shared/icons/PdfIcon.tsx` | [x] |
| `IconReport` | `src/shared/icons/ReportesIcon.tsx` | [x] |

## Election

| Nombre nuevo (ONPE UI) | Origen en VENP | Borrado en VENP |
| --- | --- | --- |
| `IconCandidateNacional1` | `src/shared/icons/CandidateNacional1Icon.tsx` | [x] |
| `IconCandidateNacional2` | `src/shared/icons/CandidateNacional2Icon.tsx` | [x] |
| `IconCandidateNacional3` | `src/shared/icons/CandidateNacional3Icon.tsx` | [x] |
| `IconCedulaElectoral` | `src/shared/icons/CedulaElectoralIcon.tsx` | [x] |
| `IconCredenciales` | `src/shared/icons/CredencialesIcon.tsx` | [x] |
| `IconDocumentList` | `src/shared/icons/InfoProcesoElectoralIcon.tsx` y `src/shared/icons/PadronElectoralIcon.tsx` (mismo diseño, se unificaron en uno solo) | [x] |
| `IconLogoCedula` | `src/shared/icons/LogoCedulaIcon.tsx` | [x] |
| `IconParams` | `src/shared/icons/ParamsIcon.tsx` (SVG idéntico) y `src/shared/icons/ConfigParamsIcon.tsx` (diseño de engranaje, distinto; reutilizado por decisión del usuario) | [x] |

## Browsers

| Nombre nuevo (ONPE UI) | Origen en VENP | Borrado en VENP |
| --- | --- | --- |
| `IconChrome` | `src/shared/icons/ChromeIcon.tsx` (SVG idéntico a la variante plana, no la `*Color`) | [x] |
| `IconMozilla` | `src/shared/icons/FirefoxIcon.tsx` (SVG idéntico a la variante plana, no la `*Color`) | [x] |

## ONPE

| Nombre nuevo (ONPE UI) | Origen en VENP | Borrado en VENP |
| --- | --- | --- |
| `IconOnpe` | `src/shared/icons/OnpeIcon.tsx` | [x] |
| `IconVenp` | `src/shared/icons/VenpIcon.tsx` | [x] |
