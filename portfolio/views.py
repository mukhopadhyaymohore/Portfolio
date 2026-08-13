from django.shortcuts import render, redirect
from django.contrib import messages as django_messages
from django.conf import settings
from .models import ContactMessage


# ── Core pages ──────────────────────────────────────────────────────────────

def home(request):
    """
    Landing page. Also handles contact form success/error
    messages flashed via Django messages framework.
    """
    return render(request, 'home.html')

def experience(request):
    context = {
        'experiences': [
            {
                'role':     'Machine Learning Intern',
                'company':  'Skillfied Mentor',
                'period':   'April 2026 — May 2026',
                'type':     'ml',
                'color':    'cyan',
                'cert': {
                    'file':  'images/exp/skillfied.pdf',
                    'type':  'pdf',
                    'label': 'View Certificate',
                },
                'bullets': [
                    {
                        'text':   'Breast Cancer Prediction — End-to-end binary classification pipeline on the Wisconsin Breast Cancer Dataset using Logistic Regression, SVM, and GridSearchCV-tuned Random Forest with feature importance analysis across 30 cell nucleus measurements.',
                        'github': 'https://github.com/mukhopadhyaymohore/Breast-Cancer-Prediction',
                    },
                    {
                        'text':   'Glucose Level Prediction — High-recall glucose risk classifier on the Framingham dataset, resolving severe class imbalance (~1.4% positive) via SMOTE and decision threshold tuning; achieved 0.83 recall and 0.89 ROC-AUC.',
                        'github': 'https://github.com/mukhopadhyaymohore/Glucose-Level-Prediction',
                    },
                ],
            },
            {
                'role':     'Research Intern',
                'company':  'Dept. of CSE, IIT(ISM) Dhanbad',
                'period':   'December 2025 — January 2026',
                'type':     'research',
                'color':    'magenta',
                'cert': {
                    'file':  'images/exp/iitism.jpeg',
                    'type':  'image',
                    'label': 'View Certificate',
                },
                'bullets': [
                    {
                        'text':   'Developed a Quantum Anomaly Detection model for cybersecurity threat classification using quantum circuit design.',
                        'github': None,
                    },
                    {
                        'text':   'Benchmarked model on NSL-KDD and CICIDS2017 datasets to validate performance across diverse network attack vectors with 12 qubits on classical hardware.',
                        'github': None,
                    },
                ],
            },
            {
                'role':     'Java Developer Intern',
                'company':  'CodSoft',
                'period':   'September 2025 — October 2025',
                'type':     'dev',
                'color':    'violet',
                'cert': {
                    'file':  'images/exp/codsoft.pdf',
                    'type':  'pdf',
                    'label': 'View Certificate',
                },
                'bullets': [
                    {
                        'text':   'Number Guessing Game — Java application with random number generation, attempt tracking and live score counter.',
                        'github': 'https://github.com/mukhopadhyaymohore/CODSOFT-PROJECTS/blob/main/NumberGuessGame.java',
                    },
                    {
                        'text':   'ATM Interface — Java OOP implementation with core banking operations: deposit, withdrawal and balance check.',
                        'github': 'https://github.com/mukhopadhyaymohore/CODSOFT-PROJECTS/blob/main/ATMInterface.java',
                    },
                    {
                        'text':   'Student Management System — Java CRUD application with file handling and console-based menu interface.',
                        'github': 'https://github.com/mukhopadhyaymohore/CODSOFT-PROJECTS/blob/main/StudentManagementSystem.java',
                    },
                ],
            },
        ]
    }
    return render(request, 'experience.html', context)

def research(request):
    context = {
        'papers': [
            {
                'title':      'Quantum Machine Learning for Intrusion Detection: Circuit Design, Kernel Analysis, and Comparative Performance Assessment',
                'conference': 'IEEE ISVLSI 2026 — IEEE Computer Society Annual Symposium on VLSI',
                'date':       '2026',
                'location':   'ITC Sonar, Kolkata, West Bengal, India',
                'issued_by':  'IEEE Computer Society Annual Symposium on VLSI (ISVLSI) 2026 Organizing Committee',
                'tags':       ['Quantum Machine Learning', 'Intrusion Detection', 'Variational Quantum Circuits', 'Quantum Kernel Methods', 'Cybersecurity'],
                'color':      'violet',
                'cert_imgs':  ['images/research/conf4i.jpeg', 'images/research/conf4ii.jpeg'],
                'links': [
                    {
                        'label': 'LinkedIn Post',
                        'url':   'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_ieee-iitguwahati-research-ugcPost-7471146522819182592-meX_',
                        'type':  'linkedin',
                    },
                ],
            },
            {
                'title':      'Benchmarking Quantum Classifiers for Sonar-Based Mine Detection',
                'conference': '3rd IEEE Guwahati Subsection Conference (GCON 2026)',
                'date':       '2026',
                'location':   'Indian Institute of Technology Guwahati, Assam, India',
                'issued_by':  'IEEE Guwahati Subsection',
                'tags':       ['Quantum Classifiers', 'Sonar Data', 'Mine Detection', 'Quantum Machine Learning'],
                'color':      'gold',
                'cert_img':   'images/research/conf3.jpeg',
                'links': [
                    {
                        'label': 'LinkedIn Post',
                        'url':   'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_quantumcomputing-machinelearning-cybersecurity-ugcPost-7485719135209918464-nY1a',
                        'type':  'linkedin',
                    },
                ],
            },
            {
                'title':      'House Price Prediction in Boston: A Comparative Study of Classical and Quantum Machine Learning Approaches',
                'conference': 'ICDTBESDC\'25 — International Conference on Digital Technologies for Business Excellence and Sustainable Development and Creating Viksit Bharat@2047',
                'date':       '5th – 6th July 2025',
                'location':   'Indian Institute of Technology (ISM) Dhanbad, Jharkhand, India',
                'issued_by':  'Indian Institute of Technology (ISM) Dhanbad',
                'tags':       ['Quantum ML', 'Classical ML', 'Boston Dataset', 'Comparative Study', 'Qiskit'],
                'color':      'magenta',
                'cert_img':   'images/research/conf2.jpg',
                'links': [
                    {
                        'label': 'LinkedIn Post',
                        'url':   'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_machinelearning-quantumcomputing-linearregression-ugcPost-7347885124950097921-3Q-j',
                        'type':  'linkedin',
                    },
                ],
            },
            {
                'title':      'Quantum Computing and Molecular Stability: A New Frontier in Drug Discovery',
                'conference': 'NCRTST\'25 — National Conference on Recent Trends in Science and Technology',
                'date':       '29th – 30th March 2025',
                'location':   'Jalpaiguri Government Engineering College (JGEC), West Bengal, India',
                'issued_by':  'Jalpaiguri Government Engineering College (JGEC)',
                'tags':       ['Quantum Computing', 'Drug Discovery', 'Molecular Stability', 'VQE', 'PennyLane'],
                'color':      'cyan',
                'cert_img':   'images/research/conf1.jpg',
                'links': [
                    {
                        'label': 'LinkedIn Post',
                        'url':   'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_quantumcomputing-drugdiscovery-research-share-7326994989014560768-0Evb',
                        'type':  'linkedin',
                    },
                    {
                        'label': 'ResearchGate',
                        'url':   'https://www.researchgate.net/scientific-contributions/Mohore-Mukhopadhyay-2322485868',
                        'type':  'researchgate',
                    },
                ],
            },
        ]
    }
    return render(request, 'research.html', context)

def skills(request):
    return render(request, 'skills.html')

def achievements(request):
    context = {
        'academic': [
            {
                'title':    'EcoLearn — SIH 2025 Inter-College Winner',
                'subtitle': 'Smart India Hackathon 2025',
                'detail':   'Developed the Eco-Mart frontend module for EcoLearn, a gamified environmental education platform for children (ages 9–12) that won Smart India Hackathon 2025 (Inter-College). Implemented a reward-based marketplace with a coupon redemption system tied to the platform\'s conservation learning game loop.',
                'images':   ['images/leadership/ecomart1.jpg', 'images/leadership/ecomart2.jpg'],
                'links': [
                    {'label': 'Eco-Mart (My Module)', 'url': 'https://github.com/mukhopadhyaymohore/Eco-Mart',  'type': 'github'},
                    {'label': 'Eco-Learn (Full App)', 'url': 'https://github.com/shirshanag/Eco-Learn',         'type': 'github'},
                ],
                'color': 'gold',
                'icon':  '🏆',
            },
            {
                'title':    'Departmental Highest CGPA',
                'subtitle': '2024–25 Academic Year · 2nd Year B.Tech CSE [IoT-CS-BCT]',
                'detail':   'Secured departmental highest CGPA of 8.37 among all CSE (IoT-Cybersecurity-BCT) students in the 2024–25 academic year at Future Institute of Technology, Kolkata. Current cumulative CGPA: 8.65.',
                'images':   [],
                'links':    [],
                'color':    'cyan',
                'icon':     '⭐',
            },
        ],

        'peer_review': [
            {
                'role':       'IEEE Peer Reviewer',
                'reviewer_id':'Reviewer #2',
                'paper_id':   '864',
                'paper_title':'Development and characterisation of a capacitive sensor for tea moisture measurement',
                'conference': 'GCON 2026',
                'status':     'Accepted',
                'status_note':'Weak Accept — revisions recommended',
                'pdf':        'images/ieee_peer_review/review1.pdf',
                'detail':     'Reviewed a research paper on capacitive sensor design for tea moisture measurement. Provided detailed technical feedback on statistical analysis, temperature compensation, and novelty positioning.',
                'color':      'gold',
            },
        ],

        'opensource': [
            {
                'name':    'Open Source Connect Global (OSCI \'26)',
                'role':    'Contributor & Campus Lead',
                'images':  ['images/opensource/osclead1.jpg', 'images/opensource/oscg_cert.jpg'],
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_open-source-connect-certificate-activity-7447533476620283904-By9h',
                'color':   'cyan',
                'type':    'cert',
            },
            {
                'name':    'Apertre 3.0 by ResourceIO',
                'role':    'Mentee',
                'images':  ['images/opensource/apertre_badge.png', 'images/opensource/apertre_cert.png'],
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_opensource-learning-techcommunity-activity-7446500275571490816-n0mn',
                'color':   'violet',
                'type':    'cert',
            },
            {
                'name':    'GirlScript Summer of Code 2026 (GSSOC \'26)',
                'role':    'Contributor',
                'images':  ['images/opensource/gssoc_contributor.png', 'images/opensource/gssoc_open.png', 'images/opensource/gssoc_ai.png'],
                'linkedin': None,
                'color':   'magenta',
                'type':    'badge',
            },
            {
                'name':    'Social Summer of Code 2026 (SSOC \'26)',
                'role':    'Contributor',
                'images':  ['images/opensource/ssoc_badge.png'],
                'linkedin': None,
                'color':   'gold',
                'type':    'badge',
            },
        ],

        'certifications': [
            {
                'name':    'Udacity AWS AI & ML Scholar',
                'issuer':  'Udacity × AWS',
                'detail':  'Selected as an AWS AI & ML Scholar by Udacity — completed a structured ML learning track covering supervised learning, deep learning and AWS SageMaker.',
                'images':  ['images/udacity/badge1.jpg', 'images/udacity/badge2.jpg', 'images/udacity/cert.jpg'],
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_aws-awsai-ai-activity-7449770424265125888-jJw6',
                'color':   'gold',
                'icon':    '🎓',
            },
        ],

        'newsletter': [
            {
                'title':   'CyberNova Newsletter — July Feature',
                'detail':  'Featured in the CyberNova newsletter for contributions in quantum computing and cybersecurity — covering quantum phenomena and their applications in modern security.',
                'image':   'images/newsletter/july.png',
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_cybernova-quantumcomputing-quantumphysics-activity-7366733172400623618-GmTb',
                'color':   'cyan',
                'month':   'JULY 2024',
            },
            {
                'title':   'CyberNova Newsletter — August Feature',
                'detail':  'Featured in the August edition of the CyberNova newsletter for an achievement beyond the technical domain, celebrating my passion for photography.',
                'image':   'images/newsletter/august.png',
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_grateful-to-be-featured-in-the-august-activity-7376257482421059584-2Qpt',
                'color':   'magenta',
                'month':   'AUGUST 2024',
            },
        ],

        'quantum_extra': [
            {
                'title':   'Faculty Development Programme — Quantum Computing',
                'detail':  'Participated in a Quantum Computing & Quantum Communication FDP — covering quantum circuits, QKD protocols and skill development for research applications.',
                'images':  ['images/quantum/fdp1.jpg'],
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_quantumcomputing-quantumcommunication-skilldevelopment-activity-7351939974260285441-K1_i',
                'color':   'violet',
                'icon':    '⬡',
            },
            {
                'title':   'IBM Quantum — Qiskit Certification',
                'detail':  'Completed IBM Quantum learning track covering Qiskit, Quantum ML and quantum circuit design. Earned IBM SkillsBuild certification in Quantum Machine Learning (Intermediate).',
                'images':  ['images/quantum/ibm1.jpg'],
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_quantumcomputing-quantummachinelearning-qiskit-activity-7445038530537603072-I-Es',
                'color':   'cyan',
                'icon':    '◈',
            },
        ],

        'leadership': [
            {
                'role':     'Secretary — ACM-FIT Student Chapter',
                'org':      'Association for Computing Machinery',
                'period':   'May 2025 - Present',
                'detail':   'Leading the ACM student chapter at Future Institute of Technology — organising technical events, workshops, and hackathons.',
                'images':   ['images/leadership/acm.png'],
                'links':    [],
                'articles': [],
                'color':    'cyan',
                'icon':     '◉',
                'type':     'badge',
            },
            {
                'role':     'Open Source Connect Global Campus Lead',
                'org':      'Open Source Connect (OSCI)',
                'period':   'December 2025 - February 2026',
                'detail':   'Campus Lead for Open Source Connect Global — driving open source culture, mentoring contributors and coordinating OSCI\'26 participation.',
                'images':   ['images/leadership/osclead1.jpg', 'images/leadership/osclead2.jpg'],
                'links':    [],
                'articles': [],
                'color':    'violet',
                'icon':     '🌐',
                'type':     'images',
            },
            {
                'role':     'McKinsey Forward Program',
                'org':      'McKinsey & Company',
                'period':   'November 2025 - December 2025',
                'detail':   'Selected for the McKinsey Forward Program — a global learning initiative developing future-ready skills in problem solving, communication and leadership.',
                'images':   ['images/leadership/mckinsey1.jpg', 'images/leadership/mckinsey2.jpg', 'images/leadership/mckinsey3.jpg'],
                'links':    [{'label': 'LinkedIn Post', 'url': 'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_takeastepforward-mckinsey-mckinseyforward-activity-7406387857092857856-BAgC', 'type': 'linkedin'}],
                'articles': [],
                'color':    'magenta',
                'icon':     '◈',
                'type':     'images',
            },
            {
                'role':     'Microsoft Learn Student Ambassador',
                'org':      'Microsoft',
                'period':   'October 2025 - Present',
                'detail':   'Selected as a Microsoft Learn Student Ambassador — representing Microsoft\'s developer community on campus and running learning sessions.',
                'images':   [],
                'links':    [],
                'articles': [],
                'color':    'cyan',
                'icon':     '⬡',
                'type':     'namecard',
            },
            {
                'role':     'Hashnode Technical Blog Writer',
                'org':      'Hashnode — Entangled Minds Series',
                'period':   'August 2025 - Present',
                'detail':   'Author of Entangled Minds — a quantum computing blog series covering concepts, algorithms and research in an accessible format.',
                'images':   [],
                'links':    [],
                'articles': [
                    {'title': 'Classical Hearts, Quantum Minds', 'url': 'https://entangledminds.hashnode.dev/classical-hearts-quantum-minds'},
                    {'title': 'Queue of Qubits',                 'url': 'https://entangledminds.hashnode.dev/queue-of-qubits'},
                    {'title': 'Quantum Phenomena',               'url': 'https://entangledminds.hashnode.dev/quantum-phenomenas'},
                ],
                'color':    'violet',
                'icon':     '✍',
                'type':     'articles',
            },
            {
                'role':     'Paytm Campus Ambassador',
                'org':      'Paytm',
                'period':   'April 2026 - Present',
                'detail':   'Campus Ambassador for Paytm — promoting fintech awareness, digital payments literacy and Paytm products across the student community.',
                'images':   [],
                'links':    [],
                'articles': [],
                'color':    'gold',
                'icon':     '📡',
                'type':     'namecard',
            },
            {
                'role':     'Infosys Springboard — Pragati: Path to Future',
                'org':      'Infosys Springboard',
                'period':   '2025',
                'detail':   'Selected for Infosys Pragati: Path to Future — a learning and mentorship program by Infosys Springboard for emerging tech talent.',
                'images':   ['images/leadership/pragati.jpg'],
                'links':    [{'label': 'LinkedIn Post', 'url': 'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_infosysspringboard-pragatipathtofuture-learningjourney-activity-7383861030541594625-GfSH', 'type': 'linkedin'}],
                'articles': [],
                'color':    'magenta',
                'icon':     '⬢',
                'type':     'images',
            },
        ],
    }
    return render(request, 'achievements.html', context)

# ── Project pages ────────────────────────────────────────────────────────────

def projects_hub(request):
    return render(request, 'projects/hub.html')


def projects_fullstack(request):
    context = {
        'projects': [
            {
                'name':    'Patient Smart Card',
                'tagline': 'Full-stack Django web app digitizing patient healthcare management with Aadhaar-linked health IDs, EHR, OPD booking and telemedicine across 12 modules.',
                'live_url': 'https://patient-smart-card-khjy.onrender.com/',
                'github':   'https://github.com/mukhopadhyaymohore/Patient-Smart-Card',
                'video':    'https://res.cloudinary.com/daepdfown/video/upload/v1779767424/medcard_cscafp.mp4',
                'color':    'cyan',
                'status':   'live',
            },
            {
                'name':    'ThreatForge',
                'tagline': 'AI-powered cybersecurity incident response playbook generator — auto-generates structured playbooks from threat descriptions using Django + LLM backend.',
                'live_url': 'https://threatforge-coq9.onrender.com/',
                'github':   'https://github.com/mukhopadhyaymohore/ThreatForge',
                'video':    'https://res.cloudinary.com/daepdfown/video/upload/v1779767568/threatforge_ak5dor.mp4',
                'color':    'magenta',
                'status':   'live',
            },
        ]
    }
    return render(request, 'projects/fullstack.html', context)


def projects_ml(request):
    context = {
        'projects': [
            {
                'name':    'Titanic Survival Prediction',
                'detail':  'Classic binary classification on the Titanic dataset — feature engineering, EDA, Logistic Regression and Random Forest with cross-validation.',
                'github':  'https://github.com/mukhopadhyaymohore/Titanic',
                'color':   'cyan',
                'tags':    ['Logistic Regression', 'Random Forest', 'EDA', 'Pandas'],
                'badge':   None,
            },
            {
                'name':    'Student Mental Health Risk Prediction',
                'detail':  'Multi-label classifier (depression, anxiety, panic attacks) using 7 ML algorithms with SHAP explainability and gender fairness audit. ROC-AUC > 0.7 across all labels.',
                'github':  'https://github.com/mukhopadhyaymohore/Student-Mental-Health',
                'color':   'magenta',
                'tags':    ['XGBoost', 'SHAP', 'SMOTE', 'Multi-label', 'Fairness'],
                'badge':   None,
            },
            {
                'name':    'ICU Vital Signs Anomaly Detector',
                'detail':  'Real-time anomaly detection pipeline on ICU vital signs data using Isolation Forest and statistical thresholding for early critical event alerts.',
                'github':  'https://github.com/mukhopadhyaymohore/ICU-Vital-Signs-Anomaly-Detector',
                'color':   'violet',
                'tags':    ['Isolation Forest', 'Anomaly Detection', 'Time Series', 'ICU'],
                'badge':   None,
            },
            {
                'name':    'Breast Cancer Prediction',
                'detail':  'End-to-end binary classification on Wisconsin Breast Cancer Dataset with Logistic Regression, SVM and GridSearchCV-tuned Random Forest across 30 cell nucleus features.',
                'github':  'https://github.com/mukhopadhyaymohore/Breast-Cancer-Prediction',
                'color':   'cyan',
                'tags':    ['SVM', 'Random Forest', 'GridSearchCV', 'Classification'],
                'badge':   'SKILLFIED MENTOR',
            },
            {
                'name':    'Glucose Level Risk Prediction',
                'detail':  'High-recall glucose risk classifier on Framingham dataset. Resolved ~1.4% class imbalance via SMOTE and threshold tuning — 0.83 recall, 0.89 ROC-AUC.',
                'github':  'https://github.com/mukhopadhyaymohore/Glucose-Level-Prediction',
                'color':   'magenta',
                'tags':    ['SMOTE', 'Threshold Tuning', 'Recall', 'Framingham'],
                'badge':   'SKILLFIED MENTOR',
            },
            {
                'name':    'OASIS-2 Dementia Analysis',
                'detail':  'Longitudinal dementia risk pipeline on 373 records with 91% accuracy Random Forest, custom cognitive features and a continuous Conversion Risk Score per visit.',
                'github':  'https://github.com/mukhopadhyaymohore/Dementia-Analysis',
                'color':   'gold',
                'tags':    ['Random Forest', 'Longitudinal', 'Feature Engineering', 'OASIS-2'],
                'badge':   None,
            },
            {
                'name':    'Spam Email Detection',
                'detail':  'NLP-based spam classifier using TF-IDF vectorisation and Naive Bayes / SVM with precision-recall optimisation on email text corpora.',
                'github':  'https://github.com/mukhopadhyaymohore/Spam-Email-Detection',
                'color':   'violet',
                'tags':    ['NLP', 'TF-IDF', 'Naive Bayes', 'SVM', 'Text Classification'],
                'badge':   None,
            },
            {
                'name':    'Text Detection and Extraction',
                'detail':  'Computer vision pipeline for text detection and OCR extraction from images using OpenCV and Tesseract with preprocessing for noisy inputs.',
                'github':  'https://github.com/mukhopadhyaymohore/Text-Detection-and-Extraction',
                'color':   'cyan',
                'tags':    ['OpenCV', 'OCR', 'Tesseract', 'Computer Vision'],
                'badge':   None,
            },
            {
                'name':    'Food Delivery Time Prediction',
                'detail':  'Regression pipeline predicting food delivery ETA using distance, traffic and restaurant features with Random Forest and XGBoost benchmarking.',
                'github':  'https://github.com/mukhopadhyaymohore/Food-Delivery-Time-Prediction',
                'color':   'magenta',
                'tags':    ['Regression', 'XGBoost', 'Random Forest', 'Feature Engineering'],
                'badge':   None,
            },
            {
                'name':    'Global Pollution Analysis and Energy Recovery',
                'detail':  'Exploratory data analysis and predictive modelling on global pollution datasets correlating emission sources with renewable energy recovery potential.',
                'github':  'https://github.com/mukhopadhyaymohore/Global-Pollution-Analysis-and-Energy-Recovery',
                'color':   'gold',
                'tags':    ['EDA', 'Regression', 'Climate Data', 'Matplotlib', 'Seaborn'],
                'badge':   None,
            },
        ]
    }
    return render(request, 'projects/ml.html', context)


def projects_quantum(request):
    context = {
        'projects': [
            {
                'name':    'QKD Simulation',
                'detail':  'Quantum Key Distribution simulation implementing BB84 protocol with eavesdropping detection, qubit error rate analysis and secure key generation using Qiskit.',
                'github':  'https://github.com/mukhopadhyaymohore/QKD-Simulation',
                'color':   'cyan',
                'tags':    ['QKD', 'BB84', 'Qiskit', 'Cryptography', 'Eavesdropping Detection'],
                'badge':   None,
            },
            {
                'name':    'Hybrid Quantum-Classical Portfolio Optimization',
                'detail':  'QUBO-formulated 6-asset multi-objective portfolio optimization solved across 5 methods. CVaR-QAOA achieved 62.25% cost improvement over Standard QAOA with 3× faster convergence.',
                'github':  'https://github.com/mukhopadhyaymohore/Hybrid-Portfolio-Optimization',
                'color':   'violet',
                'tags':    ['CVaR-QAOA', 'QUBO', 'Ising Hamiltonian', 'Qiskit', '6 Qubits'],
                'badge':   'PROJECT-Q × ZUNTENIUM',
            },
            {
                'name':    'Quantum Algorithms',
                'detail':  'Implementation and benchmarking of fundamental quantum algorithms including Grover\'s search, Deutsch-Jozsa, Bernstein-Vazirani and Simon\'s algorithm using Qiskit.',
                'github':  'https://github.com/mukhopadhyaymohore/Quantum-Algorithms',
                'color':   'magenta',
                'tags':    ["Grover's", 'Deutsch-Jozsa', 'Bernstein-Vazirani', 'Qiskit'],
                'badge':   None,
            },
        ]
    }
    return render(request, 'projects/quantum.html', context)


def projects_hardware(request):
    context = {
        'projects': [
            {
                'name':    'ML-based Network Anomaly Detector',
                'detail':  'TinyML pipeline on ESP32 with promiscuous mode Wi-Fi sniffing. 13-channel capture of 8,336 packets, 91% accurate Random Forest distilled into a 3.3KB TFLite model — zero cloud dependency.',
                'github':  'https://github.com/mukhopadhyaymohore/ML-based-Network-Anomaly-Detector',
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_machinelearning-cybersecurity-embeddedsystems-activity-7447942364490338305-S249',
                'images':  [],
                'video':   'https://res.cloudinary.com/daepdfown/video/upload/v1779767974/network_l5qqk8.mp4',
                'tags':    ['ESP32', 'TFLite', 'TinyML', 'Wi-Fi Sniffing', 'PlatformIO'],
                'color':   'cyan',
                'dummy':   True,
            },
            {
                'name':    'ESP32 Radar System',
                'detail':  'Ultrasonic radar system built on ESP32 with servo-controlled sensor sweep, real-time distance mapping and serial plotter visualisation.',
                'github':  None,
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_iot-embeddedsystems-arduino-activity-7411376256153210880-ISDU',
                'images':  [],
                'video':   'https://res.cloudinary.com/daepdfown/video/upload/v1779767978/radar_g3grye.mp4',
                'tags':    ['ESP32', 'Ultrasonic', 'Servo', 'Radar', 'Arduino'],
                'color':   'magenta',
                'dummy':   True,
            },
            {
                'name':    'IoT Smart Door Security System',
                'detail':  'Smart door lock system using ESP32 with PIR motion detection, keypad authentication, relay-controlled lock mechanism and real-time alerts.',
                'github':  None,
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_iot-embeddedsystems-smartsecurity-activity-7407815148582842369-4Dkk',
                'images':  [],
                'video':   'https://res.cloudinary.com/daepdfown/video/upload/v1779767978/smartdoor_re0tmq.mp4',
                'tags':    ['ESP32', 'PIR Sensor', 'Keypad', 'Relay', 'Smart Security'],
                'color':   'violet',
                'dummy':   True,
            },
            {
                'name':    'Mini Traffic Light System',
                'detail':  'Arduino-based mini traffic light controller with timed LED sequencing, pedestrian button interrupt and configurable cycle timing.',
                'github':  None,
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_building-a-mini-traffic-light-system-with-activity-7374367531731599360--vVZ',
                'images':  [],
                'video':   'https://res.cloudinary.com/daepdfown/video/upload/v1779767979/trafficlight_ewhume.mp4',
                'tags':    ['Arduino', 'LED', 'Traffic Light', 'Interrupt', 'Embedded C'],
                'color':   'gold',
                'dummy':   True,
            },
        ]
    }
    return render(request, 'projects/hardware.html', context)

def projects_python(request):
    context = {
        'projects': [
            {
                'name':    'Password Manager',
                'detail':  'A secure desktop password manager built in Python — stores, retrieves and manages credentials with encryption. Features a clean CLI/GUI interface with master password protection.',
                'github':  'https://github.com/mukhopadhyaymohore/Password_Manager',
                'linkedin':'https://www.linkedin.com/posts/mohore-mukhopadhyay-86a110350_pythondeveloper-codingprojects-buildinpublic-activity-7429415461949227009-9QJy',
                'video':   'https://res.cloudinary.com/daepdfown/video/upload/v1779768684/password_dbakzi.mp4',
                'color':   'cyan',
                'tags':    ['Python', 'Encryption', 'CLI', 'Password Security', 'File Handling'],
                'badge':   None,
            },
        ]
    }
    return render(request, 'projects/python.html', context)


def projects_java(request):
    context = {
        'projects': [
            {
                'name':    'ATM Interface',
                'detail':  'Java OOP implementation of a fully functional ATM interface with core banking operations — deposit, withdrawal, balance enquiry and transaction history.',
                'github':  'https://github.com/mukhopadhyaymohore/CODSOFT-PROJECTS/blob/main/ATMInterface.java',
                'color':   'violet',
                'tags':    ['Java', 'OOP', 'Banking', 'Console App'],
                'badge':   'CODSOFT INTERNSHIP',
            },
            {
                'name':    'Number Guessing Game',
                'detail':  'Java console game with random number generation, configurable attempt limits, live score counter and difficulty scaling.',
                'github':  'https://github.com/mukhopadhyaymohore/CODSOFT-PROJECTS/blob/main/NumberGuessGame.java',
                'color':   'magenta',
                'tags':    ['Java', 'Random', 'Game Logic', 'Console App'],
                'badge':   'CODSOFT INTERNSHIP',
            },
            {
                'name':    'Student Management System',
                'detail':  'Java CRUD application for student record management with file handling, console-based menu interface and persistent data storage.',
                'github':  'https://github.com/mukhopadhyaymohore/CODSOFT-PROJECTS/blob/main/StudentManagementSystem.java',
                'color':   'cyan',
                'tags':    ['Java', 'CRUD', 'File Handling', 'OOP', 'Console App'],
                'badge':   'CODSOFT INTERNSHIP',
            },
        ]
    }
    return render(request, 'projects/java.html', context)


def projects_frontend(request):
    context = {
        'projects': [
            {
                'name':     'CyberQuiz',
                'detail':   'Browser-based interactive cybersecurity quiz with 25 questions across Beginner, Intermediate and Pro difficulty tiers — instant client-side grading and answer review.',
                'github':   'https://github.com/mukhopadhyaymohore/CyberQuiz',
                'live_url': 'https://mukhopadhyaymohore.github.io/CyberQuiz/',
                'linkedin': None,
                'video':    'https://res.cloudinary.com/daepdfown/video/upload/v1779767714/cyberquiz_ggtp2m.mp4',
                'color':    'cyan',
                'tags':     ['HTML', 'CSS', 'JavaScript', 'Quiz', 'Cybersecurity'],
            },
            {
                'name':     'Encrypt-Decrypt Simulator',
                'detail':   'Client-side encryption-decryption simulator in HTML/JS demonstrating applied cryptography concepts — Caesar cipher, Base64, ROT13 and more through an interactive web interface.',
                'github':   'https://github.com/mukhopadhyaymohore/Encrypt-Decrypt',
                'live_url': 'https://mukhopadhyaymohore.github.io/Encrypt-Decrypt/',
                'linkedin': None,
                'video':    'https://res.cloudinary.com/daepdfown/video/upload/v1779767943/encrypt-decrypt_bv0x3l.mp4',
                'color':    'magenta',
                'tags':     ['HTML', 'CSS', 'JavaScript', 'Cryptography', 'Encryption'],
            },
            {
                'name':     'La Luna — Moon Wheel',
                'detail':   'An interactive moon phase wheel built with vanilla HTML/CSS/JS — visualises lunar cycles, moon phases and astronomical data through a beautifully animated rotating interface.',
                'github':   'https://github.com/mukhopadhyaymohore/La-Luna',
                'live_url': 'https://mukhopadhyaymohore.github.io/La-Luna/',
                'linkedin': None,
                'video':    'https://res.cloudinary.com/daepdfown/video/upload/v1779767870/moonwheel_kpswxf.mp4',
                'color':    'violet',
                'tags':     ['HTML', 'CSS', 'JavaScript', 'Animation', 'Astronomy'],
            },
        ]
    }
    return render(request, 'projects/frontend.html', context)

# ── Contact form ─────────────────────────────────────────────────────────────

def contact(request):
    """
    POST handler for the contact form on the home page footer section.
    Saves to DB and optionally emails. GET requests bounce back to home.
    Switch EMAIL_BACKEND in settings.py from console → SMTP for production.
    """
    if request.method == 'POST':
        name    = request.POST.get('name', '').strip()
        email   = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()

        if name and email and message:
            # Save to database
            ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message,
            )

            django_messages.success(
                request,
                'TRANSMISSION_SENT // Message received. I\'ll get back to you soon.'
            )
        else:
            django_messages.error(
                request,
                'INCOMPLETE_PACKET // Name, email and message are required.'
            )

        return redirect('home')

    return redirect('home')
