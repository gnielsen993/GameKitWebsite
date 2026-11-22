"""Generate GameDrawer's sitemap from tracked pages and their Git dates."""
import argparse
import subprocess
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]


def git(*args):
    return subprocess.check_output(["git", *args], cwd=ROOT, text=True)


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.url = None
        self.indexable = True

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == "link" and attrs.get("rel") == "canonical":
            self.url = attrs["href"]
        if tag == "meta" and attrs.get("name") == "robots":
            self.indexable = "noindex" not in attrs["content"].lower()


def sitemap(staged):
    pages = git("ls-files", "--", "*.html").splitlines()
    changed = set(git("diff", "--cached", "--name-only").splitlines())
    entries = []
    for path in sorted(pages, key=lambda name: (name != "index.html", name)):
        page = Page()
        page.feed(git("show", ":" + path) if staged else (ROOT / path).read_text())
        if not page.indexable:
            continue
        if not page.url:
            raise ValueError(f"Missing canonical URL in {path}")
        modified = (date.today().isoformat() if staged and path in changed
                    else git("log", "-1", "--format=%cs", "--", path).strip())
        entries.append(f"  <url><loc>{escape(page.url)}</loc><lastmod>{modified}</lastmod></url>")
    return "\n".join(['<?xml version="1.0" encoding="UTF-8"?>',
                      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                      *entries, "</urlset>", ""])


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--staged", action="store_true", help="write dates for the staged pages")
    args = parser.parse_args()
    target = ROOT / "sitemap.xml"
    expected = sitemap(args.staged)
    if args.staged:
        target.write_text(expected)
    elif target.read_text() != expected:
        raise SystemExit("Stale sitemap. Run python3 scripts/sitemap.py --staged and stage sitemap.xml.")
