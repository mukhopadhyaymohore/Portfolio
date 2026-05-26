def portfolio_globals(request):
    return {
        'SITE_NAME':    'Mohore Mukhopadhyay',
        'SITE_TAGLINE': 'ML · Quantum · Full-Stack',
        'GITHUB_URL': 'https://github.com/mukhopadhyaymohore',
        'LINKEDIN_URL': 'https://www.linkedin.com/in/mohore-mukhopadhyay-86a110350/',
        'LEETCODE_URL': 'https://leetcode.com/mohore_mukhopadhyay/',
        'EMAIL':        'mohore.mukhopadhyay@gmail.com',
        'LOCATION':     'Kolkata, West Bengal, India',
        'NAV_LINKS': [
            {'label': '_HOME',         'url_name': 'home'},
            {'label': '_EXPERIENCE',   'url_name': 'experience'},
            {'label': '_RESEARCH',     'url_name': 'research'},
            {'label': '_SKILLS',       'url_name': 'skills'},
            {'label': '_ACHIEVEMENTS', 'url_name': 'achievements'},
        ],
        'PROJECT_LINKS': [
            {'label': 'Full Stack',      'url_name': 'projects_fullstack'},
            {'label': 'ML / DL', 'url_name': 'projects_ml'},
            {'label': 'Quantum',         'url_name': 'projects_quantum'},
            {'label': 'Hardware · ESP32','url_name': 'projects_hardware'},
            {'label': 'Python Projects', 'url_name': 'projects_python'},
            {'label': 'Java Projects',  'url_name': 'projects_java'},
            {'label': 'Frontend Mini',   'url_name': 'projects_frontend'},
        ],
    }