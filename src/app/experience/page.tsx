import SectionTitle from "@/components/SectionTitle"

export default function Experience() {
  return (
    <main className="min-h-screen pb-24">
      <div className="screen">
        <div className="flex flex-col gap-0.5">
          <SectionTitle title="Experience" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">
                  Freelance Full-Stack Developer
                </h2>
                <p className="text-zinc-400 text-sm">2023 – Present</p>
              </div>
              <ul className="flex flex-col gap-1 list-disc list-inside ml-4 text-zinc-300">
                <li>Developed backend APIs and web applications</li>
                <li>Worked with databases and authentication systems</li>
                <li>Collaborated with designers and frontend developers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
