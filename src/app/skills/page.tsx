import SectionTitle from "@/components/SectionTitle"

export default function Skills() {
  const skills = [
    "Node.js (Express, NestJS)",
    "Python (FastAPI, Flask)",
    "PHP (Laravel)",
    "HTML, CSS, JavaScript",
    "React / Vue (basic or intermediate)",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Git & GitHub",
    "Docker",
    "Nginx",
    "Linux",
  ]

  return (
    <main className="min-h-screen pb-24">
      <div className="screen">
        <div className="flex flex-col gap-0.5">
          <SectionTitle title="Skills" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
                <span key={index} className="skills-card">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
