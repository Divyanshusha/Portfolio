// Resume-bound portfolio content. Empty URLs intentionally hide unavailable CTAs.
export const SITE_URL = import.meta.env.VITE_SITE_URL || '';
export const OG_IMAGE = import.meta.env.VITE_OG_IMAGE || '';
export const RESUME_URL = import.meta.env.VITE_RESUME_URL || '';
// HI my name is Divyanshu Sharma.
export const portfolio = {
  personal: {
    name: 'Divyanshu Sharma',
    role: 'AIML Engineer' | 'Python Full Stack Developer',
    heroLine: 'PYTHON FULL STACK DEVELOPER/ AI-ML Engineer',
    tagline: 'Building AI-powered and backend applications with Python, Generative AI, APIs, RAG and machine learning.',
    summary: 'Aspiring Python Developer and Generative AI enthusiast with hands-on experience building AI-powered and backend applications using Python, FastAPI, Flask, LangChain, RAG, FAISS, Ollama, REST APIs, and LLM APIs. Built a full-stack Retrieval-Augmented Generation application for document-based question answering and a hybrid NLP/ML spam detection system published in a peer-reviewed journal. MCA graduate with a strong foundation in API development, machine learning, NLP, vector search, and Git-based collaboration, currently expanding into cloud deployment and agentic AI workflows.',
    location: 'Meerut, Uttar Pradesh, India',
    education: 'MCA Graduate',
    focus: 'Python / Backend / AI-ML',
  },
  social: {
    email: 'divyanshusharma1506@gmail.com',
    linkedin: 'https://www.linkedin.com/in/divyanshusharma15',
    github: 'https://github.com/Divyanshusha',
  },
  skills: [
    { category: 'Programming', items: ['Python (OOP)', 'DSA', 'Java', 'JavaScript'] },
    { category: 'Generative AI & LLM', items: ['LangChain', 'RAG', 'FAISS / Vector Search', 'AI Agents', 'Ollama', 'OpenAI APIs', 'Claude APIs', 'Prompt Engineering'] },
    { category: 'Frontend/Backend & APIs', items: ['React', 'FastAPI', 'Flask', 'REST APIs', 'JSON', 'CRUD Operations', 'Django'] },
    { category: 'ML & NLP', items: ['Scikit-learn', 'Pandas', 'NumPy', 'TF-IDF', 'DistilBERT', 'Transformers', 'Supervised Learning', 'Text Classification'] },
    { category: 'Databases & Tools', items: ['MySQL', 'Git', 'GitHub', 'Claude Code', 'GitHub Copilot', 'OpenAI Codex'] },
    { category: 'Currently Upskilling', items: ['Docker', 'AWS EC2', 'AWS S3', 'AWS Lambda', 'LangGraph', 'CrewAI', 'RAGAS', 'LangSmith'] },
  ],
  projects: [
    {
      id: 'simple-rag', number: '01', title: 'Simple RAG — Ask Your Documents', subtitle: 'Full-Stack RAG Application', dates: 'Jun 2026 — Jul 2026',
      tags: ['Python', 'FastAPI', 'LangChain', 'FAISS', 'Ollama', 'React'],
      description: 'Built a full-stack RAG application for uploading PDF, DOCX and TXT documents and asking questions in natural language.',
      problem: 'Document-based question answering through a retrieval-augmented workflow.',
      solution: 'Implemented FAISS-based vector retrieval and LangChain workflows for context-aware responses with source citations.',
      features: ['Document upload for PDF, DOCX and TXT files', 'FAISS-based vector retrieval', 'Context-aware responses with source citations', 'FastAPI backend connected to a React frontend', 'Llama and Claude API integration for local LLM inference'],
      pipeline: ['DOCUMENT', 'TEXT', 'CHUNKS', 'EMBEDDINGS', 'FAISS', 'RETRIEVAL', 'LLM', 'ANSWER + SOURCES'], githubUrl: '', demoUrl: '',
    },
    {
      id: 'SMS -Spam', number: '02', title: 'Hybrid AI-Based SMS Spam Detection System', subtitle: 'NLP / Machine Learning Application', dates: 'Feb 2026 — Mar 2026',
      tags: ['Python', 'Flask', 'Scikit-learn', 'Pandas', 'NumPy', 'NLP', 'DistilBERT'],
      description: 'Built a hybrid NLP/ML pipeline combining classical machine learning and DistilBERT-based deep learning for SMS spam classification.',
      problem: 'SMS spam classification using classical machine learning and transformer-based deep learning.',
      solution: 'Implemented TF-IDF vectorization and developed a real-time Flask web application for spam detection.',
      features: ['Hybrid classical ML and DistilBERT pipeline', 'TF-IDF vectorization', 'Real-time Flask web application', 'Presented at the MIET Final Year Project Expo', 'Peer-reviewed research paper published in IJARCCE'],
      pipeline: ['SMS', 'TF-IDF', 'ML + DistilBERT', 'CLASSIFICATION'], githubUrl: 'https://github.com/Divyanshusha/Hybrid-AI-based-SMS-Spam-Detection', demoUrl: '',
    },
  ],
  experience: [
    { role: 'Python Developer Intern', company: 'Kryptora Infotech', dates: 'Jun 2024 — Aug 2024', bullets: ['Developed and maintained Python scripts and modules using object-oriented programming and clean-code practices.', 'Debugged and optimized Python code under senior developer guidance.', 'Used Git for version control and collaboration.', 'Earned Certified Core Python Programmer and Certified Advanced Python Programmer credentials.'] },
    { role: 'Core Java Intern', company: 'Creative Technologies', dates: 'Jul 2022 — Aug 2022', bullets: ['Practiced core Java and object-oriented design.', 'Integrated a SQL database for secure data storage and retrieval.', 'Used Git version control.', 'Followed Agile-development practices.'] },
  ],
  education: [
    { degree: 'Master of Computer Applications', institution: 'Meerut Institute of Engineering and Technology, AKTU', dates: 'Jul 2024 — 2026', result: 'First Division' },
    { degree: 'Bachelor of Computer Applications', institution: 'Pt. Deen Dayal Upadhyay Management College, Meerut', dates: '2020 — 2023', result: '' },
  ],
  publication: { title: 'Hybrid NLP and Machine Learning Approach for SMS Spam Detection', journal: 'IJARCCE', issue: 'Vol. 15, Issue 4 · April 2026', doi: '10.17148/IJARCCE.2026.15491' },
  certifications: ['Certified Core Python Programmer', 'Certified Advanced Python Programmer', 'Python Internship Certificate — Kryptora Infotech', 'Claude 101 — Anthropic', 'MCA First Division', 'Peer-Reviewed Publication in IJARCCE'],
};
