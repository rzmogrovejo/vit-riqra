let mix = require('laravel-mix');

mix.js('src/LikeButton.js', 'dist')
  .react()
  .setPublicPath('dist');
