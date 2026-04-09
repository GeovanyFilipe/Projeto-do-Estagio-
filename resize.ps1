Add-Type -AssemblyName System.Drawing

function Resize-Image($path) {
    if (-not (Test-Path $path)) { Write-Output "Skipped $path"; return }
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $ms = New-Object System.IO.MemoryStream(,$bytes)
    $img = [System.Drawing.Image]::FromStream($ms)
    $w = [math]::Round($img.Width / 3)
    $h = [math]::Round($img.Height / 3)
    if ($w -lt 2) {$w = 2}
    if ($h -lt 2) {$h = 2}
    $bmp = New-Object System.Drawing.Bitmap($img, [int]$w, [int]$h)
    $img.Dispose()
    $ms.Dispose()
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Done $path"
}

Copy-Item 'public\imagens\vpn.png' 'public\imagens\vpn_original.png' -ErrorAction SilentlyContinue
Resize-Image 'public\imagens\vpn.png'

Copy-Item 'public\imagens\angolanvpn-share.png' 'public\imagens\angolanvpn-share_original.png' -ErrorAction SilentlyContinue
Resize-Image 'public\imagens\angolanvpn-share.png'
