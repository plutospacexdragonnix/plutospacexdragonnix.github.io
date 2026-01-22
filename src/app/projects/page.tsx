import SectionTitle from "@/components/SectionTitle"

const projects = [
  {
    title: "Task Management System (Laravel)",
    tech: "Laravel, MySQL, Blade",
    description:
      "A task management web app with user authentication, role-based access, and CRUD operations.",
    features: [
      "User login & registration",
      "Task creation, update, delete",
      "Admin dashboard",
      "Validation & security",
    ],
    github: "https://github.com/yourname/task-manager",
    demo: "https://taskmanager.yoursite.com",
    skills: ["Laravel", "MySQL", "Blade", "PHP"],
  },
  {
    title: "REST API for E-commerce (Node.js)",
    tech: "Node.js, Express, MongoDB, JWT",
    description: "A RESTful API for an e-commerce platform.",
    features: [
      "JWT authentication",
      "Product & order management",
      "Cart system",
      "API documentation (Swagger)",
    ],
    github: "https://github.com/yourname/node-ecommerce-api",
    demo: "https://ecommerce-api.yoursite.com",
    skills: ["Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    title: "Data Processing API (Python)",
    tech: "Python, FastAPI, PostgreSQL",
    description: "An API that processes and analyzes uploaded data files.",
    features: [
      "File upload",
      "Background tasks",
      "Data validation",
      "API performance optimization",
    ],
    github: "https://github.com/yourname/python-fastapi-project",
    demo: "https://data-api.yoursite.com",
    skills: ["Python", "FastAPI", "PostgreSQL"],
  },
]

export default function Projects() {
  return (
    <main className="min-h-screen pb-24">
      <div className="screen">
        <div className="flex flex-col gap-3">
          <SectionTitle title="Projects" />
          <div className="flex flex-col md:gap-2.5 gap-3.5">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-700 rounded-md p-2 cursor-pointer hover:bg-zinc-800/75 transition-colors duration-100"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-2xl font-semibold">
                        {project.title}
                      </h2>
                      <p className="text-sm text-zinc-400">{project.tech}</p>
                    </div>
                  </div>
                  <p className="text-zinc-300 opacity-80">{project.description}</p>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-sm">Features:</h3>
                    <ul className="flex flex-col gap-1 list-disc list-inside ml-4 text-zinc-300 text-sm">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="border border-zinc-700 px-2 py-0.5 rounded-md text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
