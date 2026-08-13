import base64
from pathlib import Path

from PIL import Image


ASSET_DIR = Path("/home/ubuntu/webdev-static-assets")
PROJECT_DIR = Path("/home/ubuntu/lungo-presentation")
GENERATED_DIR = PROJECT_DIR / "client/src/generated"
BRAND_BOARD = Path("/home/ubuntu/upload/lungo_brand.png")

SOURCES = {
    "lungo-wall-real.png": "lungo-wall-real.jpg",
    "lungo-cookie-real.png": "lungo-cookie-real.jpg",
    "lungo-matcha-real.png": "lungo-matcha-real.jpg",
}


for source_name, output_name in SOURCES.items():
    source = ASSET_DIR / source_name
    output = ASSET_DIR / output_name
    with Image.open(source) as image:
        rgb = image.convert("RGB")
        rgb.save(
            output,
            format="JPEG",
            quality=88,
            optimize=True,
            progressive=True,
            subsampling="4:2:0",
        )
        print(f"prepared {output} ({output.stat().st_size} bytes)")

GENERATED_DIR.mkdir(parents=True, exist_ok=True)


def data_url(path: Path) -> str:
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:image/jpeg;base64,{encoded}"


wall_jpeg = ASSET_DIR / "lungo-wall-real.jpg"
wall_module = GENERATED_DIR / "wallImage.ts"
wall_module.write_text(
    "/** Quiet Cult Object — embedded real Lungo wall photograph fallback. */\n"
    f'export const wallImage = "{data_url(wall_jpeg)}";\n',
    encoding="utf-8",
)
print(f"prepared {wall_module} ({wall_module.stat().st_size} bytes)")

product_module = GENERATED_DIR / "productImages.ts"
product_module.write_text(
    "/** Quiet Cult Object — embedded real Lungo product photography. */\n"
    f'export const matchaImage = "{data_url(ASSET_DIR / "lungo-matcha-real.jpg")}";\n'
    f'export const cookieImage = "{data_url(ASSET_DIR / "lungo-cookie-real.jpg")}";\n',
    encoding="utf-8",
)
print(f"prepared {product_module} ({product_module.stat().st_size} bytes)")

# Curated details from the supplied brand board, used only as small editorial proof layers.
# Each crop is unique so the deck gains rhythm without repeating hero photographs.
CROPS = {
    "roomProof": (818, 0, 1024, 236),
    "craftProof": (590, 703, 691, 837),
    "tableProof": (696, 703, 797, 837),
    "calmProof": (902, 703, 1002, 837),
    "dropProof": (304, 1071, 441, 1201),
    "processProof": (797, 703, 900, 837),
    "voiceProof": (584, 1071, 720, 1201),
    "peopleProof": (304, 1203, 442, 1332),
    "streetProof": (162, 1334, 301, 1465),
    "toteProof": (584, 1334, 720, 1465),
}

editorial_lines = ["/** Quiet Cult Object — tactile proof crops from the supplied Lungo brand board. */"]
with Image.open(BRAND_BOARD) as board:
    board_rgb = board.convert("RGB")
    for export_name, box in CROPS.items():
        crop_path = ASSET_DIR / f"editorial-{export_name}.jpg"
        crop = board_rgb.crop(box)
        crop.save(crop_path, format="JPEG", quality=90, optimize=True, progressive=True)
        editorial_lines.append(f'export const {export_name} = "{data_url(crop_path)}";')
        print(f"prepared {crop_path} ({crop_path.stat().st_size} bytes)")

editorial_module = GENERATED_DIR / "editorialImages.ts"
editorial_module.write_text("\n".join(editorial_lines) + "\n", encoding="utf-8")
print(f"prepared {editorial_module} ({editorial_module.stat().st_size} bytes)")
