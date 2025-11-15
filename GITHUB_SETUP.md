# GitHub Repository Setup

## Anleitung zum Erstellen und Pushen des Repositories

### Option 1: Via GitHub Web Interface (Empfohlen)

1. **Gehe zu GitHub**: https://github.com/new
2. **Repository erstellen**:
   - Repository name: `virtual-office-showcase`
   - Description: `Ein virtuelles Büro mit 5 spezialisierten AI-Agents - Multi-Agent System Showcase`
   - Visibility: **Public**
   - **NICHT** "Initialize this repository with a README" ankreuzen
3. **Klicke auf "Create repository"**

4. **Pushe den Code**:
```bash
cd /home/ubuntu/virtual-office-showcase
git remote add origin https://github.com/MyLastTryCollegeVSRazor/virtual-office-showcase.git
git branch -M main
git push -u origin main
```

### Option 2: Via GitHub CLI (Wenn authentifiziert)

```bash
cd /home/ubuntu/virtual-office-showcase

# GitHub CLI authentifizieren
gh auth login

# Repository erstellen und pushen
gh repo create virtual-office-showcase \
  --public \
  --source=. \
  --description="Ein virtuelles Büro mit 5 spezialisierten AI-Agents - Multi-Agent System Showcase" \
  --push
```

## Was bereits vorbereitet ist

✅ **README.md** - Vollständige Dokumentation mit:
- Projekt-Übersicht
- Features
- Tech Stack
- Installation
- Verwendung
- Beitragsrichtlinien

✅ **Git Repository** - Bereits initialisiert mit:
- Initial Commit
- Alle Projektdateien
- .gitignore (automatisch von Vite)

✅ **Website-Links** - GitHub-Links sind bereits auf der Website:
- Hero-Bereich: "GitHub Repo" Button
- CTA-Bereich: "Code ansehen" + "GitHub-Repo" Buttons
- Demo-Seite: "Vollständigen Code auf GitHub ansehen" Button

## Nach dem Push

Die Website-Links funktionieren sofort, da sie bereits auf den korrekten Repository-Pfad zeigen:
```
https://github.com/MyLastTryCollegeVSRazor/virtual-office-showcase
```

## Nächste Schritte (Optional)

1. **GitHub Pages aktivieren** (für zusätzliche Hosting-Option)
2. **GitHub Actions** für CI/CD einrichten
3. **Issues & Discussions** aktivieren
4. **Repository Topics** hinzufügen: `ai`, `multi-agent-systems`, `crewai`, `react`, `typescript`
5. **Social Preview Image** hochladen (Screenshot der Website)

## Troubleshooting

### "Permission denied" beim Push
→ Stelle sicher, dass du Zugriff auf das Repository hast
→ Verwende Personal Access Token statt Passwort

### Repository existiert bereits
→ Lösche das alte Repository oder verwende einen anderen Namen
→ Oder pushe zu einem bestehenden Repository:
```bash
git remote set-url origin https://github.com/MyLastTryCollegeVSRazor/virtual-office-showcase.git
git push -u origin main
```

