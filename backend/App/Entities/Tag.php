<?php


namespace App\Entities;

use App\Entities\StandardEntity;

/**
 * @Entity @Table(name="tags")
 **/
class Tag extends StandardEntity
{
    /**
     * @Id @Column(type="bigint")
     * @GeneratedValue
     * @var int
     **/
    protected $tagId;


    /**
     * @ManyToMany(targetEntity="Page", mappedBy="tags")
     */
    protected $items;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $title;


    /**
     * @Column(type="string")
     * @var string
     */
    protected $slug;


    /**
     * @Column(type="text")
     * @var string
     */
    protected $description;



    public function getId() {
        return $this->tagId;
    }

    public function setFromObject($object) {

        //TODO: - fetch only attributes which are set in $object
        //TODO: - check type of $object
        //TODO: - validate!
        $this->title = $object->title;
        $this->description = $object->description;
        $this->slug = $object->slug;
    }

}
