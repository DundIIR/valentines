# Инструкция по деплою на GitHub Pages

## Шаги для публикации:

### 1. Создайте репозиторий на GitHub
- Назовите его, например, `valentines` или ваше имя пользователя для личного сайта

### 2. Если репозиторий называется НЕ так же, как ваш GitHub username:
Раскомментируйте строку в `next.config.ts`:
```typescript
basePath: '/valentines', // замените 'valentines' на название вашего репозитория
```

### 3. Загрузите код в репозиторий:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/valentines.git
git push -u origin main
```

### 4. Настройте GitHub Pages:
1. Откройте настройки репозитория (Settings)
2. Перейдите в раздел "Pages" (слева в меню)
3. В "Build and deployment" выберите:
   - **Source**: GitHub Actions
4. Сохраните изменения

### 5. Автоматический деплой:
После push в ветку `main`, GitHub Actions автоматически соберет и опубликует сайт.
Проверьте статус в разделе "Actions" вашего репозитория.

### 6. Ваш сайт будет доступен по адресу:
- Если репозиторий называется `ВАШ_USERNAME.github.io`: https://ВАШ_USERNAME.github.io/
- Если репозиторий называется по-другому: https://ВАШ_USERNAME.github.io/valentines/

## Локальная сборка (опционально):
```bash
pnpm install
pnpm run build
```

Статические файлы будут в папке `out/`
