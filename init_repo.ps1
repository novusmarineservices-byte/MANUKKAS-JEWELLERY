$git = "C:\Users\Badusha\AppData\Local\Programs\Git\cmd\git.exe"

& $git init
& $git config user.name "Badusha"
& $git config user.email "novusmarineservices@gmail.com"
& $git add .
& $git commit -m "Initial commit: Manukkas Jewellery LLC luxury website"
& $git log -1 --stat
