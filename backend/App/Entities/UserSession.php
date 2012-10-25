<?php


namespace App\Entities;

use App\Entities\StandardEntity;

/**
 * @Entity @Table(name="sessions")
 **/
class UserSession extends StandardEntity
{
    /**
     * @Id @Column(type="string")
     * @var string
     **/
    protected $token;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $loginName;

    /**
     * @Column(type="string")
     * @var string
     */
    protected $password;


}
