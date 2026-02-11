# Git – Repositório próprio do Designyx

Este projeto tem **seu próprio repositório Git** em `Desktop\Designyx\.git`. O histórico e as branches são só daqui.

## Se você tinha um repo na pasta User (C:\Users\User)

Para o repositório da sua pasta de usuário **deixar de rastrear** o Designyx (evitar mistura de arquivos):

1. Abra o PowerShell e vá para a pasta User:
   ```powershell
   cd C:\Users\User
   ```

2. Remova o Designyx do índice (os arquivos continuam no disco):
   ```powershell
   git rm -r --cached Desktop/Designyx
   ```

3. Para o Git da User não voltar a rastrear esta pasta, adicione ao `.gitignore` **do repositório em C:\Users\User** (crie o arquivo se não existir):
   ```
   Desktop/Designyx/
   ```

4. Commit no repo da User:
   ```powershell
   git add .gitignore
   git commit -m "stop tracking Designyx - project has its own repo"
   ```

A partir daí, o único repositório do Designyx é o que está em `Desktop\Designyx`.

## Configurar sua identidade neste repo (opcional)

Foi usada uma identidade local só para o primeiro commit. Para usar seu nome e e-mail:

```powershell
cd C:\Users\User\Desktop\Designyx
git config user.name "Seu Nome"
git config user.email "seu@email.com"
```

## Adicionar um remoto (GitHub, etc.)

Quando criar o repositório no GitHub/GitLab:

```powershell
cd C:\Users\User\Desktop\Designyx
git remote add origin https://github.com/SEU-USUARIO/Designyx.git
git branch -M main
git push -u origin main
```
