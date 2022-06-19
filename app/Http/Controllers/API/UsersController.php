<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\Rule;
use Yajra\DataTables\Facades\Datatables;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::latest()->paginate(10);
        return new UserCollection($users);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(User $user, Request $request)
    {

        $attributes = request()->validate([
            'name'      => 'required|string|min:3|max:255',
            'email' => ['required', 'email', 'min:3', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password'  => 'sometimes|required|min:6|max:255|confirmed',
            'role'      => 'required|string|exists:roles,name'
        ]);

        $role = array_pop($attributes);

        $user->update($attributes);

        $user->roles()->detach();
        $user->assignRole($role);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response([], Response::HTTP_NO_CONTENT);
    }
}
