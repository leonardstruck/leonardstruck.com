import { HeroWithImage } from "ui";
import profile from "@/assets/portrait.jpg";
import { GithubCircle, Linkedin } from "iconoir-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <HeroWithImage title="Hi, I'm Leonard." imageSrc={profile.src} />
      <ul className="gap-4 flex">
        <li>
          <a href="https://github.com/leonardstruck" className="flex gap-2" target="_top"><GithubCircle /> Github</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/leonardstruck/" className="flex gap-2" target="_top"><Linkedin /> LinkedIn</a>
        </li>
      </ul>
    </div>)
}
