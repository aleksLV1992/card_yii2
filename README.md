# Yii2 Card Game

Приложение Yii2 с drag-n-drop функционалом для карточек.

## Требования

- Docker
- Docker Compose

## Установка и запуск

1. Установите зависимости Composer (локально):
```bash
composer install --ignore-platform-reqs
```

2. Запустите контейнеры:
```bash
docker-compose up -d
```

3. Откройте в браузере:
```
http://localhost:8888
```

## Версии

- **PHP**: 8.4
- **Yii2**: 2.0.51 (последняя стабильная)

## Структура проекта

```
yii2-card-game/
├── actions/              # Standalone Actions
│   └── IndexAction.php   # Экшен главной страницы
├── assets/               # Asset Bundles
│   └── AppAsset.php      # Основной ассет bundle
├── config/               # Конфигурация
│   ├── nginx.conf        # Конфигурация Nginx
│   ├── params.php        # Параметры приложения
│   ├── php.ini           # Настройки PHP
│   └── web.php           # Конфигурация веб-приложения
├── controllers/          # Контроллеры
│   └── SiteController.php
├── views/                # Представления
│   └── site/
│       └── index.php     # Главная страница
├── web/                  # Публичная директория
│   ├── css/
│   │   └── game.css      # Стили игры
│   ├── js/
│   │   └── game.js       # Логика drag-n-drop
│   └── index.php         # Entry script
├── docker-compose.yml    # Docker Compose конфигурация
└── composer.json         # Composer зависимости
```

## Описание функционала

- **Две секции**: Страница разделена на верхнюю (зелёную) и нижнюю (синюю) части
- **4 карты**: В нижней части расположены 4 карты (♠A, ♥K, ♦Q, ♣J)
- **Drag-n-Drop**: Перетаскивание карт из нижней части в верхнюю
- **Double-Click**: Двойной клик по карте в верхней части возвращает её обратно
- **Сохранение состояния**: Состояние сохраняется в localStorage браузера

## Остановка

```bash
docker-compose down
```
# card_yii2
