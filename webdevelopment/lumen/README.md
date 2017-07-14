# Example model

create file app/Pickupline.php

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pickupline extends Model {
    protected $table = 'pickuplines';

    protected $fillable = [
        'author',
        'pickupline',
        'ip_addr'
    ];
}
```

# Example database migration

first create the migration file

```sh
php artisan make:migration create_pickuplines_table --create=pickuplines
```

database/migrations/<date-time>_create_pickuplines_table.php

```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePickuplinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pickuplines', function (Blueprint $table) {
            $table->increments('id');
            $table->string('pickupline')->unique();
            $table->string('author');
            $table->string('ip_addr');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pickuplines');
    }
}
```

Run the changes

```sh
php artisan migrate
```

# Example database seed

create file database/seeds/PickuplineTableSeeder.php

```php
<?php
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Pickupline;

class PickuplineTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
     public function run()
     {
         Pickupline::create([
             'author' => 'Bloeb',
             'pickupline' => 'blab',
             'ip_addr' => '0.0.0.0'
         ]);
    }
}
```

Modify file database/seeds/DatabaseSeeder.php
```php
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call('UsersTableSeeder');
        $this->call('PickuplineTableSeeder');
    }
}
```

Run changes

```sh
php artisan db:seed
```

# Fetch from db

```php
$app->get('pickuplines', function(){
    return \App\Pickupline::all();
});
```

# Example controller

create file app/Http/Controllers/PickuplineController.php

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pickupline;

class PickuplineController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Store a new pickupline.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $author = $request->input('author');
        $pickupline = $request->input('pickupline');
        $error = null;

        try {
            $entry = new Pickupline();
            $entry->author = $author;
            $entry->ip_addr = $request->ip();
            $entry->pickupline = $pickupline;

            $success = $entry->save();
        }
        catch (\Exception $e) {
            $success = false;
            $error = $e;
        }

        return response()->json(['success' => $success, 'error' => $error]);
    }
}

```
