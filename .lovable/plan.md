
# Plan de recréation du site KaunStudios en React

## Objectif
Recréer fidèlement le site www.kaunstudios.com actuellement sur Framer, en code React/Tailwind propre et facilement modifiable.

---

## Page d'accueil (Homepage)

### 1. Navbar
- Logo KAUN Studios à gauche
- Liens de navigation : Homepage, Nos packs, Demande de devis
- Bouton CTA "Réserver ma session" (lien externe vers booking.kaunstudios.com)

### 2. Section Hero
- Image de fond plein écran (studio podcast)
- Texte accroche : "+100 billion planets but you deserve your own"
- Titre principal : "All the content you need, all in one place."
- Sous-titre : "Podcasts, Reels booster, short films, photography and more.."
- Icônes planètes décoratives

### 3. Bandeau défilant de services
- Marquee/ticker horizontal animé avec les catégories : Podcast, Talks, Production, Interviews (avec icônes)

### 4. Section "Personnalise your pack"
- Widget de réservation embarqué (iframe du système de booking existant) affichant les 4 packs :
  - **Customize** – 100 DT/h
  - **Nova** – 140 DT/h  
  - **Cosmic** – 390 DT/h
  - **Interstellar** – 900 DT/h
- Chaque pack avec sa liste de services inclus

### 5. Section "Studios podcasts clé en main"
- Titre + description
- Carrousel d'images des studios (défilement automatique)
- Bouton "Réserver ma session"

### 6. Section "Our Podcast Offers" – Cartes détaillées des 3 packs
- **Nova** (140 DT/h) – Carte avec liste des services (Audio, Micro, Éclairage PRO, etc.)
- **Cosmic** (390 DT/h) – Carte avec liste des services (Vidéo+Audio, 2 caméras, etc.)
- **Interstellar** (900 DT/h) – Carte avec liste complète (montage, révisions, brief, etc.)
- Chaque carte avec bouton "Réserver ma session"

### 7. Section Options supplémentaires
- Liste des options à la carte avec prix (Caméra supplémentaire 100 DT, Micro 50 DT, Shorts 100 DT, etc.)

### 8. Section "Create more, consume less"
- Texte de présentation de Kaun Studios
- Image du studio
- 3 blocs de services : Podcast 🎙, Services supplémentaires 📷, Production 🎬

### 9. Section FAQ
- Accordéon avec les questions fréquentes (accompagnement, week-end, matériel supplémentaire, déplacement, dépassement horaire)
- Image décorative

### 10. Section Newsletter
- Titre "Subscribe for Kaun insights"
- Champ email + bouton d'inscription

### 11. Footer
- Logo + description de KAUN Studios
- Liens de navigation (Homepage, Nos packs, Demande de devis)
- Liens sociaux (Instagram, Facebook)
- Bouton "Réserver ma session"

---

## Design & Style
- **Thème sombre** (fond noir/très foncé) avec accents orange
- **Typographies** : PP Neue Machina (titres) + DM Sans/Inter (corps de texte)
- **Animations** : marquee défilant, transitions smooth au scroll
- Responsive (mobile + desktop)
- Toutes les images actuelles du site seront référencées depuis les URLs Framer existantes

---

## Pages supplémentaires
- Page **Nos Packs** (détails des offres)
- Page **Demande de devis** (formulaire de contact)

## Notes techniques
- Pas de backend nécessaire (site vitrine statique)
- Les liens de réservation pointent vers le système externe existant (booking.kaunstudios.com)
- Code organisé en composants réutilisables pour faciliter les modifications futures
