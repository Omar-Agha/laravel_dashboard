<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Routing\Console\ControllerMakeCommand;

class MakeInertiaControllerCommand extends ControllerMakeCommand
{
    protected $name = 'make:inertia-controller';

    // Override the default command description
    protected $description = 'Create a new custom controller class';

    // Override the getStub method to point to your custom stub
    protected function getStub()
    {
        return base_path('stubs/inertia-controller.php.stub');
    }
}
