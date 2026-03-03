$src = "$env:TEMP\get-shit-done"
Write-Host "Copying from $src"
if (!(Test-Path $src)) {
    Write-Host "Source directory does not exist!"
    exit 1
}

Copy-Item -Recurse -Force "$src\.agent" .\
Copy-Item -Recurse -Force "$src\.gemini" .\
Copy-Item -Recurse -Force "$src\.gsd" .\
Copy-Item -Recurse -Force "$src\adapters" .\
Copy-Item -Recurse -Force "$src\docs" .\
Copy-Item -Recurse -Force "$src\scripts" .\
Copy-Item -Force "$src\PROJECT_RULES.md" .\
Copy-Item -Force "$src\GSD-STYLE.md" .\
Copy-Item -Force "$src\model_capabilities.yaml" .\

Write-Host "Copy complete."
Remove-Item -Recurse -Force "$src"
Write-Host "Cleanup complete."
