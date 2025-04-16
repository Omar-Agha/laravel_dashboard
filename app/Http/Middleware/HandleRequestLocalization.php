<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleRequestLocalization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = session('lang') ?? $request->header('X-Locale', config('APP_LOCALE'));

        if (in_array($locale, ['en', 'ar'])) {
            app()->setLocale($locale);
        }



        return $next($request);
    }
}
