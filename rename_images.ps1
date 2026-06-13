# Powershell script to rename images to lowercase-kebab and output a map

$base = "e:\PACKMAX\packmax-app\public"
$images = @(
    # Format: @(old_relative_path, new_relative_path)
    @("/images/AIR BUBBLE ROLL MAIN.webp", "/images/air-bubble-roll-main.webp"),
    @("/images/Courier_bags-removebg-preview.webp", "/images/courier-bags-removebg-preview.webp"),
    @("/images/BAGS_ECOMMERCE/BAGS 2.webp", "/images/bags-ecommerce/bags-2.webp"),
    @("/images/BAGS_ECOMMERCE/Courier_bags-removebg-preview.webp", "/images/bags-ecommerce/courier-bags-removebg-preview.webp"),
    @("/images/BAGS_ECOMMERCE/FLIPKART BAG.webp", "/images/bags-ecommerce/flipkart-bag.webp"),
    @("/images/bopp_brown_tape/48MM_50M_TS.webp", "/images/bopp-brown-tape/48mm-50m-ts.webp"),
    @("/images/bopp_brown_tape/48MM_65M_TS2.webp", "/images/bopp-brown-tape/48mm-65m-ts2.webp"),
    @("/images/bopp_brown_tape/Perfect1.webp", "/images/bopp-brown-tape/perfect1.webp"),
    @("/images/bopp_brown_tape/width 55.webp", "/images/bopp-brown-tape/width-55.webp"),
    @("/images/bopp_color_tapes/COLOR TAPE 1.webp", "/images/bopp-color-tapes/color-tape-1.webp"),
    @("/images/bopp_color_tapes/COLOR TAPE 2.webp", "/images/bopp-color-tapes/color-tape-2.webp"),
    @("/images/bopp_color_tapes/COLOR TAPE 3.webp", "/images/bopp-color-tapes/color-tape-3.webp"),
    @("/images/bopp_transparent/BOOP TRANS TAPE 1.webp", "/images/bopp-transparent/boop-trans-tape-1.webp"),
    @("/images/bopp_transparent/BOOP TRANS TAPE 2.webp", "/images/bopp-transparent/boop-trans-tape-2.webp"),
    @("/images/bopp_transparent/BOOP TRANS TAPE 3.webp", "/images/bopp-transparent/boop-trans-tape-3.webp"),
    @("/images/bopp_transparent/BOOP TRANS TAPE 4.webp", "/images/bopp-transparent/boop-trans-tape-4.webp"),
    @("/images/bopp_transparent/BOOP TRANS TAPE 5.webp", "/images/boop-transparent/boop-trans-tape-5.webp"),
    @("/images/COGROLL/CORUGGLATED ROLLL.webp", "/images/cogroll/corrugated-roll.webp"),
    @("/images/custom_brand_tape/CUSTOM BRAND 2.webp", "/images/custom-brand-tape/custom-brand-2.webp"),
    @("/images/custom_brand_tape/CUSTOM BRAND TAPE 1.webp", "/images/custom-brand-tape/custom-brand-tape-1.webp"),
    @("/images/custom_brand_tape/CUSTOM BRAND TAPE 3.webp", "/images/custom-brand-tape/custom-brand-tape-3.webp"),
    @("/images/strapping/STRAPPING CLIP.webp", "/images/strapping/strapping-clip.webp"),
    @("/images/strapping/STRAPPING ROLLL.webp", "/images/strapping/strapping-roll.webp"),
    @("/images/STRETCH FLIMROLL/SF 1.webp", "/images/stretch-filmroll/sf-1.webp"),
    @("/images/STRETCH FLIMROLL/SF 2.webp", "/images/stretch-filmroll/sf-2.webp"),
    @("/images/STRETCH FLIMROLL/SF 3.webp", "/images/stretch-filmroll/sf-3.webp"),
    @("/images/TAPES/AMAZON PRIME TAPE.webp", "/images/tapes/amazon-prime-tape.webp"),
    @("/images/TAPES/AMAZON TAPE.webp", "/images/tapes/amazon-tape.webp"),
    @("/images/TAPES/FLIPKART TAPE.webp", "/images/tapes/flipkart-tape.webp"),
    @("/images/TAPES/MEESHO TAPE.webp", "/images/tapes/meesho-tape.webp")
)

# 1. Create directories
$dirs = @(
    "bags-ecommerce",
    "bopp-brown-tape",
    "bopp-color-tapes",
    "bopp-transparent",
    "cogroll",
    "custom-brand-tape",
    "stretch-filmroll",
    "tapes"
)

foreach ($dir in $dirs) {
    $path = Join-Path "$base\images" $dir
    if (!(Test-Path $path)) {
        New-Item -ItemType Directory -Force -Path $path | Out-Null
    }
}

# 2. Move and rename files
foreach ($item in $images) {
    $oldRel = $item[0]
    $newRel = $item[1]
    
    $oldPath = "$base$oldRel".Replace("/", "\")
    $newPath = "$base$newRel".Replace("/", "\")
    
    if (Test-Path $oldPath) {
        Write-Host "Moving $oldPath to $newPath"
        Move-Item -Path $oldPath -Destination $newPath -Force
    } else {
        Write-Host "Old path not found: $oldPath"
    }
}

# 3. Clean up empty old folders
$oldDirs = @(
    "BAGS_ECOMMERCE",
    "bopp_brown_tape",
    "bopp_color_tapes",
    "bopp_transparent",
    "COGROLL",
    "custom_brand_tape",
    "STRETCH FLIMROLL",
    "TAPES"
)

foreach ($dir in $oldDirs) {
    $path = Join-Path "$base\images" $dir
    if (Test-Path $path) {
        $files = Get-ChildItem -Path $path
        if ($files.Count -eq 0) {
            Write-Host "Removing empty directory $path"
            Remove-Item -Path $path -Force
        } else {
            Write-Host "Directory not empty: $path ($($files.Count) files)"
        }
    }
}
