import { GithubIcon } from "../icons/GithubIcon";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

export const Footer = () => (
  <footer
    className="footer footer-center bg-neutral z-10 py-4"
    role="contentinfo"
  >
    <div className="text-neutral-content flex font-medium">
      YearPlanner by{" "}
      <a
        className="link focusable focusable-neutral"
        target="_blank"
        href="https://komlev.me"
        rel="noopener noreferrer"
        aria-label="Visit komlev's website"
      >
        komlev
      </a>
      <a
        target="_blank"
        className="link focusable focusable-neutral"
        href="https://github.com/komlev/checkquest"
        title="Github link"
        aria-label="Github link"
      >
        <GithubIcon />
      </a>
    </div>
    <div className="absolute right-4">
      <ThemeSwitcher />
    </div>
  </footer>
);
