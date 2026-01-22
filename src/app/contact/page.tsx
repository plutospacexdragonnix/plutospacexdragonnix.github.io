import SectionTitle from "@/components/SectionTitle"

const contactLinks = [
  {
    name: "Email",
    link: "mailto:nakamuraaoi1124@gmail.com",
  },
  {
    name: "GitHub",
    link: "https://github.com/yourname",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/nakamuraaoi",
  },
]

export default function Contact() {
  return (
    <main className="min-h-screen pb-24">
      <div className="screen">
        <div className="flex flex-col gap-0.5">
          <SectionTitle title="Contact" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2.5">
              <p className="text-zinc-300">
                📧 Email:{" "}
                <a
                  href="mailto:nakamuraaoi1124@gmail.com"
                  className="text-zinc-400 hover:text-mainWhite transition-colors duration-100"
                >
                  nakamuraaoi1124@gmail.com
                </a>
              </p>
              <p className="text-zinc-300">
                💼 GitHub:{" "}
                <a
                  href="https://github.com/yourname"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-mainWhite transition-colors duration-100"
                >
                  https://github.com/yourname
                </a>
              </p>
              <p className="text-zinc-300">
                🔗 LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/nakamuraaoi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-mainWhite transition-colors duration-100"
                >
                  https://www.linkedin.com/in/nakamuraaoi
                </a>
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    target={link.link.startsWith("http") ? "_blank" : undefined}
                    rel={link.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="btn"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
