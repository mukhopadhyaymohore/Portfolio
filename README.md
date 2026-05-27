<div align="center">

<img src="static/images/logo.svg" width="72" alt="MM"/>

# portfolio

A personal portfolio built with Django — deployed on Render.
Cosmos × Cyberpunk visual theme powered by Three.js.

[![Live](https://img.shields.io/badge/live-portfolio--w4qw.onrender.com-00ffe7?style=flat-square&labelColor=000010)](https://portfolio-w4qw.onrender.com)
[![Python](https://img.shields.io/badge/python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Django](https://img.shields.io/badge/django-4.2-092E20?style=flat-square&logo=django&logoColor=white)](https://djangoproject.com)

</div>

---

## Tech Stack

| | |
|---|---|
| **Backend** | Django 4.2 · Python 3.11 · SQLite3 |
| **Frontend** | HTML5 · CSS3 · Vanilla JS · Three.js |
| **Deployment** | Render · Gunicorn · WhiteNoise |
| **Media CDN** | Cloudinary |

---

## Architecture

```
mm-portfolio/
├── mm_portfolio/        # Django project — settings, urls, wsgi
├── portfolio/           # App — views, models, urls, context processors
├── templates/           # Django templates
│   └── projects/        # Project sub-pages
├── static/
│   ├── css/             # Per-page stylesheets
│   ├── js/              # Three.js background, animations, music
│   └── images/          # Assets — photos, certs, badges
├── build.sh             # Render build script
└── requirements.txt
```

---

## Frontend System

- **Three.js** — star field, nebula particles, floating rings, mouse parallax
- **CSS custom properties** — `--cyber-cyan`, `--cyber-magenta`, `--cyber-violet`, `--star-gold` palette sitewide
- **Scanlines + vignette** — fixed overlay compositing
- **Scroll reveal** — `IntersectionObserver` fade-up on all sections
- **Glitch effect** — CSS clip-path animation on nav brand
- **Cursor trail** — 8-dot particle trail via `requestAnimationFrame`
- **Dual photo scan** — `clip-path` reveal synced to `Date.now() % 4000`
- **Music player** — Cloudinary-hosted audio, equaliser bars, mute toggle

---

## Pages
```
/                    Home
/experience/         Internships with viewable certificates
/projects/           Hub → Full Stack · ML+DL · Quantum · Hardware · Python · Java · Frontend
/research/           Conference papers with certificates
/skills/             App-icon skill grid
/achievements/       Credentials, open source, leadership
```

---

## Local Setup

```bash
git clone https://github.com/mukhopadhyaymohore/portfolio.git
cd portfolio

python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt

# .env
SECRET_KEY=your-secret-key
DEBUG=True

python manage.py migrate
python manage.py runserver
# → http://127.0.0.1:8000
```

---

## Deployment

```bash
# Render config
Build:   ./build.sh
Start:   gunicorn mm_portfolio.wsgi:application
Python:  3.11.0
```

```bash
# build.sh
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
```

Static files served via **WhiteNoise**.
Media (videos, audio) hosted on **Cloudinary**.
Auto-deploys on push to `main`.
