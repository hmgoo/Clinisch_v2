import os
from PIL import Image

src_dir = r'c:\Users\hyunmin.gu\Documents\Workspace\Clinisch_v2\public\assets\images\png'
dst_dir = r'c:\Users\hyunmin.gu\Documents\Workspace\Clinisch_v2\public\assets\images\webp'

if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

files = [f for f in os.listdir(src_dir) if f.lower().endswith('.png')]

print(f"Starting conversion of {len(files)} files...")

for filename in files:
    try:
        with Image.open(os.path.join(src_dir, filename)) as img:
            webp_filename = os.path.splitext(filename)[0] + '.webp'
            img.save(os.path.join(dst_dir, webp_filename), 'WEBP', quality=85)
            print(f"Converted: {filename} -> {webp_filename}")
    except Exception as e:
        print(f"Failed to convert {filename}: {e}")

print("Conversion complete.")
