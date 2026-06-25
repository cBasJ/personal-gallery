from pathlib import Path
import math

from PIL import Image, ImageDraw
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path("/Users/cbasj/Documents/personal gallery")
SOURCE_RENDER = ROOT / "tmp/pdfs/renyu_zhang_page-1.png"
PHOTO_SOURCE = Path("/Users/cbasj/Pictures/Photos Library.photoslibrary/originals/E/ECBDBB24-31F5-443C-ADBB-771DEE658D7B.jpeg")
PHOTO_OUT = ROOT / "tmp/pdfs/renyu_headshot_circle.png"
OUTPUT = ROOT / "output/pdf/Renyu_Zhang_EN.pdf"

PAGE_W, PAGE_H = A4
DARK = colors.HexColor("#303949")
TEXT = colors.HexColor("#303949")
MUTED = colors.HexColor("#566070")
LEFT_BG = colors.HexColor("#E7E7E7")
LINE = colors.HexColor("#1F405A")
WHITE = colors.white


def register_fonts():
    candidates = [
        ("/System/Library/Fonts/Supplemental/Arial.ttf", "Arial"),
        ("/System/Library/Fonts/Supplemental/Arial Bold.ttf", "Arial-Bold"),
    ]
    for path, name in candidates:
        if Path(path).exists():
            pdfmetrics.registerFont(TTFont(name, path))


def make_circle_headshot():
    img = Image.open(PHOTO_SOURCE).convert("RGB")
    w, h = img.size
    # Fit the original portrait into the circle so the head is not over-cropped.
    target_h = 450
    target_w = round(w * target_h / h)
    crop = img.resize((target_w, target_h), Image.LANCZOS)
    out = Image.new("RGBA", (360, 360), (255, 255, 255, 0))
    bg_mask = Image.new("L", (360, 360), 0)
    draw = ImageDraw.Draw(bg_mask)
    draw.ellipse((0, 0, 359, 359), fill=255)
    ImageDraw.Draw(out).ellipse((0, 0, 359, 359), fill=(255, 255, 255, 255))
    crop_mask = Image.new("L", (360, 360), 0)
    draw = ImageDraw.Draw(crop_mask)
    draw.ellipse((5, 5, 354, 354), fill=255)
    portrait_layer = Image.new("RGBA", (360, 360), (255, 255, 255, 0))
    portrait_layer.paste(crop.convert("RGBA"), ((360 - target_w) // 2, -18))
    out.paste(portrait_layer, (0, 0), crop_mask)
    out.save(PHOTO_OUT)


def split_words(text, max_width, font, size):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        trial = word if not current else current + " " + word
        if pdfmetrics.stringWidth(trial, font, size) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, width, font="Arial", size=8.8, leading=11, color=TEXT):
    c.setFillColor(color)
    c.setFont(font, size)
    for line in split_words(text, width, font, size):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_section_header(c, title, x, y, width, icon_label=None):
    if icon_label:
        cx, cy = x - 20, y + 2
        c.setFillColor(DARK)
        c.circle(cx, cy, 10, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Arial-Bold", 8)
        c.drawCentredString(cx, cy - 3, icon_label)
    c.setFillColor(TEXT)
    c.setFont("Arial-Bold", 14)
    c.drawString(x, y, title)
    c.setStrokeColor(LINE)
    c.setLineWidth(1.1)
    c.line(x, y - 5, x + width, y - 5)
    return y - 16


def draw_left_header(c, title, y):
    x = 16
    c.setFillColor(TEXT)
    c.setFont("Arial-Bold", 15.8)
    c.drawString(x, y, title)
    c.setStrokeColor(TEXT)
    c.setLineWidth(1)
    c.line(x, y - 6, 172, y - 6)
    return y - 19


def draw_left_bullets(c, bullets, x, y, width, size=8.4, leading=11.8, gap=5.6):
    for bullet in bullets:
        c.setFillColor(TEXT)
        c.setFont("Arial", size)
        c.drawString(x, y, "-")
        y = draw_wrapped(c, bullet, x + 12, y, width - 12, "Arial", size, leading, TEXT)
        y -= gap
    return y


def draw_entry(c, title, date, subtitle, bullets, x, y, width, size=7.75, body_leading=10.85, bullet_gap=3.45):
    c.setFillColor(TEXT)
    c.setFont("Arial-Bold", 10.2)
    date_w = pdfmetrics.stringWidth(date, "Arial", 9.5)
    title_lines = split_words(title, width - date_w - 12, "Arial-Bold", 10.2)
    c.drawString(x, y, title_lines[0])
    c.setFont("Arial", 9.5)
    c.setFillColor(MUTED)
    c.drawString(x + width - date_w, y, date)
    for extra_line in title_lines[1:]:
        y -= 11
        c.setFillColor(TEXT)
        c.setFont("Arial-Bold", 10.2)
        c.drawString(x, y, extra_line)
    y -= 11
    if subtitle:
        y = draw_wrapped(c, subtitle, x, y, width, "Arial", 9.4, 11.5, TEXT)
        y -= 1
    for bullet in bullets:
        c.setFillColor(TEXT)
        c.setFont("Arial", size)
        c.drawString(x, y, "-")
        y = draw_wrapped(c, bullet, x + 12, y, width - 12, "Arial", size, body_leading, TEXT)
        y -= bullet_gap
    return y - 4.5


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    make_circle_headshot()

    c = canvas.Canvas(str(OUTPUT), pagesize=A4)
    c.setTitle("Renyu Zhang - English Resume")

    # Background blocks.
    c.setFillColor(LEFT_BG)
    c.rect(0, 0, 190, PAGE_H, fill=1, stroke=0)
    c.setFillColor(DARK)
    c.rect(0, PAGE_H - 86, PAGE_W, 86, fill=1, stroke=0)

    # Portrait and name.
    c.drawImage(ImageReader(str(PHOTO_OUT)), 22, PAGE_H - 195, width=144, height=144, mask="auto")
    c.setFillColor(WHITE)
    c.setFont("Arial-Bold", 29)
    c.drawString(252, PAGE_H - 58, "RENYU ZHANG")

    # Left column.
    left_x = 16
    left_w = 158
    y = PAGE_H - 226
    profile = (
        "Computer Science undergraduate at the University of Strasbourg, France, "
        "with systematic training in algorithms, databases, software engineering and core CS courses. "
        "Solid theoretical foundation and hands-on engineering experience. Led a database system design "
        "project and participated in collaborative development. Fluent in Chinese, English and French, "
        "with strong cross-cultural academic communication skills."
    )
    y = draw_wrapped(c, profile, left_x, y, left_w, "Arial", 8.65, 11.7, TEXT) - 13

    y = draw_left_header(c, "CONTACT", y)
    contact_lines = [
        ("Phone", "+86 18123298509"),
        ("Email", "89cBas979@gmail.com"),
        ("Location", "Chengdu, Sichuan"),
    ]
    for label, value in contact_lines:
        c.setFont("Arial-Bold", 7.9)
        c.setFillColor(TEXT)
        c.drawString(left_x, y, label)
        c.setFont("Arial", 8.95)
        c.drawString(left_x + 46, y, value)
        y -= 14
    y -= 6

    y = draw_left_header(c, "SKILLS", y)
    skill_bullets = [
        "Engineering: Python, Java, C#, Oracle, SQL and PL/SQL; experience in database design, frontend development and system implementation.",
        "Academic: rigorous logical thinking; able to deliver the full process from requirements analysis to system release; strong self-learning and problem-solving ability.",
        "Collaboration: experience in multi-person projects; able to own key modules and coordinate communication effectively.",
        "Design: skilled in Figma for wireframes, high-fidelity prototypes and interactive drafts that support development collaboration.",
        "AI tools: proficient with Claude, Codex and ChatGPT; able to build websites and complete projects independently.",
    ]
    y = draw_left_bullets(c, skill_bullets, left_x, y, left_w, 7.95, 11.95, 5.9)

    y = draw_left_header(c, "LANGUAGES", max(y, 50))
    language_bullets = [
        "Chinese: Native",
        "English: Fluent (IELTS 6.0)",
        "French: B2 (study and daily life)",
    ]
    draw_left_bullets(c, language_bullets, left_x, y, left_w, 8.35, 12.4, 5.2)

    # Timeline line and nodes.
    timeline_x = 204
    c.setStrokeColor(DARK)
    c.setLineWidth(1)
    c.line(timeline_x, PAGE_H - 138, timeline_x, 36)
    for cy in [PAGE_H - 144, PAGE_H - 354, PAGE_H - 670, 54]:
        c.setFillColor(WHITE)
        c.circle(timeline_x, cy, 3, fill=1, stroke=1)

    # Right column.
    right_x = 222
    right_w = 350
    y = PAGE_H - 134
    y = draw_section_header(c, "PROJECT EXPERIENCE", right_x, y, right_w, "P")

    y = draw_entry(
        c,
        "Multiplayer Domino Board Game Development",
        "2026",
        "Frontend Design and Development | React, TypeScript, Tailwind CSS, Vite, Monorepo, Docker, Figma",
        [
            "Participated in the development of a multiplayer online Domino game, covering requirements analysis, prototype design and frontend-backend integration.",
            "Created UI designs and interactive prototypes in Figma for the game board, tile display and player operation areas.",
            "Built the frontend with React, TypeScript and Tailwind CSS, implementing tile rendering, drag-and-drop interaction, placement validation and turn switching.",
            "Worked with backend teammates on API integration and state synchronization; used WebSocket logic to support smooth real-time multiplayer gameplay.",
            "Used Vite for development and testing, managed the project with a Monorepo structure and unified the development/deployment environment with Docker.",
        ],
        right_x,
        y,
        right_w,
        7.2,
    )

    y = draw_entry(
        c,
        "Database System Design and Implementation",
        "2025",
        "Oracle / SQL / PL-SQL",
        [
            "Designed and implemented a relational database system for data management on an image-sharing platform.",
            "Built conceptual E-R and relational models covering users, images, categories, comments, likes and other core business data.",
            "Wrote SQL scripts for table creation, constraints and test-data insertion; used keys and check constraints to ensure consistency.",
            "Implemented triggers for data archiving, business restrictions and abnormal behavior control.",
            "Created statistical and analytical SQL queries for business analysis and summaries; improved stability and query efficiency with indexing and transaction management.",
        ],
        right_x,
        y,
        right_w,
        7.2,
    )

    y = draw_entry(
        c,
        "Jardin d'Asie Restaurant",
        "2024",
        "Administrative and Information Support",
        [
            "Organized and standardized menu and business information to ensure clear, accurate and usable content.",
            "Assisted with online-system content updates and routine information maintenance to keep data timely and consistent.",
            "Supported daily administrative work, including information coordination, document organization and process support.",
            "Collaborated with team members in a multitasking environment to improve information flow and handoff efficiency.",
        ],
        right_x,
        y,
        right_w,
        7.2,
    )

    y = draw_section_header(c, "INTERNSHIP EXPERIENCE", right_x, y - 1, right_w, "W")
    y = draw_entry(
        c,
        "Shuyuan Branch, Chengdu Administration for Market Regulation",
        "2024",
        "Data Management Assistant",
        [
            "Managed market complaint and related business data end to end, including collection, structuring and system entry; established standardized input rules.",
            "Classified, cross-checked and maintained entered data, identified anomalies and reduced errors, improving data usability and query efficiency.",
            "Supported periodic data updates and version management according to established workflows, ensuring real-time accuracy and cross-department consistency.",
            "Participated in cross-department data collaboration, summarized multi-source business data, completed basic statistical analysis and produced reports for management decisions.",
            "Handled sensitive data involving citizen complaints and market-entity information under strict confidentiality rules, with no information-security incidents.",
        ],
        right_x,
        y,
        right_w,
        7.05,
    )

    y = draw_section_header(c, "EDUCATION", right_x, max(y - 1, 76), right_w, "E")
    c.setFillColor(TEXT)
    c.setFont("Arial-Bold", 9.4)
    c.drawString(right_x, y, "University of Strasbourg, France")
    c.setFont("Arial", 9.2)
    c.drawRightString(right_x + right_w, y, "B.Sc. in Computer Science")
    y -= 14
    c.setFont("Arial-Bold", 9.4)
    c.drawString(right_x, y, "UESTC + ESIGELEC Rouen")
    c.setFont("Arial", 9.2)
    c.drawRightString(right_x + right_w, y, "M.Sc. in Software Engineering")
    y -= 14
    c.setFont("Arial", 9.2)
    c.drawRightString(right_x + right_w, y, "Expected 2028")

    c.showPage()
    c.save()


if __name__ == "__main__":
    register_fonts()
    build_pdf()
