<?php

namespace App\Permissions;

class Permission
{

    /*
    * Users Permission
    */
    public const CAN_VIEW_USERS = 'view-users';
    public const CAN_CREATE_USERS = 'create-users';
    public const CAN_UPDATE_USERS = 'update-users';
    public const CAN_DELETE_USERS = 'delete-users';

    /*
    * Categories Permission
    */
    public const CAN_VIEW_CATEGORIES = 'view-categories';
    public const CAN_CREATE_CATEGORIES = 'create-categories';
    public const CAN_UPDATE_CATEGORIES = 'update-categories';
    public const CAN_DELETE_CATEGORIES = 'delete-categories';

    /*
    * Product Permission
    */
    public const CAN_VIEW_PRODUCTS = 'view-products';
    public const CAN_CREATE_PRODUCTS = 'create-products';
    public const CAN_UPDATE_PRODUCTS = 'update-products';
    public const CAN_DELETE_PRODUCTS = 'delete-products';
}
