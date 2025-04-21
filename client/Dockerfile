# Используем официальный образ Node.js на основе Alpine (легковесный)
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Используем nginx для обслуживания статики
FROM nginx:stable-alpine

# Копируем конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранное приложение из предыдущего этапа
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 3000

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
