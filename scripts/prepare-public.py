"""Copy GameDrawer's publishable files to a new directory outside the source tree."""
import argparse
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_FILES = {
    "index.html", "about.html", "accessibility.html", "updates.html", "support.html",
    "press.html", "privacy.html", "terms.html", "404.html", "robots.txt", "sitemap.xml",
    "llms.txt", "favicon.ico"
}


def public_asset(path):
    parts = path.parts
    if parts[:1] != ("assets",):
        return False
    if len(parts) == 2:
        return path.suffix in {".js", ".css"}
    return (parts[:-1] in {("assets", "images"), ("assets", "images", "screenshots")}
            and path.suffix in {".png", ".jpg", ".svg"})


def prepare(target):
    if target == ROOT or ROOT in target.parents:
        raise ValueError("Choose a new directory outside the source checkout.")
    files = subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT).decode().split("\0")
    public = PUBLIC_FILES | {name for name in files if public_asset(Path(name))}
    target.mkdir(parents=True, exist_ok=False)
    for name in sorted(public):
        destination = target / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / name, destination)
    shutil.copyfile(ROOT / "deploy/gamedrawer.htaccess", target / ".htaccess")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", type=Path)
    prepare(parser.parse_args().directory.resolve())
