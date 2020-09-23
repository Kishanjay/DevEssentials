# Authentication

To setup the default authentication
`php artisan make:auth`

This command creates databases, models, controllers, routes and views.

For the routes:
```php
/**
 * This auto generated route is equivalent to the lines below
 */
Auth::routes();

/* Authentication Routes */
// Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
// Route::post('login', 'Auth\LoginController@login');
// Route::post('logout', 'Auth\LoginController@logout')->name('logout');
// Route::get('logout', 'Auth\LoginController@logout')->name('logout');

/* Registration Routes */
// $this->get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
// $this->post('register', 'Auth\RegisterController@register');

/* Password Reset Routes */
// $this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
// $this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
// $this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
// $this->post('password/reset', 'Auth\ResetPasswordController@reset');

```


## Creates the model and migration
`php artisan make:model Contact --migration`

## Creates the controller
`php artisan make:controller ContactController --resource`
php artisan make:controller PhotoController --resource --model=Photo
php artisan make:controller API/PhotoController --api --resource --model=Photo

## Create the Routes
`Route::resource('contacts', 'ContactController');`
```
GET/contacts, mapped to the index() method,
GET /contacts/create, mapped to the create() method,
POST /contacts, mapped to the store() method,
GET /contacts/{contact}, mapped to the show() method,
GET /contacts/{contact}/edit, mapped to the edit() method,
PUT/PATCH /contacts/{contact}, mapped to the update() method,
DELETE /contacts/{contact}, mapped to the destroy() method.
```
