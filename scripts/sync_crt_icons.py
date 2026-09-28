import shutil
import base64
import os

src_ico = r'c:\Users\gs552\PycharmProjects\NextxCRT\favicon.ico'
src_png = r'c:\Users\gs552\PycharmProjects\NextxCRT\web_assets\img\favicon.png'
dest_dir = r'C:\Users\gs552\PycharmProjects\gpu-rent-landing\public'

dest_ico = os.path.join(dest_dir, 'favicon.ico')
dest_png = os.path.join(dest_dir, 'favicon.png')
dest_logo_png = os.path.join(dest_dir, 'logo.png')
dest_svg = os.path.join(dest_dir, 'favicon.svg')
dest_logo_svg = os.path.join(dest_dir, 'logo.svg')

print(f"Copying {src_ico} -> {dest_ico}")
shutil.copy2(src_ico, dest_ico)

print(f"Copying {src_png} -> {dest_png}")
shutil.copy2(src_png, dest_png)

print(f"Copying {src_png} -> {dest_logo_png}")
shutil.copy2(src_png, dest_logo_png)

with open(src_png, 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('ascii')

favicon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="100%" height="100%">
  <image width="1024" height="1024" href="data:image/png;base64,{b64}" />
</svg>
'''

with open(dest_svg, 'w', encoding='utf-8') as f:
    f.write(favicon_svg)
print(f"Wrote {dest_svg}")

logo_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="100%" height="100%">
  <image width="1024" height="1024" href="data:image/png;base64,{b64}" />
</svg>
'''

with open(dest_logo_svg, 'w', encoding='utf-8') as f:
    f.write(logo_svg)
print(f"Wrote {dest_logo_svg}")

print("Sync completed successfully.")
