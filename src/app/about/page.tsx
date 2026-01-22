import SectionTitle from "@/components/SectionTitle"

export default function About() {
  return (
    <main className="min-h-screen pb-24">
      <div className="screen">
        <div className="flex flex-col gap-0.5">
          <SectionTitle title="About Me" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-zinc-300">
                I am a full-stack developer with experience building backend systems, APIs, and full web applications.
                I focus on performance, security, and maintainable code.
              </p>

              <div className="flex flex-col gap-2 mt-4">
                <h2 className="font-semibold">I have worked with:</h2>
                <ul className="flex flex-col gap-1 list-disc list-inside ml-4 text-zinc-300">
                  <li>RESTful APIs</li>
                  <li>Authentication & authorization (JWT, OAuth)</li>
                  <li>Database design & optimization</li>
                  <li>Deployment & CI/CD basics</li>
                </ul>
              </div>

              <p className="text-zinc-300 mt-4">
                I&apos;m always learning and improving my skills through real projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
