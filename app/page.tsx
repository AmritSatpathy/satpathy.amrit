const experience = [
  {
    company: "Amazon",
    location: "Bangalore, India",
    roles: [
      {
        title: "Software Development Engineer II",
        period: "March 2025 - Present",
        points: [
          "Developed a data pipeline and service to extract browser data and feed into payment ML models, enabling frictionless transaction classification.",
          "Built services leveraging foundation models trained on Amazon's internal code base to answer security-related queries using natural language."
        ]
      },
      {
        title: "Software Development Engineer I",
        period: "July 2022 - March 2025",
        points: [
          "Designed AWS CloudWatch-based alarming systems using CDK, reducing incident response time by 30% and improving availability to 99.999%.",
          "Migrated logging architecture to Amazon S3 and Athena, reducing costs by $1M annually.",
          "Ensured secure service onboarding using OAuth2 and TLS, mitigating 80% of known vulnerabilities."
        ]
      },
      {
        title: "Software Development Engineer Intern",
        period: "Jan 2022 - July 2022",
        points: [
          "Created an NLP-based support ticket classifier using Amazon Comprehend, reducing manual triage by 5K+ tickets and saving 300+ engineering hours."
        ]
      }
    ]
  },
  {
    company: "JetLeads",
    location: "Online",
    roles: [
      {
        title: "Data Science Intern",
        period: "May 2020 - June 2020",
        points: [
          "Developed an email response automation system using Python and sentiment analysis; implemented IMAP integration and sentiment scoring with NLTK and TextBlob."
        ]
      }
    ]
  }
];

const projects = [
  {
    title: "PUBG Win Predictor",
    period: "Dec 2018 - Feb 2019",
    description:
      "Built ML models including Logistic Regression, Naive Bayes, and SVM on PUBG data to predict win probability; achieved 85% accuracy after hyperparameter tuning."
  },
  {
    title: "Toxic Comment Classifier",
    period: "Feb 2020 - July 2020",
    description:
      "Implemented LSTM and Bi-GRU models on Kaggle toxicity data; achieved 92% F1-score using word embeddings and dropout regularization."
  }
];

const certifications = [
  {
    title: "Machine Learning by Andrew Ng",
    issuer: "Coursera",
    credential: "45HL49CFGPNJ",
    description:
      "Built a foundation in supervised and unsupervised learning, logistic regression, SVMs, clustering, and deep learning basics."
  },
  {
    title: "DeepLearning.AI Deep Learning Specialization",
    issuer: "Coursera",
    credential: "N9PTK4NDT5CN",
    description:
      "Completed a five-course series covering neural networks, CNNs, sequence models, deployment, TensorFlow, Keras, NLP, image recognition, and time series forecasting."
  },
  {
    title: "DeepLearning.AI TensorFlow Developer Specialization",
    issuer: "Coursera",
    credential: "EWNYX6N4JWR3",
    description:
      "Focused on building and training neural networks using TensorFlow 2, including computer vision, NLP, time series, TFX, and TensorFlow Lite."
  }
];

const skillGroups = [
  {
    label: "Programming",
    skills: ["Python", "C++", "SQL", "R", "Java"]
  },
  {
    label: "ML & Data Tools",
    skills: [
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "TensorFlow",
      "Amazon Comprehend",
      "AWS Athena",
      "Keras"
    ]
  },
  {
    label: "ML Techniques",
    skills: [
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
      "Random Forests",
      "SVM",
      "K-Means",
      "ANN",
      "CNN",
      "RNN",
      "NLP"
    ]
  },
  {
    label: "Data Engineering",
    skills: ["AWS S3", "CloudWatch", "CDK", "Docker"]
  }
];

const education = [
  {
    school: "National University of Singapore",
    location: "Singapore",
    degree: "Masters in Data Science and Machine Learning",
    period: "Currently pursuing",
    detail:
      "Focused on statistics, machine learning, and data-driven research."
  },
  {
    school: "Vellore Institute of Technology",
    location: "Chennai, India",
    degree: "Bachelors in Computer Science Engineering",
    period: "2018 - 2022",
    detail:
      "Relevant coursework: Artificial Intelligence, Database Management Systems, Computer Vision, Linear Algebra. CGPA: 8.78."
  },
  {
    school: "DAV Chandrasekharpur",
    location: "Bhubaneswar, India",
    degree: "12th Grade, Science with Computer Science",
    period: "2016 - 2018",
    detail: "Score: 93.4%."
  }
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="intro-title">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#" aria-label="Amrit Satpathy home">
            AS
          </a>
          <div className="nav-links">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="intro">
            <p className="eyebrow">Data science / backend systems / ML</p>
            <h1 id="intro-title">
              <span>Amrit</span>
              <span className="surname">Satpathy</span>
            </h1>
            <p className="lead">
              Currently pursuing a Master's in Data Science and Machine
              Learning at NUS, with 4+ years of experience in scalable backend
              systems, ML model deployment, and NLP applications.
            </p>
            <div className="actions" aria-label="Primary actions">
              <a className="button primary" href="#experience">
                View experience
              </a>
              <a className="button secondary" href="/AmritSatpathyCV.pdf">
                Download CV
              </a>
            </div>
          </div>

          <aside className="profile-panel" aria-label="Profile summary">
            <div className="metric-grid">
              <div>
                <span>4+</span>
                <p>Years of FAANG Experience</p>
              </div>
              <div>
                <span>99.999%</span>
                <p>Availability improved</p>
              </div>
              <div>
                <span>$1M</span>
                <p>Annual cost reduction</p>
              </div>
              <div>
                <span>5K+</span>
                <p>Tickets automated</p>
              </div>
            </div>
            <div className="panel-copy">
              <p className="panel-label">Current focus</p>
              <p className="panel-title">
                Statistics, machine learning, and data-driven research.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section
        className="content-section"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Professional experience</p>
          <h2 id="experience-title">Systems that scale</h2>
        </div>
        <div className="timeline">
          {experience.map((company) => (
            <article className="timeline-company" key={company.company}>
              <div className="company-heading">
                <h3>{company.company}</h3>
                <span>{company.location}</span>
              </div>
              {company.roles.map((role) => (
                <div className="role" key={`${company.company}-${role.title}`}>
                  <div className="role-heading">
                    <h4>{role.title}</h4>
                    <span>{role.period}</span>
                  </div>
                  <ul>
                    {role.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section
        className="content-section"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h2 id="projects-title">Applied ML work</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <p className="card-label">{project.period}</p>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">Technical skills</p>
          <h2 id="skills-title">Tools and methods</h2>
        </div>
        <div className="skill-list">
          {skillGroups.map((group) => (
            <article className="skill-group" key={group.label}>
              <h3>{group.label}</h3>
              <div className="tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="education-title">
        <div className="section-heading">
          <p className="eyebrow">Education</p>
          <h2 id="education-title">Academic base</h2>
        </div>
        <div className="timeline">
          {education.map((item) => (
            <article className="timeline-company" key={item.school}>
              <div className="company-heading">
                <h3>{item.school}</h3>
                <span>{item.location}</span>
              </div>
              <div className="role">
                <div className="role-heading">
                  <h4>{item.degree}</h4>
                  <span>{item.period}</span>
                </div>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="content-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Get in touch</h2>
        </div>
        <div className="contact-list">
          <a href="mailto:satpathy.amrit@gmail.com">satpathy.amrit@gmail.com</a>
          <a href="tel:+917683982955">+91 7683982955</a>
          <a href="https://www.linkedin.com/in/amritsatpathy/">
            linkedin.com/in/amritsatpathy
          </a>
          <a href="https://github.com/amritsatpathy">github.com/amritsatpathy</a>
        </div>
      </section>
    </main>
  );
}
